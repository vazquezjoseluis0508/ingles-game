# 🎓 Senior 5 — English Game

Juego estilo Duolingo para **fijar frases y vocabulario** del Senior 5 con **memoria visual**.
Todo el contenido sale de tu material en `/Ingles`. El objetivo es entender qué estás diciendo y automatizar las frases, como paso previo al speaking fluido.

## ▶️ Cómo jugar
1. Abrí **`index.html`** con doble clic (se abre en tu navegador). Recomendado: **Chrome** (para guardar en archivo).
2. Elegí un mazo:
   - **📖 Aprender** → flashcards: inglés → tocás → significado + cuándo usarla.
   - **🎮 Practicar** → opción múltiple (inglés↔español), feedback inmediato.
   - **⏰ Repaso espaciado** → te trae lo que más te cuesta (sistema Leitner).
3. Ganás **XP ⭐** y mantenés la **racha 🔥** estudiando cada día.

## 💾 Persistencia
- Por defecto guarda en **localStorage** (automático).
- En Chrome/Edge podés tocar **"🔗 Guardar en archivo"** y elegir crear **`progress.json`** acá en `game/`: desde ahí tu progreso vive en un archivo real, inspeccionable y versionable. Se autoguarda en cada cambio y se reconecta solo la próxima vez.
- Siempre tenés **⬇️ Exportar / ⬆️ Importar** como respaldo manual.

## ➕ Cómo agregar contenido
Editá **`data.js`**. Cada mazo (`deck`) tiene un array `cards`. Una carta:
```js
{ id: "sp26", en: "I'd rather stay home.", es: "Preferiría quedarme en casa.",
  note: "would rather + verbo base.", emoji: "🏠", tag: "Preferencias" }
```
Agregá cartas o un `deck` nuevo (con `id`, `name`, `emoji`, `color`, `description`, `cards`).
Los `id` deben ser **únicos** (si repetís un id, el progreso se mezcla).

## 🗂️ Archivos
| Archivo | Rol |
|---|---|
| `index.html` | Estructura; carga los scripts |
| `styles.css` | Diseño visual (colores, tarjetas, animaciones) |
| `data.js` | Contenido (mazos y cartas) |
| `store.js` | Persistencia aislada (localStorage / archivo / export) |
| `app.js` | Lógica del juego y modos |

## 🧠 Sistema de repaso (Leitner)
Cada carta tiene una "caja" (1→5). Acierto = sube de caja y tarda más en volver; error = vuelve a la caja 1.
Intervalos: caja 1 = hoy · 2 = 1 día · 3 = 3 días · 4 = 7 días · 5 = 16 días. Una carta se considera **dominada** desde la caja 4.
