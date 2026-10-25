# Contenido del juego (`game/content/`)

Esta carpeta es la **fuente de verdad** del contenido. `game/data.js` se **genera** a partir de acá: no lo edites a mano (cualquier cambio se pisa la próxima vez que corras el build).

```bash
node game/tools/build-content.cjs          # valida y regenera game/data.js
node game/tools/build-content.cjs --check  # solo valida y avisa si data.js quedó desactualizado
node --test "game/tests/*.test.cjs"        # tests (incluye el chequeo de sincronía)
```

Si hay errores, el build los lista todos con archivo y campo, por ejemplo:

```
content/clase1/unit.json: decks[0].cards[3].es is required
```

## Estructura

Clases (`units`) -> mazos (`decks`) -> cartas (`cards`).
Las clases se ordenan por `date` (cronológico); la app las muestra con lo más reciente arriba.

```
game/content/
  meta.json          # version, exam, quizOrder (orden de los quizzes temáticos en la lista)
  final-exam.json    # examen final integral (cada pregunta con su deckId)
  clase1/
    unit.json        # la clase: datos, mazos, cartas, quizzes temáticos y teoría (opcional)
    images/          # fotos de la clase (opcional; solo si la clase tiene teoría con imágenes)
  clase2/
    unit.json
  ...
```

## `unit.json`

| Campo     | Obligatorio | Descripción |
|-----------|-------------|-------------|
| `id`      | sí | igual al nombre de la carpeta (ej. `clase5`) |
| `name`    | sí | título visible (ej. `Clase 5 — 28/10`) |
| `date`    | sí | fecha `AAAA-MM-DD`; define el orden de las clases |
| `emoji`   | sí | ícono de la clase |
| `decks`   | sí | lista de mazos (al menos uno) |
| `quizzes` | no | quizzes temáticos de los mazos de esta clase |
| `theory`  | no | teoría de la clase (resumen + imágenes) |

### Mazo (`decks[]`)

`id`, `name`, `emoji`, `color` (ej. `#0984e3`), `description`, `cards` (al menos una). Todos obligatorios.

### Carta (`cards[]`)

| Campo   | Descripción |
|---------|-------------|
| `id`    | identificador único global (string) |
| `en`    | inglés (lo que querés aprender a decir) |
| `es`    | significado en español (rioplatense) |
| `note`  | cuándo / cómo usarla (ayuda para fijar el sentido) |
| `emoji` | ayuda visual (memoria visual) |
| `tag`   | subcategoría (para filtrar / color) |

Todos obligatorios.

### Quiz temático (`quizzes[]`)

`id`, `name`, `emoji`, `description`, `difficulty` (ej. `medium`, `hard`), `deckId` (un mazo existente) y `questions`.

Cada pregunta: `id`, `type`, `prompt`, `correct`, `explanation`, `points` (> 0), y además:

- `type` es `gap-fill`, `multiple-choice` o `typing`.
- `gap-fill` y `multiple-choice` necesitan `options` (al menos 2) y `correct` tiene que ser exactamente una de ellas.
- `typing` puede tener `variations`: otras respuestas aceptadas.
- En `final-exam.json`, cada pregunta además lleva `deckId`.

Si una clase tiene un quiz nuevo y no lo agregás a `quizOrder` en `meta.json`, aparece al final de la lista.

### Teoría (`theory`, opcional)

```json
"theory": {
  "summary": "Voz pasiva: **be** + participio.\nEl tiempo lo marca el verbo be.\n\nOtro párrafo.",
  "images": [
    { "file": "images/pizarron.jpg", "caption": "Pizarrón de la clase" }
  ]
}
```

- `summary`: texto plano. Un salto de línea (`\n`) es un salto de línea; una línea en blanco (`\n\n`) separa párrafos; `**así**` va en negrita.
- `images[].file`: ruta **relativa a la carpeta de la clase** (ej. `images/pizarron.jpg`). El archivo tiene que existir; si no, el build falla. `caption` es opcional.
- Si la clase tiene teoría, en la vista de la clase aparece el botón **📖 Teoría**.

## Agregar una clase nueva, paso a paso

1. Creá la carpeta `game/content/claseN/` (ej. `clase5`).
2. Copiá `game/content/clase2/unit.json` (es la más corta) como plantilla y cambiá `id` (= nombre de carpeta), `name`, `date` y `emoji`.
3. Reemplazá los mazos, cartas y quizzes con el contenido de la clase. Usá **ids nuevos** que no existan en ninguna otra parte.
4. Si tenés fotos (pizarrón, apuntes), copialas a `game/content/claseN/images/` (preferí `.jpg` livianos).
5. Agregá el bloque `theory` con el resumen y las imágenes.
6. Corré `node game/tools/build-content.cjs` y corregí lo que marque.
7. Corré `node --test "game/tests/*.test.cjs"`.
8. Hacé commit de `game/content/` **y** de `game/data.js` regenerado.

## Los ids no se cambian nunca

El progreso guardado (localStorage / `progress.json`) está indexado por los ids de cartas, mazos, quizzes y preguntas. Una vez que un id se usó, **no lo cambies ni lo reutilices**: se perdería o mezclaría el progreso. Los ids tienen que ser únicos en todo el contenido (el build lo verifica). Podés corregir textos libremente; los ids no.
