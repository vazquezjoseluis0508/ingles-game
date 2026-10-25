# 🚀 Servidor localhost para Senior 5 Game

## Comando único para iniciar

```bash
cd /Users/jvazquez/Documents/Ingles/game && python3 -m http.server 8000
```

Luego abrí en navegador:
```
http://localhost:8000
```

## Notas

- **Puerto ocupado:** Si el puerto 8000 está en uso, podés usar otro:
  ```bash
  python3 -m http.server 9000
  ```
  Luego entrá a `http://localhost:9000`

- **Service Worker:** Solo funciona sobre `http://` o `https://`, no con `file://`. 
  Por eso necesitás el servidor.

- **Caché:** Si ves archivos viejos después de cambios:
  1. Recargá con **Shift+Reload** (hard refresh) o 
  2. Si persiste, cerrá las pestañas de la app y volvé a abrirla. No uses **Clear site data**: borra también tu progreso.
  3. El service worker usa `s5-game-v4-content`; al actualizar reemplaza la caché de recursos, no el progreso.

- **Progreso:** Se guarda en `localStorage` (siempre actualizado), 
  no depende del caches del SW.

## Desarrollo rápido

```bash
# Terminal 1: servidor
cd /Users/jvazquez/Documents/Ingles/game && python3 -m http.server 8000

# Terminal 2: editar archivos (app.js, data.js, etc.)
# Guardás cambios, recargás navegador (Reload o Shift+Reload)
```

Sin necesidad de matar procesos ni reiniciar el servidor.
