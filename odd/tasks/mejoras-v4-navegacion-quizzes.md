# Feature: Mejoras v4 — Navegación + Quizzes estilo Open English + Progreso global

Tres mejoras integradas: (1) botón atrás dentro del aprendizaje, (2) sistema de quizzes tipo Open English, (3) barra de progreso general de quizzes completados.

## Specs

- **S1** — "cuando entro a aprender algo necesito tener el boton atras para no salirme de la clase en la que estoy, ya que las unicas opciones que tengo es hacer una nueva ronda o volver al inicio"
  - Botón atrás disponible durante la sesión de aprendizaje
  - Al hacer atrás, guarda el progreso de la tarjeta actual y vuelve a la vista del mazo
  - No reinicia la sesión

- **S2** — "quiero que agregues los quiz estilo Open English, tal y como lo habiamos dejado planificado en engram"
  - Nuevo modo **"Quiz"** separado del aprendizaje diario
  - Un quiz es un conjunto de preguntas de diferentes tipos (gap-fill, multiple choice, typing, matching)
  - Cada pregunta tiene feedback específico (correcto/incorrecto con explicación)
  - Calificación por pregunta (puntos)
  - Pool de quizzes basados en los contenidos existentes (grammar, vocabulary, reading, etc.)

- **S3** — "me gustan las misiones de hoy pero quiero tener algo que me ayude a saber donde estoy parado en mi conocimieto general, es decir algo que me diga , de todo los quiz una barra de curso completado"
  - Barra de progreso global visible en el home que muestre: "X quizzes completados de Y"
  - Porcentaje de avance acumulado de todos los quizzes
  - Separado del progreso de mazos individuales

- **S4** — "el reseteo de progreso tiene que quedar igual"
  - La función de reseteo existente debe seguir funcionando idénticamente
  - Incluye reseteo de progreso de quizzes también

## Tasks

| ID | Specs | Descripción | Ruta | Estado |
|----|-------|-------------|------|--------|
| T1 | S1 | Botón atrás en sesión + lógica de retorno a vista mazo | app.js | pendiente |
| T2 | S2 | Data structure: quiz objects con preguntas y pools | data.js | pendiente |
| T3 | S2 | Render Quiz: vista inicio de quiz + instrucciones | app.js | pendiente |
| T4 | S2 | Render Question: renderizar pregunta de quiz con tipos variados | app.js | pendiente |
| T5 | S2 | Submit question: validar respuesta + feedback + guardar resultado | app.js | pendiente |
| T6 | S2 | Quiz summary: resumen de quiz (calificación, errores, tiempo) | app.js | pendiente |
| T7 | S3 | State: agregar state.quizzes para persistir resultados de quizzes | store.js | pendiente |
| T8 | S3 | Barra global: renderizar en home con progreso de quizzes | app.js | pendiente |
| T9 | S4 | Reseteo: incluir state.quizzes en lógica de reset | app.js | pendiente |
| T10 | — | Estilos: CSS para quiz mode (cards, botones, feedback) | styles.css | pendiente |
| T11 | — | Tests: validar estructura, node --check | app.js, data.js | pendiente |

## Log

- **L1** (pedido usuario, verbatim): "una minima mejora, cuando entro a aprender algo necesito tener el boton atras para no salirme de la clase en la que estoy, ya que las unicas opciones que tengo es hacer una nueva ronda o volver al inicio y eso me retorna al dashboard. ademas.. quiero que agregues los quiz estilo Open English, tal y como lo habiamos dejado planificado en engram, a menos que eso aun no este echo. recuerda usar la metodologia gentle-ai, engram odd y las mejores practicas. me gustan las misiones de hoy pero quiero tener algo que me ayude a saber donde estoy parado en mi conocimieto general, es decir algo que me diga , de todo los quiz una barra de curso completado.ho.. objetivo alcanzado , siguiento las mismas practicas que venimos utilizando. ( el reseteo de progreso tiene que quedar igual ) crear un plan ODD para realizar estas mejoras"
- **L2** (estado actual): repo limpio, branch main, 12 commits anteriores. Juego funcional con 4 modos (Aprender, Practicar, Repasar, Arcade) + Simulacro + Misiones + Medallas. Nuevo token configurado. Listo para mejoras.
