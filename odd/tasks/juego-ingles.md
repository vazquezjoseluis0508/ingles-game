# Feature: Juego de inglés Senior 5 (web app local)
Tutor-juego estilo Duolingo para fijar frases y vocabulario del Senior 5 con memoria visual.
Fuente de contenido: carpeta `/Ingles` (material real del curso). Objetivo final: speaking fluido; paso previo: entender y fijar las frases.

## Specs
- **S1** — "creamos un juego sencillo he interactivo para aprender ?, por mas que sea sencillo me gustaria que tenga memoria, persistencia, ayudas visuales.. etc"
- **S2** — "noe staria mal practicar primero las frases para no trabarme... el objetivo es lograr un speaking fluido, pero primero necesito saber que estoy diciendo"
- **S3** — "yo tengo mucha mas memoria visual que otra cosa" → el juego prioriza ayuda visual (emojis, color, tarjetas).
- **S4** — "ya sabes que me gusta duolingo, me resulta copado el metodo" → microdosis, feedback inmediato, repetición espaciada, racha/XP, progreso visible.
- **S5** — "seria ideal no salirse por fuera de este conocimiento" → todo el contenido sale del material de `/Ingles`, no se inventa nada externo.
- **S6** — Mazo inicial elegido por el usuario: "Frases + vocabulario crime".
- **S7** — Persistencia: "me gustaria que la persistencia sea super sencilla pero algo mas piola porque siento que el localStorage, es medio poco" + "la idea es estudiar y aprender ingles , no programar" → más robusto que localStorage puro, sin montar infra.
- **S8** — Formato: web app local (se abre en el navegador de la Mac), elegido por el usuario.

## Tasks
| ID | Specs | Descripción | Ruta | Commit |
|----|-------|-------------|------|--------|
| T1 | S5,S6 | `data.js` con mazos (frases speaking + crime vocab) desde el material | inline | pendiente (decisión del usuario) |
| T2 | S7 | `store.js`: localStorage + File System Access API (progress.json) + export/import | inline | pendiente |
| T3 | S1,S2,S4 | `app.js`: modos Aprender / Practicar / Repasar (SRS Leitner), racha, XP | inline | pendiente |
| T4 | S3,S4 | `index.html` + `styles.css`: ayuda visual (emojis, colores, animación, barras) | inline | pendiente |
| T5 | — | `game/README.md` + validación (sintaxis JS, prueba en navegador) | inline | pendiente |

## Specs v2 (evolución)
- **S9** \u2014 Bug: el progreso mostraba 0% aunque el usuario respondiera bien ("ninguno de los dos me marco un progreso... figura un 0% de avance"). El medidor debe moverse desde el primer acierto. [RESUELTO]
- **S10** \u2014 "esto es muy poco": sumar todo el material como mazos (grammar, confusing verbs, sleep, feelings, media, reading).
- **S11** \u2014 "quiero separar lo que venimos viendo en el tema de fechas... lo que vimos ultimo tiene que estar al principio": organizar en unidades por clase/fecha, orden cronológico (lo más reciente arriba).
- **S12** \u2014 "no lo estoy viendo como un juego... aun no lo siento como duolingo": más gamificación. Usuario eligió las 4: escribir (typing), audio (TTS), niveles/lecciones, corazones + meta diaria.
- **S13** \u2014 "el examen de speaking podria ser algo asi como un evento proximo al cual debemos preparar": módulo-evento separado del día a día, con cuenta regresiva y plan. Usuario tiene fecha.

## Tasks v2
| ID | Specs | Descripción | Estado |
|----|-------|-------------|--------|
| T6 | S9 | Progreso granular (deckProgress) + Aprender suma avance | hecho |
| T7 | S12 | Modo escribir (typing) con tolerancia | hecho |
| T8 | S12 | Audio TTS (escuchar la frase en inglés) | hecho |
| T9 | S12 | Corazones/vidas + meta diaria de XP | hecho |
| T10 | S10,S11 | Unidades por clase ordenadas por fecha (data.js v2: 4 unidades, 19 mazos, 178 cartas) | hecho (delegado a gentle-ai-worker) |
| T11 | S13 | Módulo evento "Examen de Speaking" con cuenta regresiva (fecha configurable in-app) | hecho |
| T12 | — | Fix escape en onclick (jsAttr) para comillas en opciones/audio | hecho |

## Specs v3 (gamificación + audio + UX)
- **S14** — "no se cual es el desafio": falta lazo de juego. Usuario eligió las 4 mecánicas: medallas (coronar mazos), misiones diarias, simulacro (jefe final), modo arcade.
- **S15** — "los audios son malisimos... roboticos": mejor voz. Usuario eligió voces premium de macOS (gratis).
- **S16** — "deberia poder ser responsivo": layout mobile-first.
- **Push-back de arquitecto:** NO hard-lock de unidades. La clase más reciente es la más relevante para el examen y va arriba; bloquearla detrás de clases viejas sería contraproducente. Las medallas son logro, no barrera.

## Tasks v3
| ID | Specs | Descripción | Estado |
|----|-------|-------------|--------|
| T13 | S16 | Responsive mobile-first | hecho |
| T14 | S15 | Audio: mejor voz inglesa + selector + persistencia (state.voiceURI) | hecho |
| T15 | S14 | Medallas por mazo (oro/plata/bronce) sin bloqueo | hecho |
| T16 | S14 | Misiones diarias (3) con progreso y bonus XP (state.dailyStats) | hecho |
| T17 | S14 | Simulacro de examen (jefe final): pool speaking, 12 preguntas, 60% escribir, sin pistas, nota % con umbral 70 | hecho |
| T18 | S14 | Modo arcade: timer 10s/pregunta, combo x1-5, score, récord (state.arcadeBest) | hecho |
| T19 | — | Fix jsAttr escape en onclick | hecho |

## Log
- **L1** (pedido original, verbatim): "dale aunque la verdad es que en este momento me bloqueo mucho hablando, necesito mas practica de las frases incluso entender que es lo que significan, ahora que tienes el contexto, que tal si armarmos un juego con ayuda visual ?, yo tengo mucha mas memoria visual que otra cosa, pero noe staria mal practicar primero las frases para no trabarme... el objetivo es lograr un speaking fluido, pero primero necesito saber que estoy diciendo, lo piola es que ya tenes todo el contexto y seria ideal no salirse por fuera de este conocimiento. creamos un juego sencillo he interactivo para aprender ?, por mas que sea sencillo me gustaria que tenga memoria, persistencia, ayudas visuales.. etc, que recomiendas ?ya sabes que me gusta duolingo, me resulta copado el metodo..."
- **L2** (decisión formato/persistencia): usuario eligió "web app local" y pidió persistencia "algo mas piola" que localStorage, aclarando "la idea es estudiar y aprender ingles , no programar". Mazo inicial: "Frases + vocabulario crime".
- **L3** (decisión ODD): usuario eligió **ODD completo** para el juego. Se crea este documento + espejo en Engram retroactivamente (código ya escrito y validado con `node --check`).
- **L4** (entorno): repo git en `main`, sin commits. Los commits de work-unit quedan supeditados a decisión explícita del usuario (no se commitea sin pedido).
- **L5** (feedback usuario, verbatim): "hice tanto la practica como el aprender y ninguno de los dos me marco un progreso es decir en ambos figura un 0% de avance cuando en realidad he metido todo en forma correcta... quiero separar lo que venimos viendo en el tema de fechas... lo que vimos ultimo tiene que estar al principio... nos olvidamos de pedir las fechas... no lo estoy viendo como un juego, y tampoco lo veo dificil por ahora, y aun no lo siento como duolingo... podrias hacer algo mas robusto... el examen de speaking podria ser algo asi como un evento proximo."
- **L6** (decisiones): usuario tiene fecha de examen (pendiente de pasar el valor); cronología se obtendrá con un prompt al chat de ChatGPT (del más lejano al más próximo); gamificación: las 4 opciones. Plan en 2 fases: Fase 1 (typing, audio, corazones/meta) sin datos; Fase 2 (unidades por fecha + evento) con cronología y fecha.
- **L7** (cronología recibida): usuario pegó 40 temas en 4 clases (07/10, 14/10, 19/10, 21/10). Guardado en `clases-cronologia.md`.
- **L8** (demo delegación): usuario eligió delegar la autoría del contenido a un subagente. `gentle-ai-worker` reescribió `game/data.js` a v2 (superficie única `game/data.js`): 4 unidades, 19 mazos, 178 cartas, ids `sp01-25`/`cr01-17` preservados byte-idéntico. El orquestador verificó estructura y calidad (español rioplatense + inglés correcto) con spot-check.
- **L9** (fecha examen): pendiente que el usuario la cargue; el evento la acepta in-app vía botón (state.examDate, persistido). No bloquea.
- **L10** (entorno): sigue sin commits; a decisión del usuario. Riesgo: none (app local autónoma, sin datos sensibles; solo lee el material como fuente).
- **L11** (feedback, verbatim): "no se cual es el desafio o los desafios... solo veo masos muy lindos... los audios son malisimos... se escuchan ultra roboticos... si vamos a hacerlo hagamoslo bien... deberia poder ser responsivo... en este momento veo todo en una sola pantalla". Elogió la iniciativa del audio.
- **L12** (decisiones): desafío = las 4 mecánicas; audio = voces premium macOS; responsive aplicado. 2 tandas: Tanda 1 (voz + medallas + misiones) HECHA; Tanda 2 (simulacro + arcade) pendiente. Checkpoint: usuario prueba Tanda 1 (incl. audio, que el parent no puede verificar) antes de Tanda 2.
- **L13** (verificación Tanda 1): node --check OK en store/app/data; prueba visual + audio a cargo del usuario.
- **L14** (Tanda 2 hecha): modo arcade (timer/combo/score/récord) + simulacro jefe final (pool speaking, 60% typing, sin pistas, nota con umbral 70%). Botones: Arcade en home, Simulacro en la tarjeta del examen. Entradas especiales de pool: __ARCADE__ (todas) y __SPEAKING__ (mazos de speaking). Fix de timers con clearTimer en renderCard/afterAnswer/confirmExit/renderSummary. Verificación: node --check OK, sin refs a DATA.decks, funciones nuevas presentes, pool del simulacro completo. Prueba visual a cargo del usuario. Riesgo: none.
