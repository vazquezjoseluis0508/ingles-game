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

## 📱 Instalar como app (PWA)
El juego es una PWA: se puede **instalar** en el celu/PC y funciona **offline**.
> ⚠️ Los service workers **no funcionan con `file://`**. Hay que servirlo por http.

**Local (rápido):**
```
cd game
python3 -m http.server 8000
```
Abrí **http://localhost:8000** y en el navegador vas a ver la opción de **Instalar app**.

**En el celular:** lo más cómodo es **hostearlo gratis** (Netlify / Vercel / GitHub Pages) y abrir esa URL en el celu → "Agregar a pantalla de inicio".

## Progreso y quizzes

- **Aprender** no cambia la aprobación de práctica. Solo un acierto en **Practicar** aprueba una tarjeta; un error posterior no borra esa aprobación.
- Un quiz temático requiere todas las tarjetas de su `deckId` aprobadas en práctica. Los registros antiguos sin `practiceApproved` se conservan, pero no se infiere que una caja Leitner equivalga a aprobación de práctica.
- Hay 20 quizzes temáticos para 19 mazos: dos IDs históricos corresponden a Past Modals. Se conservan ambos y el contador sigue contando quizzes, no temas únicos.
- El examen final contiene una pregunta por cada uno de los 19 mazos actuales. Es una muestra de cobertura, no una garantía de dominio. Es accesible por separado y no aprueba quizzes temáticos.
- Los resultados históricos no se recalculan con el nuevo número de preguntas. El último intento muestra su porcentaje y, cuando se registró, su total de puntos original.
- Atrás conserva la clase de origen del quiz; si se abrió desde la lista de quizzes, vuelve a esa lista.

### Comprobación local

Desde la raíz del repositorio:

```bash
node --test game/tests/*.test.cjs
node --check game/app.js
node --check game/data.js
node --check game/store.js
node --check game/sw.js
git diff --check
```

Las pruebas usan un DOM mínimo y almacenamiento en memoria; no sustituyen una prueba real del navegador ni leen tu progreso.
