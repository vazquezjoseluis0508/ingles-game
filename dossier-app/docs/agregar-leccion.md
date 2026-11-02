# Agregar una lección

Cada lección es **un archivo Markdown** en `src/content/lessons/`. No se toca código del motor: el sitio se genera solo a partir de ese archivo.

## Pasos rápidos

1. Crear `src/content/lessons/<modulo>-<leccion>-<slug>.md` (ejemplo: `1-2-present-perfect.md`).
2. Escribir el frontmatter (bloque entre `---`) con los campos de la tabla.
3. Escribir la teoría en Markdown debajo del frontmatter.
4. Ejecutar `npm test` y `npm run build`.

El nombre del archivo es solo convención. La URL sale de `module.number` e `id` (`1.2` → `/modulo-1/1-2/`), así que `id` debe ser único.

## Campos del frontmatter

| Campo | Tipo | Notas |
|---|---|---|
| `module.number` | entero | Número del módulo (`1`) |
| `module.title` | texto | Título del módulo, tal como en el Dossier |
| `id` | texto | Número de lección, con punto (`"1.1"`). Debe ser único |
| `title` | texto | Título de la lección, tal como en el Dossier |
| `order` | número | Orden dentro del sitio |
| `examples` | lista | Pares `en` / `es` (ver abajo) |
| `exercises` | lista | Secciones de ejercicios (ver abajo) |

### Ejemplos

```yaml
examples:
  - en: "The contract should have been checked by a legal advisor before signing."
    es: "El contrato debería haber sido revisado por un asesor legal antes de firmarse."
```

Cada ejemplo tiene exactamente `en` y `es`.

### Secciones de ejercicios

Cada sección tiene `title`, `type` y `items`. `type` solo puede ser `gap`, `choice` o `translate`.

**`type: gap` (completar espacios)**

```yaml
- title: "A. Completar Espacios (Gap-Fill)"
  type: gap
  items:
    - prompt: "The emergency evacuation __________ (carry out) by the crew."
      answers: ["was carried out"]
      explanation: "Past Simple Passive: acción completada en el pasado."
```

| Campo del ítem | Tipo | Notas |
|---|---|---|
| `prompt` | texto | Usar guiones bajos (`__________`) para el hueco |
| `answers` | lista de textos | Al menos una. Incluir todas las variantes aceptadas |
| `explanation` | texto | Justificación del Dossier, se muestra después de responder |

**`type: choice` (opción múltiple)**

```yaml
- title: "B. Opción Múltiple"
  type: choice
  items:
    - prompt: "Extra assistance must __________ to passengers travelling with small children."
      options: ["offer", "being offered", "be offered", "have offered"]
      answer: 2
      explanation: "Tras el modal must se usa be + participio."
```

| Campo del ítem | Tipo | Notas |
|---|---|---|
| `prompt` | texto | Enunciado con el hueco |
| `options` | lista de textos | Al menos dos |
| `answer` | entero ≥ 0 | Índice de la opción correcta, **base 0** (primera opción = `0`) |
| `explanation` | texto | Justificación del Dossier |

**`type: translate` (traducción)**

```yaml
- title: "C. Traducción Directa e Inversa"
  type: translate
  items:
    - prompt: "Traducir al inglés: Se están realizando muchas investigaciones sobre el cambio climático."
      model: "Much research is being conducted on global climate change."
      explanation: "Presente continuo pasivo para procesos en curso."
```

| Campo del ítem | Tipo | Notas |
|---|---|---|
| `prompt` | texto | Instrucción de traducción |
| `model` | texto | Respuesta modelo. El alumno se autoevalúa, no hay corrección automática |
| `explanation` | texto | Justificación del Dossier |

## Ejemplo mínimo completo

Archivo `src/content/lessons/1-2-ejemplo.md`:

```markdown
---
module:
  number: 1
  title: "Estructuras Sintácticas Complejas y Construcciones Pasivas"
id: "1.2"
title: "Título de la lección (igual al Dossier)"
order: 2
examples:
  - en: "New evidence is currently being analysed."
    es: "Nuevas evidencias están siendo analizadas actualmente."
exercises:
  - title: "A. Completar Espacios (Gap-Fill)"
    type: gap
    items:
      - prompt: "New evidence __________ (analyse) right now."
        answers: ["is being analysed", "is being analyzed"]
        explanation: "Present Continuous Passive."
  - title: "B. Opción Múltiple"
    type: choice
    items:
      - prompt: "The report __________ yesterday."
        options: ["was written", "wrote", "is written", "has written"]
        answer: 0
        explanation: "Past Simple Passive."
  - title: "C. Traducción Directa e Inversa"
    type: translate
    items:
      - prompt: "Traducir al inglés: El informe fue escrito ayer."
        model: "The report was written yesterday."
        explanation: "Pasiva en pasado simple."
---

Teoría en Markdown aquí, debajo del frontmatter. Se muestra en el panel de teoría.
```

## Checklist antes de publicar

- [ ] El título, las consignas y las explicaciones respetan el wording del Dossier (`source/dossier.txt`). No se resume ni se reescribe.
- [ ] `id` es único y `module.number` coincide con el módulo.
- [ ] Cada ejercicio `gap` tiene todas las variantes aceptadas en `answers` (la comparación ignora mayúsculas, espacios y puntuación final, pero no sinónimos).
- [ ] Cada `answer` de `choice` es un índice **base 0** dentro de `options`.
- [ ] Cada `items` tiene al menos un elemento; `choice` tiene al menos dos `options`.
- [ ] Los `examples` tienen `en` y `es`.
- [ ] `npm test` pasa.
- [ ] `npm run build` pasa. Si falla con error de esquema, revisar el campo indicado en `src/content.config.ts`.
