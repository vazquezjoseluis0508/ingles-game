// ============================================================
//  Senior 5 — Datos del juego (v2)
//  Todo el contenido sale de tu material en /Ingles.
//  Estructura: UNITS (clases) -> decks (mazos) -> cards (cartas).
//  Las clases se guardan en orden cronológico (clase1 primero).
//  La app las muestra con lo más reciente arriba.
//  Campos de una carta:
//    id    -> identificador único global (string)
//    en    -> inglés (lo que querés aprender a decir)
//    es    -> significado en español (rioplatense)
//    note  -> cuándo / cómo usarla (ayuda para fijar el sentido)
//    emoji -> ayuda visual (memoria visual)
//    tag   -> subcategoría (para filtrar / color)
// ============================================================

window.GAME_DATA = {
  version: 2,
  exam: { name: "Examen de Speaking" },
  units: [
    // ======================================================
    //  CLASE 1 — 07/10
    // ======================================================
    {
      id: "clase1", name: "Clase 1 — 07/10", date: "2025-10-07", emoji: "📖",
      decks: [
        {
          id: "passive-voice", name: "Passive Voice", emoji: "🔄", color: "#0984e3",
          description: "BE + past participle: el tiempo lo marca el verbo BE.",
          cards: [
            { id: "pv01", en: "The door is locked.", es: "La puerta está cerrada con llave.", note: "Present simple passive: am/is/are + pp.", emoji: "🚪", tag: "Passive" },
            { id: "pv02", en: "The burglar was caught.", es: "Atraparon al ladrón.", note: "Past simple passive: was/were + pp.", emoji: "🚓", tag: "Passive" },
            { id: "pv03", en: "My house is being painted.", es: "Me están pintando la casa.", note: "Present continuous passive: am/is/are being + pp.", emoji: "🎨", tag: "Passive" },
            { id: "pv04", en: "My phone has been stolen.", es: "Me robaron el teléfono.", note: "Present perfect passive: has/have been + pp.", emoji: "📱", tag: "Passive" },
            { id: "pv05", en: "The police station is going to be closed.", es: "Van a cerrar la comisaría.", note: "Future passive: is going to be / will be + pp.", emoji: "🏢", tag: "Passive" },
            { id: "pv06", en: "A meeting will be held.", es: "Se va a realizar una reunión.", note: "'They'll hold a meeting' en pasiva. will be + pp.", emoji: "📅", tag: "Passive" },
            { id: "pv07", en: "She thinks she was being followed.", es: "Cree que la estaban siguiendo.", note: "Past continuous passive: was/were being + pp.", emoji: "👣", tag: "Passive" },
            { id: "pv08", en: "Use the passive when the action matters more than who did it.", es: "Usá la pasiva cuando importa más la acción que quién la hizo.", note: "Regla de uso de la voz pasiva.", emoji: "💡", tag: "Regla" }
          ]
        },
        {
          id: "causative-have", name: "Causative Have", emoji: "✂️", color: "#00b894",
          description: "have + object + past participle: otro lo hace por vos, o algo malo te pasa.",
          cards: [
            { id: "ch01", en: "I had my hair cut.", es: "Me corté el pelo (me lo cortaron).", note: "Otro lo hace por vos. Compará: 'I cut my hair' = vos mismo.", emoji: "💇", tag: "Otro lo hace" },
            { id: "ch02", en: "We had our photo taken.", es: "Nos sacaron una foto.", note: "have + object + pp. Alguien nos la sacó.", emoji: "📸", tag: "Otro lo hace" },
            { id: "ch03", en: "You should have your eyes tested.", es: "Deberías hacerte revisar la vista.", note: "Un profesional lo hace por vos.", emoji: "👓", tag: "Otro lo hace" },
            { id: "ch04", en: "Our neighbours are having a swimming pool built.", es: "A los vecinos les están construyendo una pileta.", note: "Causative en continuo: are having + object + pp.", emoji: "🏊", tag: "Otro lo hace" },
            { id: "ch05", en: "She had her iPhone stolen.", es: "Le robaron el iPhone.", note: "Algo malo que te sucede. have + object + pp.", emoji: "📱", tag: "Algo malo" },
            { id: "ch06", en: "I had my bank account hacked.", es: "Me hackearon la cuenta bancaria.", note: "Algo malo que te pasa, sin aclarar quién.", emoji: "💻", tag: "Algo malo" },
            { id: "ch07", en: "We had our house burgled.", es: "Nos entraron a robar a la casa.", note: "Algo malo: have + object + pp.", emoji: "🏠", tag: "Algo malo" },
            { id: "ch08", en: "Have you ever had your bag snatched?", es: "¿Alguna vez te arrebataron la cartera?", note: "Pregunta con causative para algo malo.", emoji: "👜", tag: "Algo malo" }
          ]
        },
        {
          id: "impersonal-passive", name: "Impersonal Passive", emoji: "📰", color: "#6c5ce7",
          description: "It is said that… / He is believed to be… para noticias, sin asumir la afirmación.",
          cards: [
            { id: "ip01", en: "It is said that he is dangerous.", es: "Se dice que es peligroso.", note: "It is + pp + that… No decís quién lo afirma.", emoji: "🗣️", tag: "It is...that" },
            { id: "ip02", en: "It is believed that he is a local man.", es: "Se cree que es un hombre de la zona.", note: "It is believed that + oración.", emoji: "🤔", tag: "It is...that" },
            { id: "ip03", en: "It is thought that the mayor will resign.", es: "Se piensa que el intendente va a renunciar.", note: "Verbos: say, believe, think, report, know, expect.", emoji: "🏛️", tag: "It is...that" },
            { id: "ip04", en: "The man is said to be in his forties.", es: "Se dice que el hombre tiene unos cuarenta y pico.", note: "Subject + passive verb + to-infinitive.", emoji: "👤", tag: "Subject + to-inf" },
            { id: "ip05", en: "The burglar is believed to be a local man.", es: "Se cree que el ladrón es de la zona.", note: "is believed to be: más impersonal.", emoji: "🕵️", tag: "Subject + to-inf" },
            { id: "ip06", en: "He is believed to have left the country.", es: "Se cree que se fue del país.", note: "Acción anterior: to have + pp.", emoji: "✈️", tag: "Acción previa" },
            { id: "ip07", en: "The robbers are thought to have entered through a window.", es: "Se piensa que los ladrones entraron por una ventana.", note: "are thought to have + pp.", emoji: "🪟", tag: "Acción previa" },
            { id: "ip08", en: "He is reported to be very polite.", es: "Se informa que es muy educado.", note: "Del listening 'Britain's most polite armed robber'.", emoji: "🎩", tag: "Subject + to-inf" }
          ]
        },
        {
          id: "identity-theft-vocab", name: "Identity Theft", emoji: "🪪", color: "#d63031",
          description: "Vocabulario clave de la lectura sobre robo de identidad.",
          cards: [
            { id: "id01", en: "identity theft", es: "robo de identidad", note: "Usar los datos de otro para hacerse pasar por esa persona.", emoji: "🪪", tag: "Vocab" },
            { id: "id02", en: "dating site", es: "sitio de citas", note: "Donde Constance encontró fotos usadas sin permiso.", emoji: "❤️", tag: "Vocab" },
            { id: "id03", en: "personal information", es: "información personal", note: "Datos que no hay que compartir online.", emoji: "📋", tag: "Vocab" },
            { id: "id04", en: "to misuse someone's photos", es: "usar indebidamente las fotos de alguien", note: "misuse = uso indebido / mal uso.", emoji: "🖼️", tag: "Vocab" },
            { id: "id05", en: "to steal someone's identity", es: "robar la identidad de alguien", note: "steal + object. Lo que le pasó a Martin Peterson.", emoji: "🥷", tag: "Vocab" },
            { id: "id06", en: "fake profile", es: "perfil falso", note: "Perfil creado con datos robados.", emoji: "👻", tag: "Vocab" },
            { id: "id07", en: "privacy", es: "privacidad", note: "Lo que se pierde con el robo de identidad.", emoji: "🔒", tag: "Vocab" }
          ]
        },
        {
          id: "story-way-up-to-heaven", name: "The Way Up to Heaven", emoji: "🛫", color: "#e84393",
          description: "Vocabulario y expresiones clave del cuento de Roald Dahl.",
          cards: [
            { id: "wh01", en: "delayed flight", es: "vuelo demorado", note: "El vuelo de Mrs Foster a París se demora.", emoji: "🛫", tag: "Story" },
            { id: "wh02", en: "fog", es: "niebla", note: "La niebla retrasa el vuelo y la hace volver a casa.", emoji: "🌫️", tag: "Story" },
            { id: "wh03", en: "to be afraid of being late", es: "tener miedo de llegar tarde", note: "El miedo extremo de Mrs Foster.", emoji: "⏰", tag: "Story" },
            { id: "wh04", en: "to delay someone on purpose", es: "demorar a alguien a propósito", note: "Lo que hace Mr Foster para manipularla.", emoji: "😈", tag: "Story" },
            { id: "wh05", en: "the little white box", es: "la cajita blanca", note: "La excusa de Mr Foster para volver a entrar a la casa.", emoji: "📦", tag: "Story" },
            { id: "wh06", en: "to hear sounds inside the house", es: "escuchar ruidos dentro de la casa", note: "Ella los oye y decide no entrar.", emoji: "👂", tag: "Story" },
            { id: "wh07", en: "to feel safe and free", es: "sentirse segura y libre", note: "Cómo se siente ella finalmente en París.", emoji: "🕊️", tag: "Story" }
          ]
        }
      ]
    },

    // ======================================================
    //  CLASE 2 — 14/10
    // ======================================================
    {
      id: "clase2", name: "Clase 2 — 14/10", date: "2025-10-14", emoji: "✍️",
      decks: [
        {
          id: "reporting-verbs", name: "Reporting Verbs", emoji: "🗨️", color: "#fdcb6e",
          description: "Los 3 grupos: verb + to-inf, verb + persona + to-inf, verb + -ing.",
          cards: [
            { id: "rv01", en: "Adrian offered to make dinner.", es: "Adrian ofreció hacer la cena.", note: "Grupo 1: verb + to-infinitive (offer).", emoji: "🍽️", tag: "to-inf" },
            { id: "rv02", en: "Pablo promised to tidy his room.", es: "Pablo prometió ordenar su cuarto.", note: "Grupo 1: promise + to-infinitive.", emoji: "🤞", tag: "to-inf" },
            { id: "rv03", en: "The children refused to go to bed.", es: "Los chicos se negaron a ir a dormir.", note: "Grupo 1: refuse + to-infinitive.", emoji: "🛏️", tag: "to-inf" },
            { id: "rv04", en: "Sam's neighbour threatened to call the police.", es: "El vecino de Sam amenazó con llamar a la policía.", note: "Grupo 1: threaten + to-infinitive.", emoji: "📞", tag: "to-inf" },
            { id: "rv05", en: "Bill advised me to keep my money in the bank.", es: "Bill me aconsejó guardar la plata en el banco.", note: "Grupo 2: verb + persona + to-infinitive (advise).", emoji: "🏦", tag: "persona + to-inf" },
            { id: "rv06", en: "Molly reminded Jack to phone the electrician.", es: "Molly le recordó a Jack que llamara al electricista.", note: "Grupo 2: remind + persona + to-infinitive.", emoji: "💡", tag: "persona + to-inf" },
            { id: "rv07", en: "Peter invited me to have dinner.", es: "Peter me invitó a cenar.", note: "Grupo 2: invite + persona + to-infinitive.", emoji: "🍴", tag: "persona + to-inf" },
            { id: "rv08", en: "The boss persuaded Megan not to leave.", es: "El jefe convenció a Megan de no irse.", note: "Grupo 2: persuade + persona + (not) to-infinitive.", emoji: "🧑‍💼", tag: "persona + to-inf" },
            { id: "rv09", en: "Ryan suggested going for a walk.", es: "Ryan sugirió ir a caminar.", note: "Grupo 3: verb + -ing (suggest).", emoji: "🚶", tag: "-ing" },
            { id: "rv10", en: "Ruby denied eating the chocolates.", es: "Ruby negó haber comido los chocolates.", note: "Grupo 3: deny + -ing.", emoji: "🍫", tag: "-ing" },
            { id: "rv11", en: "Roger apologized for forgetting my birthday.", es: "Roger se disculpó por olvidarse de mi cumpleaños.", note: "Grupo 3: apologize for + -ing.", emoji: "🎂", tag: "-ing" },
            { id: "rv12", en: "The teacher accused Simon of copying Anna's exam.", es: "El profe acusó a Simon de copiarse del examen de Anna.", note: "Grupo 3: accuse someone of + -ing.", emoji: "📝", tag: "-ing" }
          ]
        }
      ]
    },

    // ======================================================
    //  CLASE 3 — 19/10
    // ======================================================
    {
      id: "clase3", name: "Clase 3 — 19/10", date: "2025-10-19", emoji: "📰",
      decks: [
        {
          id: "headlines", name: "Headline Language", emoji: "🗞️", color: "#2d3436",
          description: "Palabras cortas de titulares: back, axe, hit, bid, clash, vow, quiz, row.",
          cards: [
            { id: "hl01", en: "back", es: "apoyar", note: "Prime Minister backs proposal.", emoji: "👍", tag: "Headline" },
            { id: "hl02", en: "axe", es: "eliminar / recortar", note: "Thousands of jobs axed.", emoji: "🪓", tag: "Headline" },
            { id: "hl03", en: "hit", es: "afectar negativamente", note: "Stock market hit by oil fears.", emoji: "📉", tag: "Headline" },
            { id: "hl04", en: "bid", es: "intento", note: "Astronaut bids to be first man on Mars.", emoji: "🚀", tag: "Headline" },
            { id: "hl05", en: "clash", es: "conflicto / enfrentamiento", note: "Ministers clash over tax proposal.", emoji: "⚔️", tag: "Headline" },
            { id: "hl06", en: "vow", es: "prometer firmemente", note: "Bayern boss vows to avenge defeat.", emoji: "🤝", tag: "Headline" },
            { id: "hl07", en: "quiz", es: "interrogar", note: "Police quiz witness.", emoji: "❓", tag: "Headline" },
            { id: "hl08", en: "row", es: "discusión / disputa", note: "Actress rows with co-star.", emoji: "💢", tag: "Headline" }
          ]
        },
        {
          id: "media-people", name: "People in the Media", emoji: "🎙️", color: "#0984e3",
          description: "Periodistas y gente de los medios.",
          cards: [
            { id: "mp01", en: "critic", es: "crítico", note: "Escribe reseñas de cine, música, etc.", emoji: "🎭", tag: "Media" },
            { id: "mp02", en: "commentator", es: "comentarista", note: "Comenta eventos en vivo (deportes, noticias).", emoji: "🏟️", tag: "Media" },
            { id: "mp03", en: "reporter", es: "reportero", note: "Sale a cubrir y contar las noticias.", emoji: "🎤", tag: "Media" },
            { id: "mp04", en: "editor", es: "editor", note: "Decide y corrige qué se publica.", emoji: "✏️", tag: "Media" },
            { id: "mp05", en: "presenter", es: "presentador", note: "Conduce un programa.", emoji: "📺", tag: "Media" },
            { id: "mp06", en: "freelance journalist", es: "periodista independiente", note: "No trabaja para un solo medio fijo.", emoji: "💼", tag: "Media" },
            { id: "mp07", en: "newsreader", es: "presentador de noticias", note: "Lee las noticias al aire.", emoji: "🗞️", tag: "Media" },
            { id: "mp08", en: "paparazzi", es: "fotógrafos que persiguen famosos", note: "Sacan fotos de celebridades sin permiso.", emoji: "📷", tag: "Media" },
            { id: "mp09", en: "agony aunt", es: "quien responde cartas dando consejos", note: "Columna de consejos personales.", emoji: "💌", tag: "Media" }
          ]
        },
        {
          id: "media-adjectives", name: "Media Adjectives", emoji: "🧭", color: "#00cec9",
          description: "Adjetivos para describir los medios.",
          cards: [
            { id: "ma01", en: "biased", es: "parcial / tendencioso", note: "Muestra solo un lado. The article was very biased.", emoji: "⚖️", tag: "Adjective" },
            { id: "ma02", en: "objective", es: "objetivo", note: "Sin tomar partido. A good report should be objective.", emoji: "🎯", tag: "Adjective" },
            { id: "ma03", en: "sensational", es: "sensacionalista / exagerado", note: "Exagera para llamar la atención.", emoji: "🔥", tag: "Adjective" },
            { id: "ma04", en: "accurate", es: "preciso / correcto", note: "Los datos son exactos y verificados.", emoji: "✅", tag: "Adjective" },
            { id: "ma05", en: "censored", es: "censurado", note: "Se ocultó o eliminó parte del contenido.", emoji: "🚫", tag: "Adjective" }
          ]
        },
        {
          id: "writing-connectors", name: "Writing Connectors", emoji: "🔗", color: "#6c5ce7",
          description: "Conectores para el artículo de opinión / for-and-against.",
          cards: [
            { id: "wc01", en: "Nowadays", es: "Hoy en día", note: "Para introducir el tema en la P1.", emoji: "🌍", tag: "Connector" },
            { id: "wc02", en: "Firstly / Secondly", es: "En primer lugar / En segundo lugar", note: "Para ordenar argumentos.", emoji: "🔢", tag: "Connector" },
            { id: "wc03", en: "For instance / For example", es: "Por ejemplo", note: "Para dar un ejemplo.", emoji: "🧪", tag: "Connector" },
            { id: "wc04", en: "In addition / Moreover", es: "Además / Es más", note: "Para sumar un argumento a favor.", emoji: "➕", tag: "Connector" },
            { id: "wc05", en: "However", es: "Sin embargo", note: "Para introducir un contraste.", emoji: "↔️", tag: "Connector" },
            { id: "wc06", en: "Whereas", es: "Mientras que", note: "Contrasta dos ideas en la misma oración.", emoji: "⚖️", tag: "Connector" },
            { id: "wc07", en: "Nevertheless", es: "No obstante", note: "Contraste formal, como 'however'.", emoji: "🪧", tag: "Connector" },
            { id: "wc08", en: "On the other hand", es: "Por otro lado", note: "Para presentar el otro lado del tema.", emoji: "🪙", tag: "Connector" },
            { id: "wc09", en: "Actually", es: "En realidad", note: "Para aclarar o corregir una idea.", emoji: "💬", tag: "Connector" },
            { id: "wc10", en: "In conclusion", es: "En conclusión", note: "Para cerrar con tu opinión en la P4.", emoji: "🏁", tag: "Connector" }
          ]
        }
      ]
    },

    // ======================================================
    //  CLASE 4 — 21/10
    // ======================================================
    {
      id: "clase4", name: "Clase 4 — 21/10", date: "2025-10-21", emoji: "🎤",
      decks: [
        {
          id: "speaking-phrases",
          name: "Frases de Speaking",
          emoji: "🗣️",
          color: "#6c5ce7",
          description: "Las 15 frases memorizadas + banco útil para no trabarte.",
          cards: [
            // --- Las 15 memorizadas ---
            { id: "sp01", en: "I'd like to talk about this topic.", es: "Me gustaría hablar de este tema.", note: "Para ELEGIR un tema al empezar. 'I'd like' = me gustaría (no 'I like' = me gusta).", emoji: "🎯", tag: "Elegir tema" },
            { id: "sp02", en: "I think it's very interesting.", es: "Creo que es muy interesante.", note: "Opinión simple y segura.", emoji: "💭", tag: "Opinar" },
            { id: "sp03", en: "In my opinion, it's important.", es: "En mi opinión, es importante.", note: "Otra forma de dar tu opinión.", emoji: "💬", tag: "Opinar" },
            { id: "sp04", en: "I would choose this one because it's easier.", es: "Elegiría este porque es más fácil.", note: "Elegir + razón. 'choose' = elegir (verbo), 'choice' = elección (sustantivo).", emoji: "✅", tag: "Elegir tema" },
            { id: "sp05", en: "For example, in my experience...", es: "Por ejemplo, en mi experiencia...", note: "Para introducir un ejemplo personal.", emoji: "🧪", tag: "Ejemplo" },
            { id: "sp06", en: "I would try to stay calm.", es: "Trataría de mantener la calma.", note: "Acción imaginaria (second conditional). 'stay calm', NO 'stay and calm'.", emoji: "😌", tag: "Acción" },
            { id: "sp07", en: "I think it depends on the situation.", es: "Creo que depende de la situación.", note: "Útil cuando no querés comprometerte con una sola respuesta.", emoji: "⚖️", tag: "Opinar" },
            { id: "sp08", en: "The main reason is that...", es: "La razón principal es que...", note: "Para explicar tu razón principal.", emoji: "🔑", tag: "Explicar" },
            { id: "sp09", en: "What do you think about that?", es: "¿Qué pensás de eso?", note: "Invitar al compañero a participar.", emoji: "🤔", tag: "Interactuar" },
            { id: "sp10", en: "Do you agree with me?", es: "¿Estás de acuerdo conmigo?", note: "Buscar la reacción del compañero.", emoji: "🙋", tag: "Interactuar" },
            { id: "sp11", en: "That's a good point, but I disagree.", es: "Es un buen punto, pero no estoy de acuerdo.", note: "Reconocer antes de mostrar desacuerdo. Lleva 'a': a good point.", emoji: "🙅", tag: "Desacuerdo" },
            { id: "sp12", en: "I agree with you because...", es: "Estoy de acuerdo con vos porque...", note: "Acuerdo + razón.", emoji: "👍", tag: "Acuerdo" },
            { id: "sp13", en: "Let me think for a second.", es: "Dejame pensar un segundo.", note: "Ganar tiempo sin quedarte en silencio. NO 'let me think, but for a second'.", emoji: "⏳", tag: "Ganar tiempo" },
            { id: "sp14", en: "That's a difficult question.", es: "Es una pregunta difícil.", note: "Ganar tiempo. Lleva 'a': a difficult question.", emoji: "😅", tag: "Ganar tiempo" },
            { id: "sp15", en: "I'm not sure, but I think...", es: "No estoy seguro, pero creo que...", note: "Arrancar una respuesta cuando dudás.", emoji: "🤷", tag: "Ganar tiempo" },
            // --- Banco útil extra ---
            { id: "sp16", en: "What about you?", es: "¿Y vos?", note: "Devolver la palabra al compañero. Variá, no la repitas siempre.", emoji: "🔁", tag: "Interactuar" },
            { id: "sp17", en: "How about you?", es: "¿Y vos? / ¿Qué tal vos?", note: "Variante de 'What about you?'.", emoji: "🔄", tag: "Interactuar" },
            { id: "sp18", en: "Would you do the same?", es: "¿Harías lo mismo?", note: "Pregunta sobre una situación imaginaria.", emoji: "❓", tag: "Interactuar" },
            { id: "sp19", en: "That's true.", es: "Es verdad.", note: "Reacción corta de acuerdo.", emoji: "✔️", tag: "Acuerdo" },
            { id: "sp20", en: "I see your point, but...", es: "Entiendo tu punto, pero...", note: "Desacuerdo educado.", emoji: "🤝", tag: "Desacuerdo" },
            { id: "sp21", en: "On the other hand...", es: "Por otro lado...", note: "Para introducir el otro lado / contraste.", emoji: "🪙", tag: "Comparar" },
            { id: "sp22", en: "Have you ever felt the same way?", es: "¿Alguna vez te sentiste igual?", note: "Pregunta de seguimiento sobre experiencias.", emoji: "💗", tag: "Interactuar" },
            { id: "sp23", en: "Because everything is new.", es: "Porque todo es nuevo.", note: "Razón típica para 'nervous/excited' en un trabajo o mudanza.", emoji: "🆕", tag: "Explicar" },
            { id: "sp24", en: "Let me see...", es: "A ver...", note: "Ganar tiempo brevemente.", emoji: "👀", tag: "Ganar tiempo" },
            { id: "sp25", en: "I'm not sure about that.", es: "No estoy muy seguro de eso.", note: "Desacuerdo suave / duda.", emoji: "🧐", tag: "Desacuerdo" }
          ]
        },
        {
          id: "past-modals", name: "Past Modals (Deduction)", emoji: "🔮", color: "#a29bfe",
          description: "modal + have + past participle para deducir sobre el pasado.",
          cards: [
            { id: "pm01", en: "You must have been delighted.", es: "Debés haber estado encantado.", note: "must have + pp = casi seguro.", emoji: "😄", tag: "Casi seguro" },
            { id: "pm02", en: "She must have fallen off her bike.", es: "Se debe haber caído de la bici.", note: "must have + pp. Deducción con casi certeza.", emoji: "🚲", tag: "Casi seguro" },
            { id: "pm03", en: "He might have gone home.", es: "Puede que se haya ido a casa.", note: "might/may/could have + pp = posible.", emoji: "🏠", tag: "Posible" },
            { id: "pm04", en: "She could have sprained her ankle.", es: "Podría haberse torcido el tobillo.", note: "could have + pp = posibilidad.", emoji: "🦶", tag: "Posible" },
            { id: "pm05", en: "She might not have read the email.", es: "Quizá no leyó el mail.", note: "might not have + pp = quizá no pasó.", emoji: "📧", tag: "Quizá no" },
            { id: "pm06", en: "You can't have seen my parents. They're away.", es: "No podés haber visto a mis viejos. Están de viaje.", note: "can't have + pp = casi imposible.", emoji: "🚫", tag: "Casi imposible" },
            { id: "pm07", en: "He couldn't have done it alone.", es: "No puede haberlo hecho solo.", note: "couldn't have + pp = casi imposible.", emoji: "🙅", tag: "Casi imposible" },
            { id: "pm08", en: "She might have hit her head.", es: "Puede que se haya golpeado la cabeza.", note: "might have + pp. Deducción posible (foto del accidente).", emoji: "🤕", tag: "Posible" }
          ]
        },
        {
          id: "should-have", name: "Should Have / Ought to Have", emoji: "😬", color: "#e17055",
          description: "Críticas y arrepentimientos sobre algo correcto que no se hizo.",
          cards: [
            { id: "sh01", en: "We should have filled up at the last garage.", es: "Deberíamos haber cargado nafta en la última estación.", note: "should have + pp = algo correcto que no hiciste.", emoji: "⛽", tag: "Should have" },
            { id: "sh02", en: "I shouldn't have shouted at him.", es: "No debería haberle gritado.", note: "shouldn't have + pp = arrepentimiento.", emoji: "😔", tag: "Shouldn't have" },
            { id: "sh03", en: "They ought to have dressed up for the wedding.", es: "Deberían haberse arreglado para el casamiento.", note: "ought to have + pp = igual que 'should have'.", emoji: "👔", tag: "Ought to have" },
            { id: "sh04", en: "He ought not to have left his phone on his desk.", es: "No debería haber dejado el teléfono en el escritorio.", note: "ought not to have + pp.", emoji: "📱", tag: "Ought not" },
            { id: "sh05", en: "She should have been more careful.", es: "Debería haber tenido más cuidado.", note: "Crítica sobre el accidente de la bici.", emoji: "⚠️", tag: "Should have" },
            { id: "sh06", en: "She ought not to have ridden so fast.", es: "No debería haber andado tan rápido.", note: "ought not to have + pp. Crítica.", emoji: "💨", tag: "Ought not" },
            { id: "sh07", en: "I should have studied more for the exam.", es: "Debería haber estudiado más para el examen.", note: "Arrepentimiento típico. should have + pp.", emoji: "📚", tag: "Should have" }
          ]
        },
        {
          id: "would-rather", name: "Would Rather", emoji: "🤷", color: "#fd79a8",
          description: "would rather + base verb (mismo sujeto) / + persona + past simple (otro).",
          cards: [
            { id: "wr01", en: "I'd rather stay home.", es: "Prefiero quedarme en casa.", note: "Mismo sujeto: would rather + base verb.", emoji: "🏠", tag: "Mismo sujeto" },
            { id: "wr02", en: "I'd rather see that film at the cinema.", es: "Prefiero ver esa película en el cine.", note: "would rather + base verb (sin 'to').", emoji: "🎬", tag: "Mismo sujeto" },
            { id: "wr03", en: "I'd rather sit by the window.", es: "Prefiero sentarme al lado de la ventana.", note: "would rather + base verb.", emoji: "🪟", tag: "Mismo sujeto" },
            { id: "wr04", en: "I'd rather you cooked tonight.", es: "Preferiría que cocines vos esta noche.", note: "Otro sujeto: would rather + persona + past simple.", emoji: "🍳", tag: "Otro sujeto" },
            { id: "wr05", en: "I'd rather you didn't post photos of me.", es: "Preferiría que no subas fotos mías.", note: "would rather + persona + didn't + base verb.", emoji: "📸", tag: "Otro sujeto" },
            { id: "wr06", en: "What would you rather do: stay in or go out?", es: "¿Qué preferirías hacer: quedarte o salir?", note: "Pregunta con would rather + base verb.", emoji: "❓", tag: "Pregunta" }
          ]
        },
        {
          id: "crime-vocab",
          name: "Vocabulario: Crime",
          emoji: "🚔",
          color: "#e17055",
          description: "Los delitos del Senior 5 con ejemplo y ayuda visual.",
          cards: [
            { id: "cr01", en: "blackmail", es: "chantaje", note: "He was arrested for blackmail.", emoji: "✉️", tag: "Crime" },
            { id: "cr02", en: "bribery", es: "soborno / coima", note: "The politician was accused of bribery.", emoji: "💵", tag: "Crime" },
            { id: "cr03", en: "burglary", es: "robo entrando a una casa/edificio", note: "There was a burglary in our neighbourhood.", emoji: "🏠", tag: "Crime" },
            { id: "cr04", en: "drug dealing", es: "venta de drogas", note: "He was arrested for drug dealing.", emoji: "💊", tag: "Crime" },
            { id: "cr05", en: "fraud", es: "fraude / estafa", note: "The company was investigated for fraud.", emoji: "🧾", tag: "Crime" },
            { id: "cr06", en: "hacking", es: "acceso ilegal a sistemas", note: "Hacking is a serious crime.", emoji: "💻", tag: "Crime" },
            { id: "cr07", en: "hijacking", es: "secuestro de avión/vehículo", note: "The police stopped an attempted hijacking.", emoji: "✈️", tag: "Crime" },
            { id: "cr08", en: "kidnapping", es: "secuestro de una persona", note: "The kidnapping was reported to the police.", emoji: "🧍", tag: "Crime" },
            { id: "cr09", en: "mugging", es: "robo violento en la calle", note: "She was the victim of a mugging.", emoji: "🌃", tag: "Crime" },
            { id: "cr10", en: "murder", es: "asesinato", note: "He was charged with murder.", emoji: "🔪", tag: "Crime" },
            { id: "cr11", en: "rape", es: "violación", note: "Rape is a serious crime.", emoji: "⚠️", tag: "Crime" },
            { id: "cr12", en: "robbery", es: "robo (con violencia/amenaza)", note: "The bank robbery happened yesterday.", emoji: "🏦", tag: "Crime" },
            { id: "cr13", en: "smuggling", es: "contrabando", note: "They were arrested for smuggling.", emoji: "📦", tag: "Crime" },
            { id: "cr14", en: "stalking", es: "acoso / seguir obsesivamente", note: "She reported him for stalking.", emoji: "👣", tag: "Crime" },
            { id: "cr15", en: "terrorism", es: "terrorismo", note: "Investigating the attack as terrorism.", emoji: "💥", tag: "Crime" },
            { id: "cr16", en: "theft", es: "robo / hurto", note: "Car theft is common in some areas.", emoji: "🚗", tag: "Crime" },
            { id: "cr17", en: "vandalism", es: "vandalismo / daño a propiedad", note: "The wall was damaged by vandalism.", emoji: "🎨", tag: "Crime" }
          ]
        },
        {
          id: "criminals-verbs", name: "Criminals & Verbs", emoji: "🦹", color: "#636e72",
          description: "El criminal y su verbo: burglar/burgle, murderer/murder, etc.",
          cards: [
            { id: "cm01", en: "burglar → to burgle", es: "ladrón de casas → robar una casa", note: "A burglar burgles houses.", emoji: "🏚️", tag: "Criminal + verb" },
            { id: "cm02", en: "murderer → to murder", es: "asesino → asesinar", note: "A murderer murders someone.", emoji: "🔪", tag: "Criminal + verb" },
            { id: "cm03", en: "stalker → to stalk", es: "acosador → acosar", note: "A stalker stalks someone.", emoji: "👣", tag: "Criminal + verb" },
            { id: "cm04", en: "hacker → to hack", es: "hacker → hackear", note: "A hacker hacks computers.", emoji: "💻", tag: "Criminal + verb" },
            { id: "cm05", en: "robber → to rob", es: "ladrón → robar (persona/lugar)", note: "A robber robs a bank or a person.", emoji: "🏦", tag: "Criminal + verb" },
            { id: "cm06", en: "thief → to steal", es: "ladrón → robar (un objeto)", note: "A thief steals objects. Irregular: steal-stole-stolen.", emoji: "🥷", tag: "Criminal + verb" },
            { id: "cm07", en: "kidnapper → to kidnap", es: "secuestrador → secuestrar", note: "A kidnapper kidnaps a person.", emoji: "🧍", tag: "Criminal + verb" },
            { id: "cm08", en: "smuggler → to smuggle", es: "contrabandista → contrabandear", note: "A smuggler smuggles goods.", emoji: "📦", tag: "Criminal + verb" }
          ]
        },
        {
          id: "rob-vs-steal", name: "Rob vs Steal", emoji: "⚖️", color: "#d63031",
          description: "rob + persona/lugar vs steal + objeto.",
          cards: [
            { id: "rs01", en: "They robbed the bank.", es: "Robaron el banco.", note: "rob + lugar. ✔️", emoji: "🏦", tag: "rob" },
            { id: "rs02", en: "Someone robbed him.", es: "Alguien lo robó (a él).", note: "rob + persona. ✔️", emoji: "🧍", tag: "rob" },
            { id: "rs03", en: "They stole my phone.", es: "Me robaron el teléfono.", note: "steal + objeto. ✔️", emoji: "📱", tag: "steal" },
            { id: "rs04", en: "Someone stole the money.", es: "Alguien robó la plata.", note: "steal + objeto. ✔️", emoji: "💰", tag: "steal" },
            { id: "rs05", en: "❌ They stole the bank.", es: "(incorrecto) con steal no va el lugar", note: "Con un lugar se usa rob, no steal.", emoji: "🚫", tag: "Error" },
            { id: "rs06", en: "❌ They robbed my phone.", es: "(incorrecto) con rob no va el objeto", note: "Con un objeto se usa steal, no rob.", emoji: "🚫", tag: "Error" }
          ]
        },
        {
          id: "story-lamb-to-the-slaughter", name: "Lamb to the Slaughter", emoji: "🐑", color: "#b2bec3",
          description: "Vocabulario y expresiones clave del cuento de Roald Dahl.",
          cards: [
            { id: "lamb01", en: "frozen leg of lamb", es: "pata de cordero congelada", note: "El arma con la que Mary golpea a Patrick.", emoji: "🍖", tag: "Story" },
            { id: "lamb02", en: "to hit someone on the head", es: "golpear a alguien en la cabeza", note: "Lo que Mary le hace a su marido.", emoji: "🔨", tag: "Story" },
            { id: "lamb03", en: "distant", es: "distante", note: "Mary nota a Patrick distant y raro.", emoji: "😐", tag: "Story" },
            { id: "lamb04", en: "in shock", es: "en shock / conmocionada", note: "Cómo queda Mary tras la noticia.", emoji: "😨", tag: "Story" },
            { id: "lamb05", en: "to act strangely", es: "actuar de forma extraña", note: "Patrick bebe y se comporta raro.", emoji: "🥃", tag: "Story" },
            { id: "lamb06", en: "to have a drink", es: "tomar un trago", note: "Patrick bebe más de lo normal.", emoji: "🍸", tag: "Story" },
            { id: "lamb07", en: "to collapse on the floor", es: "desplomarse en el piso", note: "Patrick cae al suelo tras el golpe.", emoji: "💥", tag: "Story" }
          ]
        },
        {
          id: "speaking-papers", name: "Speaking Papers (Frames)", emoji: "🧩", color: "#00b894",
          description: "Estructuras de los 3 papers: second conditional, feelings y sueño.",
          cards: [
            { id: "pf01", en: "If I got lost in the Amazon rainforest, I would feel really scared.", es: "Si me perdiera en la selva amazónica, me sentiría muy asustado.", note: "Paper 1: second conditional. 'I would feel', NO 'I will feel'.", emoji: "🌴", tag: "Paper 1" },
            { id: "pf02", en: "First, I would try to stay calm because panic makes things worse.", es: "Primero, trataría de mantener la calma porque el pánico empeora todo.", note: "Paper 1: 'stay calm', NO 'stay and calm'.", emoji: "😌", tag: "Paper 1" },
            { id: "pf03", en: "If I got lost in a foreign city, I would try to find a public place with lots of people.", es: "Si me perdiera en una ciudad extranjera, buscaría un lugar público con mucha gente.", note: "Paper 1: versión natural del subtópico ciudad.", emoji: "🏙️", tag: "Paper 1" },
            { id: "pf04", en: "If my phone was dead, I would try to find someone to ask for help.", es: "Si me quedara sin batería, buscaría a alguien para pedir ayuda.", note: "Paper 1: 'my phone is dead' = sin batería.", emoji: "🔋", tag: "Paper 1" },
            { id: "pf05", en: "Starting a new job, I would feel excited but nervous because everything is new.", es: "Al empezar un trabajo nuevo, me sentiría entusiasmado pero nervioso porque todo es nuevo.", note: "Paper 2: feelings. 'I would feel', NO 'I will feel'.", emoji: "💼", tag: "Paper 2" },
            { id: "pf06", en: "On my first day, I would try to make a good impression.", es: "En mi primer día, trataría de causar una buena impresión.", note: "Paper 2: 'On my first day' (NO 'In'); 'a good impression'.", emoji: "🤝", tag: "Paper 2" },
            { id: "pf07", en: "Why would you feel sad?", es: "¿Por qué te sentirías triste?", note: "Paper 2: 'Why WOULD you' (imaginado) vs 'Why DO you' (real).", emoji: "❓", tag: "Paper 2" },
            { id: "pf08", en: "Having financial problems, I would feel stressed and worried.", es: "Con problemas de plata, me sentiría estresado y preocupado.", note: "Paper 2: feelings + razón.", emoji: "💸", tag: "Paper 2" },
            { id: "pf09", en: "Caffeine keeps you awake, so it's difficult to fall asleep.", es: "La cafeína te mantiene despierto, así que cuesta quedarse dormido.", note: "Paper 3: 'fall asleep', NO 'feel sleep'.", emoji: "☕", tag: "Paper 3" },
            { id: "pf10", en: "Smoking can affect your sleep because nicotine keeps you awake.", es: "Fumar puede afectar el sueño porque la nicotina te mantiene despierto.", note: "Paper 3: causa y consecuencia.", emoji: "🚬", tag: "Paper 3" },
            { id: "pf11", en: "Jet lag can make you feel tired during the day.", es: "El jet lag puede hacer que te sientas cansado durante el día.", note: "Paper 3: cuidado con can vs can't.", emoji: "🛬", tag: "Paper 3" },
            { id: "pf12", en: "If my neighbours make a lot of noise, I find it difficult to fall asleep.", es: "Si mis vecinos hacen mucho ruido, me cuesta quedarme dormido.", note: "Paper 3: 'neighbours' (vecinos) ≠ 'neighbourhood' (barrio).", emoji: "🔊", tag: "Paper 3" }
          ]
        }
      ]
    }
  ],
  quizzes: [
    {
      id: "quiz-passive-voice",
      name: "Quiz: Passive Voice",
      emoji: "🔄",
      description: "Practica voz pasiva en diferentes tiempos",
      difficulty: "medium",
      questions: [
        {
          id: "pv-q1",
          type: "gap-fill",
          prompt: "Complete la oración: 'The door _______ locked.'",
          options: ["is", "was", "be", "are"],
          correct: "is",
          explanation: "Present simple passive con 'is' (singular). The door = sujeto singular.",
          points: 10
        },
        {
          id: "pv-q2",
          type: "multiple-choice",
          prompt: "Traduce: 'Me robaron el teléfono.'",
          options: ["My phone is stolen.", "My phone has been stolen.", "My phone is being stolen.", "My phone was stolen."],
          correct: "My phone has been stolen.",
          explanation: "Present perfect passive (acción reciente sin especificar cuándo). 'has been stolen' = me lo robaron (recientemente).",
          points: 10
        },
        {
          id: "pv-q3",
          type: "typing",
          prompt: "Completa: 'La casa fue pintada el año pasado.' → 'The house _______ painted last year.'",
          correct: "was",
          variations: ["was"],
          explanation: "Past simple passive con 'was' (singular). The house = sujeto singular.",
          points: 10
        },
        {
          id: "pv-q4",
          type: "multiple-choice",
          prompt: "¿Cuál es la forma correcta en futuro pasivo?",
          options: ["The project will built.", "The project will be built.", "The project is going to built.", "The project has been built."],
          correct: "The project will be built.",
          explanation: "Future simple passive: will be + past participle.",
          points: 10
        },
        {
          id: "pv-q5",
          type: "gap-fill",
          prompt: "Complete: 'Me están pintando la casa.' → 'My house _______ being painted.'",
          options: ["is", "are", "was", "be"],
          correct: "is",
          explanation: "Present continuous passive: is/are + being + pp. 'My house' = singular → 'is'.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-causative",
      name: "Quiz: Causative Have",
      emoji: "✂️",
      description: "Have + objeto + past participle",
      difficulty: "medium",
      questions: [
        {
          id: "ch-q1",
          type: "multiple-choice",
          prompt: "Traduce: 'Me corté el pelo.'",
          options: ["I cut my hair.", "I had my hair cut.", "I have cut my hair.", "I'm cutting my hair."],
          correct: "I had my hair cut.",
          explanation: "Causative: alguien más lo hace. 'have + object + pp' = otro lo hace por vos.",
          points: 10
        },
        {
          id: "ch-q2",
          type: "typing",
          prompt: "Completa: 'Nos sacaron una foto.' → 'We _______ our photo taken.'",
          correct: "had",
          variations: ["had"],
          explanation: "Causative have (pasado): had + object + pp.",
          points: 10
        },
        {
          id: "ch-q3",
          type: "gap-fill",
          prompt: "Complete: 'Le robaron el iPhone.' → 'She _______ her iPhone stolen.'",
          options: ["has had", "had", "have", "is having"],
          correct: "had",
          explanation: "Causative (pasado simple): had + object + pp.",
          points: 10
        },
        {
          id: "ch-q4",
          type: "multiple-choice",
          prompt: "¿Qué expresa 'I had my house burgled'?",
          options: ["Yo mismo entré a robar.", "Algo malo que me sucedió (no especifico quién).", "Yo robé la casa.", "La casa está siendo robada."],
          correct: "Algo malo que me sucedió (no especifico quién).",
          explanation: "Causative con significado de 'algo malo': algo te pasó sin asumir responsabilidad de quién.",
          points: 10
        },
        {
          id: "ch-q5",
          type: "typing",
          prompt: "Completa: 'Deberías hacerte revisar la vista.' → 'You should _______ your eyes tested.'",
          correct: "have",
          variations: ["have"],
          explanation: "Causative con should: should + have + object + pp.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-reporting-verbs",
      name: "Quiz: Reporting Verbs",
      emoji: "🗨️",
      description: "Say, tell, report, claim...",
      difficulty: "hard",
      questions: [
        {
          id: "rv-q1",
          type: "multiple-choice",
          prompt: "Elige la opción correcta:",
          options: ["He said me that he's late.", "He told me that he's late.", "He said that he's late to me.", "He told me he is late."],
          correct: "He told me that he's late.",
          explanation: "'Tell' lleva objeto indirecto (me). 'Say' no. Ambas opciones son válidas como estructura, pero 'told me' es la más natural.",
          points: 10
        },
        {
          id: "rv-q2",
          type: "typing",
          prompt: "Completa: 'Ella insistió en que había un error.' → 'She _______ that there was a mistake.'",
          correct: "insisted",
          variations: ["insisted"],
          explanation: "'Insist' (insistir) + that + oración. Verb of reporting.",
          points: 10
        },
        {
          id: "rv-q3",
          type: "gap-fill",
          prompt: "Complete: 'Él negó haber robado nada.' → 'He _______ stealing anything.'",
          options: ["told denying", "said denying", "denied", "refused"],
          correct: "denied",
          explanation: "'Deny' + gerundio (not doing something) es diferente de 'refuse' (refuse to do something).",
          points: 10
        },
        {
          id: "rv-q4",
          type: "multiple-choice",
          prompt: "¿Cuál es la diferencia entre 'say' y 'tell'?",
          options: ["'Say' + objeto; 'tell' sin objeto.", "'Tell' + objeto; 'say' sin objeto directo.", "No hay diferencia.", "'Say' es pasado; 'tell' es presente."],
          correct: "'Tell' + objeto; 'say' sin objeto directo.",
          explanation: "'Tell me, tell him' (tell + OI). 'Say that...' (say sin OI directo en la construcción básica).",
          points: 10
        },
        {
          id: "rv-q5",
          type: "typing",
          prompt: "Completa: 'Ella afirmó que vio el accidente.' → 'She _______ that she saw the accident.'",
          correct: "claimed",
          variations: ["claimed"],
          explanation: "'Claim' (afirmar, pretender) + that + oración.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-modal-deduction",
      name: "Quiz: Past Modals (Deduction)",
      emoji: "🔮",
      description: "Must have, might have, can't have para deducción en el pasado",
      difficulty: "hard",
      questions: [
        {
          id: "pm-q1",
          type: "multiple-choice",
          prompt: "'He didn't answer the phone. He ____ sleeping.' Completa con la deducción más lógica:",
          options: ["must have been", "might have been", "can't have been", "should have been"],
          correct: "must have been",
          explanation: "'Must have been' = deduzco que estaba durmiendo (casi seguro). Lo más probable.",
          points: 10
        },
        {
          id: "pm-q2",
          type: "typing",
          prompt: "Traduce: 'No podría haber robado el banco, estaba en casa.' → 'He _______ robbed the bank; he was home.'",
          correct: "can't have",
          variations: ["can't have", "couldn't have"],
          explanation: "'Can't have' = imposible que haya pasado.",
          points: 10
        },
        {
          id: "pm-q3",
          type: "gap-fill",
          prompt: "Complete: 'Tal vez lo viera, no estoy seguro.' → 'He _______ seen it. I'm not sure.'",
          options: ["might have", "must have", "could have", "should have"],
          correct: "might have",
          explanation: "'Might have' (podría haber) = no estoy seguro. Posibilidad débil.",
          points: 10
        },
        {
          id: "pm-q4",
          type: "multiple-choice",
          prompt: "¿Cuál expresa la deducción más fuerte (casi certeza)?",
          options: ["She might have left.", "She could have left.", "She must have left.", "She should have left."],
          correct: "She must have left.",
          explanation: "'Must have' = casi certeza. 'Might/could have' = posibilidad débil. 'Should have' = arrepentimiento.",
          points: 10
        },
        {
          id: "pm-q5",
          type: "typing",
          prompt: "Completa: 'Probablemente llegó tarde por el tráfico.' → 'He _______ late because of traffic.'",
          correct: "must have been",
          variations: ["must have been"],
          explanation: "'Must have been' + adjective/noun para deducción en pasado.",
          points: 10
        }
      ]
    }
,
    {
      id: "quiz-causative-have",
      name: "Quiz: Causative Have",
      emoji: "✂️",
      description: "Practica causative have",
      difficulty: "medium",
      deckId: "causative-have",
      questions: [
        {
          id: "causative-have-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'I had my hair cut.'?",
          options: ["Me corté el pelo (me lo cortaron).", "Mal: Me corté el pelo (me...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Me corté el pelo (me lo cortaron).",
          explanation: "I had my hair cut. = Me corté el pelo (me lo cortaron).. Contexto: Otro lo hace por vos. Compará: 'I cut my hair' = vos mismo.",
          points: 10
        },
        {
          id: "causative-have-q2",
          type: "gap-fill",
          prompt: "Completa: 'We had _____ photo taken.'",
          options: ["our", "NO our", "OUR", "our"],
          correct: "our",
          explanation: "La palabra faltante es 'our' en 'We had our photo taken.'.",
          points: 10
        },
        {
          id: "causative-have-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'You should have your eyes tested.'?",
          options: ["Deberías hacerte revisar la vista.", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "Deberías hacerte revisar la vista.",
          explanation: "Un profesional lo hace por vos.",
          points: 10
        },
        {
          id: "causative-have-q4",
          type: "typing",
          prompt: "Completa la oración: 'Our ____' (el resto de: 'Our neighbours are having a swimming pool built.')",
          options: [],
          correct: "neighbours are having a swimming pool built.",
          explanation: "Respuesta completa: 'Our neighbours are having a swimming pool built.'",
          points: 10
        },
        {
          id: "causative-have-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'She had her iPhone stolen.'?",
          options: ["Algo malo que te sucede. have + object + pp.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Algo malo que te sucede. have + object + pp.",
          explanation: "Algo malo que te sucede. have + object + pp.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-impersonal-passive",
      name: "Quiz: Impersonal Passive",
      emoji: "📰",
      description: "Practica impersonal passive",
      difficulty: "medium",
      deckId: "impersonal-passive",
      questions: [
        {
          id: "impersonal-passive-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'It is said that he is dangerous.'?",
          options: ["Se dice que es peligroso.", "Mal: Se dice que es pelig...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Se dice que es peligroso.",
          explanation: "It is said that he is dangerous. = Se dice que es peligroso.. Contexto: It is + pp + that… No decís quién lo afirma.",
          points: 10
        },
        {
          id: "impersonal-passive-q2",
          type: "gap-fill",
          prompt: "Completa: 'It is believed that _____ is a local man.'",
          options: ["he", "NO he", "HE", "he"],
          correct: "he",
          explanation: "La palabra faltante es 'he' en 'It is believed that he is a local man.'.",
          points: 10
        },
        {
          id: "impersonal-passive-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'It is thought that the mayor will resign.'?",
          options: ["Se piensa que el intendente va a renunciar.", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "Se piensa que el intendente va a renunciar.",
          explanation: "Verbos: say, believe, think, report, know, expect.",
          points: 10
        },
        {
          id: "impersonal-passive-q4",
          type: "typing",
          prompt: "Completa la oración: 'The ____' (el resto de: 'The man is said to be in his forties.')",
          options: [],
          correct: "man is said to be in his forties.",
          explanation: "Respuesta completa: 'The man is said to be in his forties.'",
          points: 10
        },
        {
          id: "impersonal-passive-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'The burglar is believed to be a local man.'?",
          options: ["is believed to be: más impersonal.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "is believed to be: más impersonal.",
          explanation: "is believed to be: más impersonal.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-identity-theft-vocab",
      name: "Quiz: Identity Theft",
      emoji: "🪪",
      description: "Practica identity theft",
      difficulty: "medium",
      deckId: "identity-theft-vocab",
      questions: [
        {
          id: "identity-theft-vocab-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'identity theft'?",
          options: ["robo de identidad", "Mal: robo de identidad...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "robo de identidad",
          explanation: "identity theft = robo de identidad. Contexto: Usar los datos de otro para hacerse pasar por esa persona.",
          points: 10
        },
        {
          id: "identity-theft-vocab-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'personal information'?",
          options: ["información personal", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "información personal",
          explanation: "Datos que no hay que compartir online.",
          points: 10
        },
        {
          id: "identity-theft-vocab-q4",
          type: "typing",
          prompt: "Completa la oración: 'to ____' (el resto de: 'to misuse someone's photos')",
          options: [],
          correct: "misuse someone's photos",
          explanation: "Respuesta completa: 'to misuse someone's photos'",
          points: 10
        },
        {
          id: "identity-theft-vocab-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'to steal someone's identity'?",
          options: ["steal + object. Lo que le pasó a Martin Peterson.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "steal + object. Lo que le pasó a Martin Peterson.",
          explanation: "steal + object. Lo que le pasó a Martin Peterson.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-story-way-up-to-heaven",
      name: "Quiz: The Way Up to Heaven",
      emoji: "🛫",
      description: "Practica the way up to heaven",
      difficulty: "medium",
      deckId: "story-way-up-to-heaven",
      questions: [
        {
          id: "story-way-up-to-heaven-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'delayed flight'?",
          options: ["vuelo demorado", "Mal: vuelo demorado...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "vuelo demorado",
          explanation: "delayed flight = vuelo demorado. Contexto: El vuelo de Mrs Foster a París se demora.",
          points: 10
        },
        {
          id: "story-way-up-to-heaven-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'to be afraid of being late'?",
          options: ["tener miedo de llegar tarde", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "tener miedo de llegar tarde",
          explanation: "El miedo extremo de Mrs Foster.",
          points: 10
        },
        {
          id: "story-way-up-to-heaven-q4",
          type: "typing",
          prompt: "Completa la oración: 'to ____' (el resto de: 'to delay someone on purpose')",
          options: [],
          correct: "delay someone on purpose",
          explanation: "Respuesta completa: 'to delay someone on purpose'",
          points: 10
        },
        {
          id: "story-way-up-to-heaven-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'the little white box'?",
          options: ["La excusa de Mr Foster para volver a entrar a la casa.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "La excusa de Mr Foster para volver a entrar a la casa.",
          explanation: "La excusa de Mr Foster para volver a entrar a la casa.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-headlines",
      name: "Quiz: Headline Language",
      emoji: "🗞️",
      description: "Practica headline language",
      difficulty: "medium",
      deckId: "headlines",
      questions: [
        {
          id: "headlines-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'back'?",
          options: ["apoyar", "Mal: apoyar...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "apoyar",
          explanation: "back = apoyar. Contexto: Prime Minister backs proposal.",
          points: 10
        },
        {
          id: "headlines-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'hit'?",
          options: ["afectar negativamente", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "afectar negativamente",
          explanation: "Stock market hit by oil fears.",
          points: 10
        },
        {
          id: "headlines-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'clash'?",
          options: ["Ministers clash over tax proposal.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Ministers clash over tax proposal.",
          explanation: "Ministers clash over tax proposal.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-media-people",
      name: "Quiz: People in the Media",
      emoji: "🎙️",
      description: "Practica people in the media",
      difficulty: "medium",
      deckId: "media-people",
      questions: [
        {
          id: "media-people-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'critic'?",
          options: ["crítico", "Mal: crítico...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "crítico",
          explanation: "critic = crítico. Contexto: Escribe reseñas de cine, música, etc.",
          points: 10
        },
        {
          id: "media-people-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'reporter'?",
          options: ["reportero", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "reportero",
          explanation: "Sale a cubrir y contar las noticias.",
          points: 10
        },
        {
          id: "media-people-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'presenter'?",
          options: ["Conduce un programa.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Conduce un programa.",
          explanation: "Conduce un programa.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-media-adjectives",
      name: "Quiz: Media Adjectives",
      emoji: "🧭",
      description: "Practica media adjectives",
      difficulty: "medium",
      deckId: "media-adjectives",
      questions: [
        {
          id: "media-adjectives-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'biased'?",
          options: ["parcial / tendencioso", "Mal: parcial / tendencios...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "parcial / tendencioso",
          explanation: "biased = parcial / tendencioso. Contexto: Muestra solo un lado. The article was very biased.",
          points: 10
        },
        {
          id: "media-adjectives-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'sensational'?",
          options: ["sensacionalista / exagerado", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "sensacionalista / exagerado",
          explanation: "Exagera para llamar la atención.",
          points: 10
        },
        {
          id: "media-adjectives-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'censored'?",
          options: ["Se ocultó o eliminó parte del contenido.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Se ocultó o eliminó parte del contenido.",
          explanation: "Se ocultó o eliminó parte del contenido.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-writing-connectors",
      name: "Quiz: Writing Connectors",
      emoji: "🔗",
      description: "Practica writing connectors",
      difficulty: "medium",
      deckId: "writing-connectors",
      questions: [
        {
          id: "writing-connectors-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'Nowadays'?",
          options: ["Hoy en día", "Mal: Hoy en día...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Hoy en día",
          explanation: "Nowadays = Hoy en día. Contexto: Para introducir el tema en la P1.",
          points: 10
        },
        {
          id: "writing-connectors-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'For instance / For example'?",
          options: ["Por ejemplo", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "Por ejemplo",
          explanation: "Para dar un ejemplo.",
          points: 10
        },
        {
          id: "writing-connectors-q4",
          type: "typing",
          prompt: "Completa la oración: 'In ____' (el resto de: 'In addition / Moreover')",
          options: [],
          correct: "addition / Moreover",
          explanation: "Respuesta completa: 'In addition / Moreover'",
          points: 10
        },
        {
          id: "writing-connectors-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'However'?",
          options: ["Para introducir un contraste.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Para introducir un contraste.",
          explanation: "Para introducir un contraste.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-speaking-phrases",
      name: "Quiz: Frases de Speaking",
      emoji: "🗣️",
      description: "Practica frases de speaking",
      difficulty: "medium",
      deckId: "speaking-phrases",
      questions: [
        {
          id: "speaking-phrases-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'I'd like to talk about this topic.'?",
          options: ["Me gustaría hablar de este tema.", "Mal: Me gustaría hablar d...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Me gustaría hablar de este tema.",
          explanation: "I'd like to talk about this topic. = Me gustaría hablar de este tema.. Contexto: Para ELEGIR un tema al empezar. 'I'd like' = me gustaría (no 'I like' = me gusta).",
          points: 10
        },
        {
          id: "speaking-phrases-q2",
          type: "gap-fill",
          prompt: "Completa: 'I think _____ very interesting.'",
          options: ["it's", "NO it's", "IT'S", "it's"],
          correct: "it's",
          explanation: "La palabra faltante es 'it's' en 'I think it's very interesting.'.",
          points: 10
        },
        {
          id: "speaking-phrases-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'In my opinion, it's important.'?",
          options: ["En mi opinión, es importante.", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "En mi opinión, es importante.",
          explanation: "Otra forma de dar tu opinión.",
          points: 10
        },
        {
          id: "speaking-phrases-q4",
          type: "typing",
          prompt: "Completa la oración: 'I ____' (el resto de: 'I would choose this one because it's easier.')",
          options: [],
          correct: "would choose this one because it's easier.",
          explanation: "Respuesta completa: 'I would choose this one because it's easier.'",
          points: 10
        },
        {
          id: "speaking-phrases-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'For example, in my experience...'?",
          options: ["Para introducir un ejemplo personal.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Para introducir un ejemplo personal.",
          explanation: "Para introducir un ejemplo personal.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-past-modals",
      name: "Quiz: Past Modals (Deduction)",
      emoji: "🔮",
      description: "Practica past modals (deduction)",
      difficulty: "medium",
      deckId: "past-modals",
      questions: [
        {
          id: "past-modals-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'You must have been delighted.'?",
          options: ["Debés haber estado encantado.", "Mal: Debés haber estado e...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Debés haber estado encantado.",
          explanation: "You must have been delighted. = Debés haber estado encantado.. Contexto: must have + pp = casi seguro.",
          points: 10
        },
        {
          id: "past-modals-q2",
          type: "gap-fill",
          prompt: "Completa: 'She must have _____ off her bike.'",
          options: ["fallen", "NO fallen", "FALLEN", "fallen"],
          correct: "fallen",
          explanation: "La palabra faltante es 'fallen' en 'She must have fallen off her bike.'.",
          points: 10
        },
        {
          id: "past-modals-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'He might have gone home.'?",
          options: ["Puede que se haya ido a casa.", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "Puede que se haya ido a casa.",
          explanation: "might/may/could have + pp = posible.",
          points: 10
        },
        {
          id: "past-modals-q4",
          type: "typing",
          prompt: "Completa la oración: 'She ____' (el resto de: 'She could have sprained her ankle.')",
          options: [],
          correct: "could have sprained her ankle.",
          explanation: "Respuesta completa: 'She could have sprained her ankle.'",
          points: 10
        },
        {
          id: "past-modals-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'She might not have read the email.'?",
          options: ["might not have + pp = quizá no pasó.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "might not have + pp = quizá no pasó.",
          explanation: "might not have + pp = quizá no pasó.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-should-have",
      name: "Quiz: Should Have / Ought to Have",
      emoji: "😬",
      description: "Practica should have / ought to have",
      difficulty: "medium",
      deckId: "should-have",
      questions: [
        {
          id: "should-have-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'We should have filled up at the last garage.'?",
          options: ["Deberíamos haber cargado nafta en la última estación.", "Mal: Deberíamos haber car...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Deberíamos haber cargado nafta en la última estación.",
          explanation: "We should have filled up at the last garage. = Deberíamos haber cargado nafta en la última estación.. Contexto: should have + pp = algo correcto que no hiciste.",
          points: 10
        },
        {
          id: "should-have-q2",
          type: "gap-fill",
          prompt: "Completa: 'I shouldn't have _____ at him.'",
          options: ["shouted", "NO shouted", "SHOUTED", "shouted"],
          correct: "shouted",
          explanation: "La palabra faltante es 'shouted' en 'I shouldn't have shouted at him.'.",
          points: 10
        },
        {
          id: "should-have-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'They ought to have dressed up for the wedding.'?",
          options: ["Deberían haberse arreglado para el casamiento.", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "Deberían haberse arreglado para el casamiento.",
          explanation: "ought to have + pp = igual que 'should have'.",
          points: 10
        },
        {
          id: "should-have-q4",
          type: "typing",
          prompt: "Completa la oración: 'He ____' (el resto de: 'He ought not to have left his phone on his desk.')",
          options: [],
          correct: "ought not to have left his phone on his desk.",
          explanation: "Respuesta completa: 'He ought not to have left his phone on his desk.'",
          points: 10
        },
        {
          id: "should-have-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'She should have been more careful.'?",
          options: ["Crítica sobre el accidente de la bici.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Crítica sobre el accidente de la bici.",
          explanation: "Crítica sobre el accidente de la bici.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-would-rather",
      name: "Quiz: Would Rather",
      emoji: "🤷",
      description: "Practica would rather",
      difficulty: "medium",
      deckId: "would-rather",
      questions: [
        {
          id: "would-rather-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'I'd rather stay home.'?",
          options: ["Prefiero quedarme en casa.", "Mal: Prefiero quedarme en...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Prefiero quedarme en casa.",
          explanation: "I'd rather stay home. = Prefiero quedarme en casa.. Contexto: Mismo sujeto: would rather + base verb.",
          points: 10
        },
        {
          id: "would-rather-q2",
          type: "gap-fill",
          prompt: "Completa: 'I'd rather see that _____ at the cinema.'",
          options: ["film", "NO film", "FILM", "film"],
          correct: "film",
          explanation: "La palabra faltante es 'film' en 'I'd rather see that film at the cinema.'.",
          points: 10
        },
        {
          id: "would-rather-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'I'd rather sit by the window.'?",
          options: ["Prefiero sentarme al lado de la ventana.", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "Prefiero sentarme al lado de la ventana.",
          explanation: "would rather + base verb.",
          points: 10
        },
        {
          id: "would-rather-q4",
          type: "typing",
          prompt: "Completa la oración: 'I'd ____' (el resto de: 'I'd rather you cooked tonight.')",
          options: [],
          correct: "rather you cooked tonight.",
          explanation: "Respuesta completa: 'I'd rather you cooked tonight.'",
          points: 10
        },
        {
          id: "would-rather-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'I'd rather you didn't post photos of me.'?",
          options: ["would rather + persona + didn't + base verb.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "would rather + persona + didn't + base verb.",
          explanation: "would rather + persona + didn't + base verb.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-crime-vocab",
      name: "Quiz: Vocabulario: Crime",
      emoji: "🚔",
      description: "Practica vocabulario: crime",
      difficulty: "medium",
      deckId: "crime-vocab",
      questions: [
        {
          id: "crime-vocab-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'blackmail'?",
          options: ["chantaje", "Mal: chantaje...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "chantaje",
          explanation: "blackmail = chantaje. Contexto: He was arrested for blackmail.",
          points: 10
        },
        {
          id: "crime-vocab-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'burglary'?",
          options: ["robo entrando a una casa/edificio", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "robo entrando a una casa/edificio",
          explanation: "There was a burglary in our neighbourhood.",
          points: 10
        },
        {
          id: "crime-vocab-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'fraud'?",
          options: ["The company was investigated for fraud.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "The company was investigated for fraud.",
          explanation: "The company was investigated for fraud.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-criminals-verbs",
      name: "Quiz: Criminals & Verbs",
      emoji: "🦹",
      description: "Practica criminals & verbs",
      difficulty: "medium",
      deckId: "criminals-verbs",
      questions: [
        {
          id: "criminals-verbs-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'burglar → to burgle'?",
          options: ["ladrón de casas → robar una casa", "Mal: ladrón de casas → ro...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "ladrón de casas → robar una casa",
          explanation: "burglar → to burgle = ladrón de casas → robar una casa. Contexto: A burglar burgles houses.",
          points: 10
        },
        {
          id: "criminals-verbs-q2",
          type: "gap-fill",
          prompt: "Completa: 'murderer → _____ murder'",
          options: ["to", "NO to", "TO", "to"],
          correct: "to",
          explanation: "La palabra faltante es 'to' en 'murderer → to murder'.",
          points: 10
        },
        {
          id: "criminals-verbs-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'stalker → to stalk'?",
          options: ["acosador → acosar", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "acosador → acosar",
          explanation: "A stalker stalks someone.",
          points: 10
        },
        {
          id: "criminals-verbs-q4",
          type: "typing",
          prompt: "Completa la oración: 'hacker ____' (el resto de: 'hacker → to hack')",
          options: [],
          correct: "→ to hack",
          explanation: "Respuesta completa: 'hacker → to hack'",
          points: 10
        },
        {
          id: "criminals-verbs-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'robber → to rob'?",
          options: ["A robber robs a bank or a person.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "A robber robs a bank or a person.",
          explanation: "A robber robs a bank or a person.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-rob-vs-steal",
      name: "Quiz: Rob vs Steal",
      emoji: "⚖️",
      description: "Practica rob vs steal",
      difficulty: "medium",
      deckId: "rob-vs-steal",
      questions: [
        {
          id: "rob-vs-steal-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'They robbed the bank.'?",
          options: ["Robaron el banco.", "Mal: Robaron el banco....", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Robaron el banco.",
          explanation: "They robbed the bank. = Robaron el banco.. Contexto: rob + lugar. ✔️",
          points: 10
        },
        {
          id: "rob-vs-steal-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'They stole my phone.'?",
          options: ["Me robaron el teléfono.", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "Me robaron el teléfono.",
          explanation: "steal + objeto. ✔️",
          points: 10
        },
        {
          id: "rob-vs-steal-q4",
          type: "typing",
          prompt: "Completa la oración: 'Someone ____' (el resto de: 'Someone stole the money.')",
          options: [],
          correct: "stole the money.",
          explanation: "Respuesta completa: 'Someone stole the money.'",
          points: 10
        },
        {
          id: "rob-vs-steal-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa '❌ They stole the bank.'?",
          options: ["Con un lugar se usa rob, no steal.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Con un lugar se usa rob, no steal.",
          explanation: "Con un lugar se usa rob, no steal.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-story-lamb-to-the-slaughter",
      name: "Quiz: Lamb to the Slaughter",
      emoji: "🐑",
      description: "Practica lamb to the slaughter",
      difficulty: "medium",
      deckId: "story-lamb-to-the-slaughter",
      questions: [
        {
          id: "story-lamb-to-the-slaughter-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'frozen leg of lamb'?",
          options: ["pata de cordero congelada", "Mal: pata de cordero cong...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "pata de cordero congelada",
          explanation: "frozen leg of lamb = pata de cordero congelada. Contexto: El arma con la que Mary golpea a Patrick.",
          points: 10
        },
        {
          id: "story-lamb-to-the-slaughter-q2",
          type: "gap-fill",
          prompt: "Completa: 'to hit someone _____ the head'",
          options: ["on", "NO on", "ON", "on"],
          correct: "on",
          explanation: "La palabra faltante es 'on' en 'to hit someone on the head'.",
          points: 10
        },
        {
          id: "story-lamb-to-the-slaughter-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'distant'?",
          options: ["distante", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "distante",
          explanation: "Mary nota a Patrick distant y raro.",
          points: 10
        },
        {
          id: "story-lamb-to-the-slaughter-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'to act strangely'?",
          options: ["Patrick bebe y se comporta raro.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Patrick bebe y se comporta raro.",
          explanation: "Patrick bebe y se comporta raro.",
          points: 10
        }
      ]
    },
    {
      id: "quiz-speaking-papers",
      name: "Quiz: Speaking Papers (Frames)",
      emoji: "🧩",
      description: "Practica speaking papers (frames)",
      difficulty: "medium",
      deckId: "speaking-papers",
      questions: [
        {
          id: "speaking-papers-q1",
          type: "multiple-choice",
          prompt: "¿Cuál es la traducción correcta de 'If I got lost in the Amazon rainforest, I would feel really scared.'?",
          options: ["Si me perdiera en la selva amazónica, me sentiría muy asustado.", "Mal: Si me perdiera en la...", "Opción incorrecta 1", "Opción incorrecta 2"],
          correct: "Si me perdiera en la selva amazónica, me sentiría muy asustado.",
          explanation: "If I got lost in the Amazon rainforest, I would feel really scared. = Si me perdiera en la selva amazónica, me sentiría muy asustado.. Contexto: Paper 1: second conditional. 'I would feel', NO 'I will feel'.",
          points: 10
        },
        {
          id: "speaking-papers-q2",
          type: "gap-fill",
          prompt: "Completa: 'First, I would try to stay _____ because panic makes things worse.'",
          options: ["calm", "NO calm", "CALM", "calm"],
          correct: "calm",
          explanation: "La palabra faltante es 'calm' en 'First, I would try to stay calm because panic makes things worse.'.",
          points: 10
        },
        {
          id: "speaking-papers-q3",
          type: "multiple-choice",
          prompt: "¿Qué significa 'If I got lost in a foreign city, I would try to find a public place with lots of people.'?",
          options: ["Si me perdiera en una ciudad extranjera, buscaría un lugar público con mucha gente.", "Significado falso 1", "Significado falso 2", "Significado falso 3"],
          correct: "Si me perdiera en una ciudad extranjera, buscaría un lugar público con mucha gente.",
          explanation: "Paper 1: versión natural del subtópico ciudad.",
          points: 10
        },
        {
          id: "speaking-papers-q4",
          type: "typing",
          prompt: "Completa la oración: 'If ____' (el resto de: 'If my phone was dead, I would try to find someone to ask for help.')",
          options: [],
          correct: "my phone was dead, I would try to find someone to ask for help.",
          explanation: "Respuesta completa: 'If my phone was dead, I would try to find someone to ask for help.'",
          points: 10
        },
        {
          id: "speaking-papers-q5",
          type: "multiple-choice",
          prompt: "¿Cuándo se usa 'Starting a new job, I would feel excited but nervous because everything is new.'?",
          options: ["Paper 2: feelings. 'I would feel', NO 'I will feel'.", "Nunca se usa", "Solo en pasado", "Solo en futuro"],
          correct: "Paper 2: feelings. 'I would feel', NO 'I will feel'.",
          explanation: "Paper 2: feelings. 'I would feel', NO 'I will feel'.",
          points: 10
        }
      ]
    }
    ]
};
