# Ingles Dossier

Libro interactivo de estudio del **Dossier Pedagógico Integral y Guía de Ejercitación Avanzada: Senior 5**. Muestra cada lección en el orden del Dossier (teoría → ejemplos → ejercicios), con autocorrección de los ejercicios de completar y opción múltiple, sin usar tokens de IA.

**Web:** https://vazquezjoseluis0508.github.io/ingles-game/dossier/

## Ejecutar en local

Requisito: Node.js 24 (la misma versión que usa el despliegue).

| Comando | Para qué |
|---|---|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor de desarrollo |
| `npm test` | Pruebas unitarias (Vitest) |
| `npm run build` | Generar el sitio estático en `dist/` |

## Estructura de carpetas

| Carpeta | Contenido |
|---|---|
| `src/content/lessons/` | Una lección por archivo Markdown (contenido, no código) |
| `src/content.config.ts` | Esquema de validación de las lecciones |
| `src/components/` | Componentes de la interfaz |
| `src/layouts/` | Plantillas de página |
| `src/pages/` | Rutas del sitio |
| `src/lib/` | Lógica del motor: corrección, progreso y rutas |
| `src/scripts/` | Scripts del navegador (progreso, interacción) |
| `src/styles/` | Estilos globales |
| `public/` | Archivos estáticos (favicon, etc.) |
| `source/` | Texto fuente del Dossier (`dossier.txt`) |
| `docs/` | Guías de autoría de contenido |
| `../dossier/` | Sitio generado (se commitea; lo publica GitHub Pages) |

Especificación y avance: `../odd/tasks/dossier-book.md`.

## Despliegue

GitHub Pages publica la raíz de `main` del repo `ingles-game`. El sitio compilado vive en `../dossier/`.

1. `npm test && npm run build` (escribe en `../dossier/`).
2. Commitear `dossier-app/` y `dossier/` juntos y hacer `push`.

## Agregar contenido

Ver [docs/agregar-leccion.md](docs/agregar-leccion.md).
