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
  ]
};
