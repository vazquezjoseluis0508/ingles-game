# Feature: Haiku — Sistema de Quizzes Temáticos + Progreso Global

**Objetivo:** Conectar cada mazo con su quiz, ofrecer reintentos, rastrear intentos/resultado, marcar temas como reforzados, mostrar progreso global (temas aprobados/disponibles), y aumentar peso de escritura tras aprobar.

**Temas:**
- S1: Cada mazo representa un tema; al terminar "Aprender", ofrecer quiz sin bloquear estudio.
- S2: Quiz aprobado con 80%+ ; guardar intentos y resultado; permitir reintentar si no llega.
- S3: Tras aprobar, marcar tema reforzado; aumentar gradualmente peso de ejercicios escritura/typing en prácticas futuras.
- S4: Quiz final integral separado de quizzes temáticos.
- S5: Mostrar progreso global: "temas aprobados / temas disponibles". 100% = todos los quizzes temáticos aprobados, no garantiza dominio. Mostrar resultado quiz final aparte.
- S6: Guardar con Store existente (sin Supabase, Google Auth, Fuel iX).
- S7: localhost:8000 muestra archivos actualizados; si hace falta, fijar caché service worker; comando único claro para iniciar servidor.

**Status:** In progress (exploración completada; creando estructura)

## Specs
1. **S1** — Mapeo mazo ↔ quiz: cada mazo (19 total) debe tener su quiz temático. Si no existe, se crea. Post-"Aprender", se ofrece sin bloquear (modal no bloqueante o redirección opcional).
2. **S2** — Aprobación 80%+: puntuación = suma de `points` por pregunta; se guarda en `state.quizzes[quizId]` con `{ completed: 0|1, totalAttempts, bestScore, attempts: [{timestamp, score, pct, passed}] }`.
3. **S3** — Reforzado: tras pasar quiz, marcar `state.themesReinforced[deckId] = true`. En futuras sesiones de "Practicar", aumentar peso de typing/escritura.
4. **S4** — Quiz final: separado (`id: "final-exam"`), con preguntas de todos los temas; no afecta progreso temático.
5. **S5** — Progreso global: en home, mostrar `"X / Y temas aprobados"` donde Y = cantidad de quizzes temáticos. 100% = todos aprobados. Resultado final aparte en su sección.
6. **S6** — Store: extender `defaultState()` con `quizzes: {}`, `themesReinforced: {}`, `attempts: {}`.
7. **S7** — Localhost: revisar sw.js (caché); documentar comando único (ej. `python3 -m http.server 8000`); no matar procesos automáticamente.

## Tasks
- **T1** — Crear estructura de datos para quizzes temáticos en `data.js` (un quiz por mazo; mapeo explícito).
- **T2** — Extender `Store.defaultState()` con campos para intentos, reforzado, aprobación.
- **T3** — Implementar flujo post-"Aprender": ofrecimiento de quiz (no bloqueante).
- **T4** — Lógica de quiz: tracking intentos, cálculo 80%, marcado reforzado.
- **T5** — Mostrar progreso global en home (temas aprobados/disponibles).
- **T6** — Aumentar peso de ejercicios escritura cuando tema reforzado.
- **T7** — Revisar/fijar service worker y servidor localhost.
- **T8** — Tests funcionales en navegador (sin push/PR).

## Log
- **L1** — Req inicial: implementar quizzes temáticos, progreso global, reintentos, aumento peso escritura post-aprobación. Vanilla JS, sin Supabase/Auth/Fuel. Verificar localhost:8000.
