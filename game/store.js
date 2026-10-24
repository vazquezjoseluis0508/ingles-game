// ============================================================
//  Store — persistencia aislada del juego
//  Estrategia:
//    1) localStorage: siempre activo, instantáneo (fuente rápida).
//    2) File System Access API: si el navegador la soporta, podés
//       "conectar" un progress.json real en la carpeta game/.
//       Al conectarlo, pasa a ser la fuente de verdad y se
//       autoguarda en el archivo en cada cambio.
//    3) Export/Import: botones universales de respaldo manual.
//  Todo queda detrás de esta interfaz: si mañana querés SQLite,
//  un server, o lo que sea, cambiás solo este archivo.
// ============================================================

const Store = (() => {
  const LS_KEY = "senior5-game-progress-v1";
  const IDB_DB = "senior5-game";
  const IDB_STORE = "handles";
  const IDB_KEY = "progress-file";

  let fileHandle = null; // handle del progress.json conectado (si hay)

  // ---------- IndexedDB mínimo para guardar el file handle ----------
  function idb(mode, fn) {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(IDB_DB, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        const db = req.result;
        const tx = db.transaction(IDB_STORE, mode);
        const store = tx.objectStore(IDB_STORE);
        const r = fn(store);
        tx.oncomplete = () => { db.close(); resolve(r && r.result); };
        tx.onerror = () => { db.close(); reject(tx.error); };
      };
    });
  }

  const supportsFS = () => "showSaveFilePicker" in window;

  function defaultState() {
    return {
      version: 1,
      xp: 0,
      streak: 0,
      lastStudyDate: null,            // YYYY-MM-DD
      goal: 50,                        // meta diaria de XP
      dailyXp: { date: null, xp: 0 },  // XP ganada hoy
      examDate: null,                  // fecha del examen de speaking (AAAA-MM-DD)
      voiceURI: null,                  // voz TTS elegida
      arcadeBest: 0,                   // mejor puntaje en modo arcade
      strictMode: false,               // comparación al pie de la letra
      dailyStats: { date: null, correct: 0, sessions: 0, claimed: [] }, // misiones diarias
      cards: {}                        // id -> { box:1..5, due:ISO, seen, correct, wrong }
    };
  }

  // ---------- lectura/escritura de archivo ----------
  async function readFile(handle) {
    const file = await handle.getFile();
    const text = await file.text();
    if (!text.trim()) return null;
    return JSON.parse(text);
  }
  async function writeFile(handle, state) {
    const w = await handle.createWritable();
    await w.write(JSON.stringify(state, null, 2));
    await w.close();
  }
  async function ensurePermission(handle, mode = "readwrite") {
    const opts = { mode };
    if ((await handle.queryPermission(opts)) === "granted") return true;
    if ((await handle.requestPermission(opts)) === "granted") return true;
    return false;
  }

  // ---------- API pública ----------

  // Intenta reconectar un archivo ya elegido en sesiones anteriores.
  async function tryRestoreFile() {
    if (!supportsFS()) return false;
    try {
      const handle = await idb("readonly", (s) => s.get(IDB_KEY));
      if (!handle) return false;
      if (!(await ensurePermission(handle))) return false;
      fileHandle = handle;
      return true;
    } catch { return false; }
  }

  // Deja que el usuario cree/elija progress.json (requiere gesto de usuario).
  async function connectFile() {
    if (!supportsFS()) throw new Error("unsupported");
    const handle = await window.showSaveFilePicker({
      suggestedName: "progress.json",
      types: [{ description: "JSON", accept: { "application/json": [".json"] } }]
    });
    if (!(await ensurePermission(handle))) throw new Error("permission-denied");
    fileHandle = handle;
    await idb("readwrite", (s) => s.put(handle, IDB_KEY));
    return true;
  }

  function isFileConnected() { return !!fileHandle; }

  async function load() {
    // Si hay archivo conectado, es la fuente de verdad.
    if (fileHandle) {
      try {
        const fromFile = await readFile(fileHandle);
        if (fromFile) { localStorage.setItem(LS_KEY, JSON.stringify(fromFile)); return migrate(fromFile); }
      } catch { /* cae a localStorage */ }
    }
    const raw = localStorage.getItem(LS_KEY);
    return raw ? migrate(JSON.parse(raw)) : defaultState();
  }

  async function save(state) {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    if (fileHandle) {
      try { await writeFile(fileHandle, state); } catch { /* el localStorage ya guardó */ }
    }
  }

  function migrate(state) {
    const base = defaultState();
    return {
      ...base,
      ...state,
      dailyXp: { ...base.dailyXp, ...(state.dailyXp || {}) },
      dailyStats: { ...base.dailyStats, ...(state.dailyStats || {}) },
      cards: { ...(state.cards || {}) }
    };
  }

  // ---------- Export / Import manuales ----------
  function exportFile(state) {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "progress.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function importFile() {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file"; input.accept = "application/json,.json";
      input.onchange = () => {
        const f = input.files[0];
        if (!f) return reject(new Error("no-file"));
        const reader = new FileReader();
        reader.onload = () => { try { resolve(migrate(JSON.parse(reader.result))); } catch (e) { reject(e); } };
        reader.onerror = () => reject(reader.error);
        reader.readAsText(f);
      };
      input.click();
    });
  }

  return {
    supportsFS, tryRestoreFile, connectFile, isFileConnected,
    load, save, exportFile, importFile, defaultState
  };
})();
