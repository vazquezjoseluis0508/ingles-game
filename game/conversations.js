// ============================================================
//  Conversaciones guiadas (modo examen oral) + diálogos para escuchar
//
//  CONVERSATIONS (interactivas): elegís la mejor respuesta.
//    Paso teacher: { type:"teacher", en, es, alts?: [frases alternativas] }
//      -> si hay alts, se elige una al azar (da variedad).
//    Paso choice:  { type:"choice", options:[ {en, good, note} ] }
//      -> las opciones se mezclan al mostrarse.
//
//  LISTENINGS (escuchar): diálogo completo entre 2 personas, se reproduce
//  solo con voces alternadas. level: easy | medium | hard (corta/media/larga).
//    line: { sp: 0|1, en, es }
//  Todo el contenido sale de tu material de speaking (Papers 1, 2 y 3).
// ============================================================

window.CONVERSATIONS = [
  {
    id: "convo-newjob",
    title: "Starting a new job",
    emoji: "💼",
    topic: "Paper 2 — Feelings and situations",
    steps: [
      { type: "teacher", en: "Which situation would you like to talk about, and why?",
        es: "¿De qué situación te gustaría hablar, y por qué?",
        alts: ["So, which situation would you choose, and why?", "Tell me, which topic would you like to discuss?"] },
      { type: "choice", options: [
        { en: "I would choose starting a new job because it's something important in our lives.", good: true, note: "Opinión + razón. ¡Perfecto!" },
        { en: "I choice the new job.", good: false, note: "Es 'I would choose' (choose = verbo), y falta la razón." },
        { en: "Starting a new job.", good: false, note: "Muy corto: falta opinión y razón." },
      ]},
      { type: "teacher", en: "Why would you feel nervous?", es: "¿Por qué te sentirías nervioso?",
        alts: ["And why exactly would you feel nervous?", "What would make you nervous?"] },
      { type: "choice", options: [
        { en: "Because everything would be new: new people, new responsibilities and a new workplace.", good: true, note: "Desarrollado y con ejemplos. ¡Muy bien!" },
        { en: "Because is new.", good: false, note: "Incompleto: 'because everything would be new'." },
        { en: "I don't feel nervous.", good: false, note: "No desarrollás la idea." },
      ]},
      { type: "teacher", en: "What would you do on your first day?", es: "¿Qué harías en tu primer día?",
        alts: ["And on your first day, what would you do?"] },
      { type: "choice", options: [
        { en: "On my first day, I would try to make a good impression.", good: true, note: "'On my first day' + 'would'. ¡Correcto!" },
        { en: "In my first day I make a good impression.", good: false, note: "Es 'On my first day' y 'I would make'." },
        { en: "I make good impressions.", good: false, note: "'a good impression' (singular) y falta el condicional." },
      ]},
      { type: "teacher", en: "Would you ask your new colleagues for help?", es: "¿Les pedirías ayuda a tus nuevos compañeros?",
        alts: ["And would you ask your colleagues for help?"] },
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
      { type: "teacher", en: "What would you do if you got lost in the Amazon rainforest?",
        es: "¿Qué harías si te perdieras en la selva amazónica?",
        alts: ["Imagine you got lost in the Amazon rainforest. What would you do?"] },
      { type: "choice", options: [
        { en: "If I got lost, I would try to stay calm because panic makes things worse.", good: true, note: "Second conditional + razón. ¡Perfecto!" },
        { en: "I will try to stay calm.", good: false, note: "En el condicional va 'would', no 'will'." },
        { en: "I stay calm.", good: false, note: "Falta la estructura condicional: 'I would stay calm'." },
      ]},
      { type: "teacher", en: "Good. And what would you do next?", es: "Bien. ¿Y qué harías después?",
        alts: ["Nice. What would your next step be?"] },
      { type: "choice", options: [
        { en: "Then, I would look for a safe place and try to call for help.", good: true, note: "Claro y bien armado." },
        { en: "I find a river.", good: false, note: "Mejor con condicional: 'I would look for a river'." },
      ]},
      { type: "teacher", en: "What if your phone didn't work?", es: "¿Y si tu teléfono no funcionara?",
        alts: ["And what would you do if your phone was dead?"] },
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
      { type: "teacher", en: "Which topic would you like to discuss, and why?",
        es: "¿Qué tema te gustaría discutir, y por qué?",
        alts: ["Which of these topics would you like to talk about?"] },
      { type: "choice", options: [
        { en: "I'd like to talk about caffeine because many people drink coffee every day.", good: true, note: "'I'd like' + razón. ¡Muy bien!" },
        { en: "I like coffee.", good: false, note: "Es 'I'd like to talk about...' + una razón." },
      ]},
      { type: "teacher", en: "Can you explain why caffeine affects sleep?", es: "¿Podés explicar por qué la cafeína afecta el sueño?",
        alts: ["Why do you think caffeine affects sleep?"] },
      { type: "choice", options: [
        { en: "Because caffeine keeps you awake. For example, if I drink coffee late at night, I can't sleep well.", good: true, note: "Razón + ejemplo personal. ¡Ideal!" },
        { en: "Coffee is bad.", good: false, note: "Muy general; desarrollá con una razón y un ejemplo." },
      ]},
      { type: "teacher", en: "Do you drink coffee in the evening?", es: "¿Tomás café a la tarde/noche?",
        alts: ["And do you usually drink coffee at night?"] },
      { type: "choice", options: [
        { en: "Not really. I think drinking coffee in the morning is different from drinking it at night. What about you?", good: true, note: "Comparás e invitás al otro a hablar." },
        { en: "Yes.", good: false, note: "Respuesta cerrada: desarrollá e interactuá." },
      ]},
    ],
  },
];

// ---- Diálogos para ESCUCHAR (se reproducen solos, voces alternadas) ----
window.LISTENINGS = [
  {
    id: "listen-newjob",
    title: "Starting a new job",
    level: "easy",
    emoji: "💼",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "Hi Ben! Which situation would you like to talk about?", es: "¡Hola Ben! ¿De qué situación te gustaría hablar?" },
      { sp: 1, en: "Hi Ana. I'd like to talk about starting a new job.", es: "Hola Ana. Me gustaría hablar de empezar un trabajo nuevo." },
      { sp: 0, en: "How would you feel on your first day?", es: "¿Cómo te sentirías en tu primer día?" },
      { sp: 1, en: "I would feel excited but nervous, because everything is new. What about you?", es: "Me sentiría emocionado pero nervioso, porque todo es nuevo. ¿Y vos?" },
      { sp: 0, en: "I would feel the same. But I would try to make a good impression.", es: "Me sentiría igual. Pero trataría de causar una buena impresión." },
    ],
  },
  {
    id: "listen-lost",
    title: "Getting lost in a city",
    level: "medium",
    emoji: "🧭",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "What would you do if you got lost in a foreign city?", es: "¿Qué harías si te perdieras en una ciudad extranjera?" },
      { sp: 1, en: "If I got lost, I would try to stay calm. Then I would use Google Maps.", es: "Si me perdiera, trataría de mantener la calma. Después usaría Google Maps." },
      { sp: 0, en: "Good idea. But what if your phone was dead?", es: "Buena idea. ¿Pero y si tu teléfono no tuviera batería?" },
      { sp: 1, en: "If my phone was dead, I would ask someone for help. And you?", es: "Si no tuviera batería, le pediría ayuda a alguien. ¿Y vos?" },
      { sp: 0, en: "I would look for a public place with lots of people.", es: "Yo buscaría un lugar público con mucha gente." },
      { sp: 1, en: "That's a good point. It's much safer.", es: "Es un buen punto. Es mucho más seguro." },
      { sp: 0, en: "Yes. And I would talk to the police if I couldn't find my way back.", es: "Sí. Y hablaría con la policía si no pudiera encontrar el camino de vuelta." },
      { sp: 1, en: "Me too. That's a smart plan.", es: "Yo también. Es un plan inteligente." },
    ],
  },
  {
    id: "listen-sleep",
    title: "Sleep and daily habits",
    level: "hard",
    emoji: "😴",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "Which topic would you like to discuss, sleep problems or the media?", es: "¿Qué tema te gustaría discutir, problemas de sueño o los medios?" },
      { sp: 1, en: "I'd like to talk about sleep. I think caffeine is a big problem.", es: "Me gustaría hablar del sueño. Creo que la cafeína es un gran problema." },
      { sp: 0, en: "Why do you think so?", es: "¿Por qué pensás eso?" },
      { sp: 1, en: "Because caffeine keeps you awake. For example, if I drink coffee at night, I can't sleep.", es: "Porque la cafeína te mantiene despierto. Por ejemplo, si tomo café de noche, no puedo dormir." },
      { sp: 0, en: "That's true. On the other hand, some people sleep well after coffee.", es: "Es verdad. Por otro lado, algunas personas duermen bien después del café." },
      { sp: 1, en: "Maybe, but I think it depends on the person.", es: "Quizá, pero creo que depende de la persona." },
      { sp: 0, en: "What about noisy bedrooms? Do they affect sleep?", es: "¿Y los dormitorios ruidosos? ¿Afectan el sueño?" },
      { sp: 1, en: "Yes, a lot. If my neighbours make noise, I can't fall asleep.", es: "Sí, mucho. Si mis vecinos hacen ruido, no puedo quedarme dormido." },
      { sp: 0, en: "I agree. A quiet room is very important.", es: "Estoy de acuerdo. Un cuarto silencioso es muy importante." },
      { sp: 1, en: "Do you think daytime naps are a problem too?", es: "¿Pensás que las siestas también son un problema?" },
      { sp: 0, en: "Short naps are good, but long naps can affect your sleep at night.", es: "Las siestas cortas son buenas, pero las largas pueden afectar el sueño de noche." },
      { sp: 1, en: "That's a good point. I usually take short naps. Thanks for the chat!", es: "Es un buen punto. Yo suelo hacer siestas cortas. ¡Gracias por la charla!" },
    ],
  },
];
