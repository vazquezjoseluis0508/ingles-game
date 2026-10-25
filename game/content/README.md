# Contenido del juego (`game/content/`)

Esta carpeta es la **fuente de verdad** del contenido. `game/data.js` se **genera** a partir de acá: no lo edites a mano.

```bash
node game/tools/build-content.cjs
```

## Estructura

Clases (`units`) -> mazos (`decks`) -> cartas (`cards`).
Las clases se guardan en orden cronológico (por `date`); la app las muestra con lo más reciente arriba.

```
game/content/
  meta.json          # version, exam, quizOrder (orden de los quizzes temáticos)
  final-exam.json    # examen final integral
  clase1/
    unit.json        # datos de la clase: mazos, cartas y quizzes temáticos
```

## Campos de una carta

| Campo   | Descripción |
|---------|-------------|
| `id`    | identificador único global (string) |
| `en`    | inglés (lo que querés aprender a decir) |
| `es`    | significado en español (rioplatense) |
| `note`  | cuándo / cómo usarla (ayuda para fijar el sentido) |
| `emoji` | ayuda visual (memoria visual) |
| `tag`   | subcategoría (para filtrar / color) |
