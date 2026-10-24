// ============================================================
//  Conversaciones guiadas (modo examen oral)
//  Cada paso es:
//    { type: "teacher", en, es }        -> la profe habla
//    { type: "choice", options: [ { en, good, note } ] } -> elegís la mejor respuesta
//  Contenido basado en tu material de speaking (Papers 1, 2 y 3).
// ============================================================

window.CONVERSATIONS = [
  {
    id: "convo-newjob",
    title: "Starting a new job",
    emoji: "💼",
    topic: "Paper 2 — Feelings and situations",
    steps: [
      { type: "teacher", en: "Which situation would you like to talk about, and why?", es: "¿De qué situación te gustaría hablar, y por qué?" },
      { type: "choice", options: [
        { en: "I would choose starting a new job because it's something important in our lives.", good: true, note: "Opinión + razón. ¡Perfecto!" },
        { en: "I choice the new job.", good: false, note: "Es 'I would choose' (choose = verbo), y falta la razón." },
        { en: "Starting a new job.", good: false, note: "Muy corto: falta opinión y razón." },
      ]},
      { type: "teacher", en: "Why would you feel nervous?", es: "¿Por qué te sentirías nervioso?" },
      { type: "choice", options: [
        { en: "Because everything would be new: new people, new responsibilities and a new workplace.", good: true, note: "Desarrollado y con ejemplos. ¡Muy bien!" },
        { en: "Because is new.", good: false, note: "Incompleto y falta el sujeto: 'because everything would be new'." },
        { en: "I don't feel nervous.", good: false, note: "No desarrollás la idea; perdés la oportunidad de hablar." },
      ]},
      { type: "teacher", en: "What would you do on your first day?", es: "¿Qué harías en tu primer día?" },
      { type: "choice", options: [
        { en: "On my first day, I would try to make a good impression.", good: true, note: "'On my first day' + 'would'. ¡Correcto!" },
        { en: "In my first day I make a good impression.", good: false, note: "Es 'On my first day' y 'I would make'." },
        { en: "I make good impressions.", good: false, note: "'a good impression' (singular) y falta el condicional." },
      ]},
      { type: "teacher", en: "Would you ask your new colleagues for help?", es: "¿Les pedirías ayuda a tus nuevos compañeros?" },
      { type: "choice", options: [
        { en: "Yes, I'm a little shy, but I would ask them if I needed help. What about you?", good: true, note: "Respondés, desarrollás e invitás al otro. ¡Ideal!" },
        { en: "No.", good: false, note: "Cerrás la conversación; conviene desarrollar e interactuar." },
      ]},
    ],
  },
  {
    id: "convo-lost",
    title: "Getting lost",
    emoji: "🧭",
    topic: "Paper 1 — Second conditional",
    steps: [
      { type: "teacher", en: "What would you do if you got lost in the Amazon rainforest?", es: "¿Qué harías si te perdieras en la selva amazónica?" },
      { type: "choice", options: [
        { en: "If I got lost, I would try to stay calm because panic makes things worse.", good: true, note: "Second conditional + razón. ¡Perfecto!" },
        { en: "I will try to stay calm.", good: false, note: "En el condicional va 'would', no 'will'." },
        { en: "I stay calm.", good: false, note: "Falta la estructura condicional: 'I would stay calm'." },
      ]},
      { type: "teacher", en: "Good. And what would you do next?", es: "Bien. ¿Y qué harías después?" },
      { type: "choice", options: [
        { en: "Then, I would look for a safe place and try to call for help.", good: true, note: "Claro y bien armado." },
        { en: "I find a river.", good: false, note: "Mejor con condicional: 'I would look for a river'." },
      ]},
      { type: "teacher", en: "What if your phone didn't work?", es: "¿Y si tu teléfono no funcionara?" },
      { type: "choice", options: [
        { en: "If my phone didn't work, I would try to find a safe place to spend the night.", good: true, note: "Excelente condicional." },
        { en: "My phone is dead and I cry.", good: false, note: "Demasiado informal y sin estructura de examen." },
      ]},
    ],
  },
  {
    id: "convo-sleep",
    title: "Sleep problems",
    emoji: "😴",
    topic: "Paper 3 — Causas y ejemplos",
    steps: [
      { type: "teacher", en: "Which topic would you like to discuss, and why?", es: "¿Qué tema te gustaría discutir, y por qué?" },
      { type: "choice", options: [
        { en: "I'd like to talk about caffeine because many people drink coffee every day.", good: true, note: "'I'd like' + razón. ¡Muy bien!" },
        { en: "I like coffee.", good: false, note: "Es 'I'd like to talk about...' + una razón." },
      ]},
      { type: "teacher", en: "Can you explain why caffeine affects sleep?", es: "¿Podés explicar por qué la cafeína afecta el sueño?" },
      { type: "choice", options: [
        { en: "Because caffeine keeps you awake. For example, if I drink coffee late at night, I can't sleep well.", good: true, note: "Razón + ejemplo personal. ¡Ideal!" },
        { en: "Coffee is bad.", good: false, note: "Muy general; desarrollá con una razón y un ejemplo." },
      ]},
      { type: "teacher", en: "Do you drink coffee in the evening?", es: "¿Tomás café a la tarde/noche?" },
      { type: "choice", options: [
        { en: "Not really. I think drinking coffee in the morning is different from drinking it at night. What about you?", good: true, note: "Comparás e invitás al otro a hablar." },
        { en: "Yes.", good: false, note: "Respuesta cerrada: desarrollá e interactuá." },
      ]},
    ],
  },
];
