// ============================================================
//  Papers del examen oral (modo Conversación) + diálogos para escuchar
//
//  PAPERS (interactivos): cada paper tiene una pregunta central y 5 opciones.
//    El alumno elige CUALQUIER opción y conversa sobre ESA, explicando por qué.
//    option: { id, label, emoji, steps:[ ... ] }
//    Paso teacher: { type:"teacher", en, es, alts?: [frases alternativas] }
//      -> si hay alts, se elige una al azar (da variedad).
//    Paso choice:  { type:"choice", options:[ {en, good, note} ] }
//      -> las opciones se mezclan al mostrarse; una sola es good:true.
//
//  LISTENINGS (escuchar): diálogo completo entre 2 personas, se reproduce
//  solo con voces alternadas. level: easy | medium | hard (corta/media/larga).
//    line: { sp: 0|1, en, es }
//  Todo el contenido sale de tu material de speaking (Papers 1, 2 y 3).
// ============================================================

window.PAPERS = [
  {
    id: "paper1",
    title: "Paper 1 — Getting lost",
    emoji: "🧭",
    question: "What would you do if you got lost in these places?",
    questionEs: "¿Qué harías si te perdieras en estos lugares?",
    options: [
      {
        id: "high-crime",
        label: "areas of high crime",
        emoji: "🚨",
        steps: [
          { type: "teacher", en: "Why would you choose areas of high crime?", es: "¿Por qué elegirías zonas de alta criminalidad?",
            alts: ["So, why areas of high crime?", "Why talk about areas of high crime?"] },
          { type: "choice", options: [
            { en: "I would choose it because it's a dangerous place and I would have to stay alert.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because I like.", good: false, note: "Incompleto: 'because I like it' + una razón real." },
            { en: "High crime.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "What would you do if you got lost there?", es: "¿Qué harías si te perdieras ahí?" },
          { type: "choice", options: [
            { en: "If I got lost, I would stay in a public place with lots of people.", good: true, note: "Second conditional + idea clara." },
            { en: "I will stay in a public place.", good: false, note: "En el condicional va 'would', no 'will'." },
          ]},
          { type: "teacher", en: "What if someone tried to rob you?", es: "¿Y si alguien intentara robarte?" },
          { type: "choice", options: [
            { en: "If someone tried to rob me, I would stay calm and give them my phone. What would you do?", good: true, note: "Desarrolla e invita al otro." },
            { en: "I would steal them.", good: false, note: "'steal' va con objetos; a una persona se la 'rob'. Acá querés 'they would rob me'." },
            { en: "I fight.", good: false, note: "Muy corto y sin condicional: 'I would try to stay calm'." },
          ]},
        ],
      },
      {
        id: "amazon",
        label: "the Amazon rainforest",
        emoji: "🌴",
        steps: [
          { type: "teacher", en: "Why would you choose the Amazon rainforest?", es: "¿Por qué elegirías la selva amazónica?",
            alts: ["So, why the Amazon rainforest?", "Why pick the Amazon rainforest?"] },
          { type: "choice", options: [
            { en: "I would choose it because it's a dangerous place and I would have to think fast.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because I like.", good: false, note: "Incompleto: 'because I like it' + una razón real." },
            { en: "The Amazon.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "What would you do first?", es: "¿Qué harías primero?" },
          { type: "choice", options: [
            { en: "First, I would try to stay calm because panic makes things worse.", good: true, note: "Second conditional + razón." },
            { en: "First, I will stay calm.", good: false, note: "En el condicional va 'would', no 'will'." },
          ]},
          { type: "teacher", en: "And what about water and food?", es: "¿Y el agua y la comida?" },
          { type: "choice", options: [
            { en: "I would look for a river and try to find fruit. What would you do?", good: true, note: "Desarrolla e invita al otro." },
            { en: "I eat animals.", good: false, note: "Mejor con condicional y más natural: 'I would try to find food'." },
            { en: "I find a river.", good: false, note: "Falta el condicional: 'I would look for a river'." },
          ]},
        ],
      },
      {
        id: "everest",
        label: "The Everest",
        emoji: "🏔️",
        steps: [
          { type: "teacher", en: "Why would you choose Everest?", es: "¿Por qué elegirías el Everest?",
            alts: ["So, why Everest?", "Why talk about Everest?"] },
          { type: "choice", options: [
            { en: "I would choose it because it's very cold and that would be a real challenge.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because is cold.", good: false, note: "Incompleto: 'because it's cold' + desarrollá la razón." },
            { en: "Everest.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "How would you feel up there?", es: "¿Cómo te sentirías allá arriba?" },
          { type: "choice", options: [
            { en: "If I got lost near Everest, I would feel cold and nervous.", good: true, note: "Second conditional + sentimiento." },
            { en: "I will feel cold.", good: false, note: "En el condicional va 'would feel', no 'will feel'." },
          ]},
          { type: "teacher", en: "What would you do to survive?", es: "¿Qué harías para sobrevivir?" },
          { type: "choice", options: [
            { en: "First, I would look for shelter from the wind. What about you?", good: true, note: "Idea clara + invita al otro." },
            { en: "I look for shelter.", good: false, note: "Falta el condicional: 'I would look for shelter'." },
            { en: "Nothing.", good: false, note: "Cerrás la conversación; conviene desarrollar." },
          ]},
        ],
      },
      {
        id: "atacama",
        label: "Atacama desert",
        emoji: "🏜️",
        steps: [
          { type: "teacher", en: "Why would you choose the Atacama desert?", es: "¿Por qué elegirías el desierto de Atacama?",
            alts: ["So, why the Atacama desert?", "Why pick the Atacama desert?"] },
          { type: "choice", options: [
            { en: "I would choose it because it's very hot and dry, so water would be a big problem.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because I like deserts.", good: false, note: "Mejor desarrollá: '...because it's hot and dry'." },
            { en: "Atacama.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "How would you feel if you got lost there?", es: "¿Cómo te sentirías si te perdieras ahí?" },
          { type: "choice", options: [
            { en: "If I got lost in the Atacama, I would feel thirsty and worried.", good: true, note: "Second conditional + sentimiento." },
            { en: "I will feel thirsty.", good: false, note: "En el condicional va 'would feel', no 'will feel'." },
          ]},
          { type: "teacher", en: "What would you do first?", es: "¿Qué harías primero?" },
          { type: "choice", options: [
            { en: "First, I would look for shade and water. What would you do?", good: true, note: "Idea clara + invita al otro." },
            { en: "I look for shade.", good: false, note: "Falta el condicional: 'I would look for shade'." },
            { en: "I walk fast.", good: false, note: "Mejor con condicional: 'I would stay still to save energy'." },
          ]},
        ],
      },
      {
        id: "foreign-city",
        label: "a city in a foreign country",
        emoji: "🏙️",
        steps: [
          { type: "teacher", en: "Why would you choose a city in a foreign country?", es: "¿Por qué elegirías una ciudad en un país extranjero?",
            alts: ["So, why a foreign city?", "Why talk about a foreign city?"] },
          { type: "choice", options: [
            { en: "I would choose it because the language and the streets would be new to me.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because is interesting.", good: false, note: "Incompleto: 'because it's interesting' + una razón." },
            { en: "A city.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "What would you do first?", es: "¿Qué harías primero?" },
          { type: "choice", options: [
            { en: "If I got lost, I would try to use Google Maps because it's quick and easy.", good: true, note: "Second conditional + razón." },
            { en: "I will use Google Maps.", good: false, note: "En el condicional va 'would', no 'will'." },
          ]},
          { type: "teacher", en: "What if your phone was dead?", es: "¿Y si tu teléfono no tuviera batería?" },
          { type: "choice", options: [
            { en: "If my phone was dead, I would find a public place and ask someone for help. And you?", good: true, note: "Desarrolla e invita al otro." },
            { en: "I ask someone.", good: false, note: "Falta el condicional: 'I would ask someone for help'." },
            { en: "I don't know.", good: false, note: "Cerrás la conversación; conviene desarrollar una idea." },
          ]},
        ],
      },
    ],
  },
  {
    id: "paper2",
    title: "Paper 2 — Feelings and situations",
    emoji: "💓",
    question: "How would you feel in these situations?",
    questionEs: "¿Cómo te sentirías en estas situaciones?",
    options: [
      {
        id: "new-home",
        label: "moving to a new home",
        emoji: "🏠",
        steps: [
          { type: "teacher", en: "Why would you choose moving to a new home?", es: "¿Por qué elegirías mudarte a una nueva casa?",
            alts: ["So, why moving to a new home?", "Why talk about moving house?"] },
          { type: "choice", options: [
            { en: "I would choose it because it's a big change and everything would be new.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "I choice moving.", good: false, note: "Es 'I would choose' (choose = verbo) y falta la razón." },
            { en: "Moving.", good: false, note: "Muy corto: falta opinión y razón." },
          ]},
          { type: "teacher", en: "How would you feel about it?", es: "¿Cómo te sentirías al respecto?" },
          { type: "choice", options: [
            { en: "I would feel excited but nervous because everything is new.", good: true, note: "'would feel ... because ...'. ¡Perfecto!" },
            { en: "I feel excited.", good: false, note: "Falta el condicional: 'I would feel excited'." },
          ]},
          { type: "teacher", en: "Would you feel a little sad too?", es: "¿Te sentirías un poco triste también?" },
          { type: "choice", options: [
            { en: "Yes, I would feel sad to leave my old house, but also happy. What about you?", good: true, note: "Desarrolla e invita al otro." },
            { en: "No.", good: false, note: "Cerrás la conversación; conviene desarrollar e interactuar." },
            { en: "I am sad.", good: false, note: "Es una situación imaginada: 'I would feel sad'." },
          ]},
        ],
      },
      {
        id: "financial-problems",
        label: "financial problems",
        emoji: "💸",
        steps: [
          { type: "teacher", en: "Why would you choose financial problems?", es: "¿Por qué elegirías los problemas económicos?",
            alts: ["So, why financial problems?", "Why talk about financial problems?"] },
          { type: "choice", options: [
            { en: "I would choose it because money is important and it affects everything.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because money.", good: false, note: "Incompleto: 'because money is important' + desarrollá." },
            { en: "Financial problems.", good: false, note: "Muy corto: falta opinión y razón." },
          ]},
          { type: "teacher", en: "How would you feel in that situation?", es: "¿Cómo te sentirías en esa situación?" },
          { type: "choice", options: [
            { en: "I would feel stressed and worried because money is important.", good: true, note: "'would feel ... because ...'. ¡Muy bien!" },
            { en: "I will feel stressed.", good: false, note: "En el condicional va 'would feel', no 'will feel'." },
          ]},
          { type: "teacher", en: "What would you do about it?", es: "¿Qué harías al respecto?" },
          { type: "choice", options: [
            { en: "I would try to save money and spend less. Do you agree?", good: true, note: "Desarrolla e invita al otro." },
            { en: "I spend less.", good: false, note: "Falta el condicional: 'I would spend less'." },
            { en: "Nothing.", good: false, note: "Cerrás la conversación; conviene desarrollar una idea." },
          ]},
        ],
      },
      {
        id: "first-date",
        label: "a first date",
        emoji: "💘",
        steps: [
          { type: "teacher", en: "Why would you choose a first date?", es: "¿Por qué elegirías una primera cita?",
            alts: ["So, why a first date?", "Why talk about a first date?"] },
          { type: "choice", options: [
            { en: "I would choose it because it's exciting but also a little scary.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because is nice.", good: false, note: "Incompleto: 'because it's nice' + una razón real." },
            { en: "First date.", good: false, note: "Muy corto: falta opinión y razón." },
          ]},
          { type: "teacher", en: "How would you feel before the date?", es: "¿Cómo te sentirías antes de la cita?" },
          { type: "choice", options: [
            { en: "I would feel nervous but excited because I wouldn't know the person well.", good: true, note: "'would feel ... because ...'. ¡Muy bien!" },
            { en: "I feel nervous.", good: false, note: "Falta el condicional: 'I would feel nervous'." },
          ]},
          { type: "teacher", en: "What would you talk about?", es: "¿De qué hablarías?" },
          { type: "choice", options: [
            { en: "I would ask about their hobbies and their favourite films. What about you?", good: true, note: "Desarrolla e invita al otro." },
            { en: "I talk about me.", good: false, note: "Mejor con condicional: 'I would ask about them too'." },
            { en: "Nothing special.", good: false, note: "Cerrás la conversación; conviene desarrollar." },
          ]},
        ],
      },
      {
        id: "new-job",
        label: "starting a new job",
        emoji: "💼",
        steps: [
          { type: "teacher", en: "Why would you choose starting a new job?", es: "¿Por qué elegirías empezar un trabajo nuevo?",
            alts: ["So, why starting a new job?", "Why talk about a new job?"] },
          { type: "choice", options: [
            { en: "I would choose starting a new job because it's something important in our lives.", good: true, note: "Opinión + razón. ¡Perfecto!" },
            { en: "I choice the new job.", good: false, note: "Es 'I would choose' (choose = verbo) y falta la razón." },
            { en: "A new job.", good: false, note: "Muy corto: falta opinión y razón." },
          ]},
          { type: "teacher", en: "How would you feel on your first day?", es: "¿Cómo te sentirías en tu primer día?" },
          { type: "choice", options: [
            { en: "I would feel excited but nervous because everything would be new.", good: true, note: "'would feel ... because ...'. ¡Muy bien!" },
            { en: "In my first day I feel nervous.", good: false, note: "Es 'On my first day' y 'I would feel'." },
          ]},
          { type: "teacher", en: "Would you ask your new colleagues for help?", es: "¿Les pedirías ayuda a tus nuevos compañeros?" },
          { type: "choice", options: [
            { en: "Yes, I'm a little shy, but I would ask them if I needed help. What about you?", good: true, note: "Respondés, desarrollás e invitás al otro. ¡Ideal!" },
            { en: "No.", good: false, note: "Cerrás la conversación; conviene desarrollar e interactuar." },
            { en: "I ask them.", good: false, note: "Falta el condicional: 'I would ask them'." },
          ]},
        ],
      },
      {
        id: "getting-married",
        label: "getting married",
        emoji: "💍",
        steps: [
          { type: "teacher", en: "Why would you choose getting married?", es: "¿Por qué elegirías casarte?",
            alts: ["So, why getting married?", "Why talk about getting married?"] },
          { type: "choice", options: [
            { en: "I would choose it because it's one of the biggest decisions in life.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because is important.", good: false, note: "Incompleto: 'because it's important' + desarrollá." },
            { en: "Getting married.", good: false, note: "Muy corto: falta opinión y razón." },
          ]},
          { type: "teacher", en: "How would you feel on your wedding day?", es: "¿Cómo te sentirías el día de tu boda?" },
          { type: "choice", options: [
            { en: "I would feel happy but a bit nervous because everyone would be watching.", good: true, note: "'would feel ... because ...'. ¡Muy bien!" },
            { en: "I will feel happy.", good: false, note: "En el condicional va 'would feel', no 'will feel'." },
          ]},
          { type: "teacher", en: "Would you prefer a big or a small wedding?", es: "¿Preferirías una boda grande o chica?" },
          { type: "choice", options: [
            { en: "I would prefer a small wedding with close friends and family. Do you agree?", good: true, note: "Desarrolla e invita al otro." },
            { en: "Big.", good: false, note: "Muy corto: desarrollá 'I would prefer a big wedding because...'." },
            { en: "I prefer small.", good: false, note: "Falta el condicional: 'I would prefer a small wedding'." },
          ]},
        ],
      },
    ],
  },
  {
    id: "paper3",
    title: "Paper 3 — Sleep problems",
    emoji: "😴",
    question: "How do these things prevent people from getting enough sleep?",
    questionEs: "¿Cómo impiden estas cosas que la gente duerma lo suficiente?",
    options: [
      {
        id: "caffeine",
        label: "consuming caffeine",
        emoji: "☕",
        steps: [
          { type: "teacher", en: "Why would you choose consuming caffeine?", es: "¿Por qué elegirías el consumo de cafeína?",
            alts: ["So, why consuming caffeine?", "Why talk about caffeine?"] },
          { type: "choice", options: [
            { en: "I would choose it because many people drink coffee every day.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because I like coffee.", good: false, note: "Mejor desarrollá: '...because many people drink it every day'." },
            { en: "Caffeine.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "How does caffeine prevent sleep?", es: "¿Cómo impide dormir la cafeína?" },
          { type: "choice", options: [
            { en: "Caffeine keeps you awake, so it's difficult to fall asleep.", good: true, note: "Causa clara en presente simple." },
            { en: "It's difficult to feel sleep.", good: false, note: "Es 'difficult to fall asleep', no 'feel sleep'." },
          ]},
          { type: "teacher", en: "Can you give me an example?", es: "¿Me das un ejemplo?" },
          { type: "choice", options: [
            { en: "For example, if I drink coffee late at night, I can't sleep well. Do you drink coffee at night?", good: true, note: "Ejemplo + invita al otro." },
            { en: "For example, coffee.", good: false, note: "Muy corto: dá un ejemplo completo." },
            { en: "No example.", good: false, note: "Cerrás la conversación; conviene dar un ejemplo." },
          ]},
        ],
      },
      {
        id: "smoking",
        label: "smoking",
        emoji: "🚬",
        steps: [
          { type: "teacher", en: "Why would you choose smoking?", es: "¿Por qué elegirías el tabaquismo?",
            alts: ["So, why smoking?", "Why talk about smoking?"] },
          { type: "choice", options: [
            { en: "I would choose it because many people don't know it affects their sleep.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because is bad.", good: false, note: "Incompleto: 'because it's bad' + desarrollá." },
            { en: "Smoking.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "How does smoking prevent sleep?", es: "¿Cómo impide dormir el tabaco?" },
          { type: "choice", options: [
            { en: "Smoking can affect your sleep because nicotine keeps you awake.", good: true, note: "Causa clara en presente simple." },
            { en: "Smoking keep you awake.", good: false, note: "Concordancia: 'smoking keeps you awake'." },
          ]},
          { type: "teacher", en: "Can you give me an example?", es: "¿Me das un ejemplo?" },
          { type: "choice", options: [
            { en: "For example, my heart beats faster and I can't relax. What do you think?", good: true, note: "Ejemplo + invita al otro." },
            { en: "That's good for your health.", good: false, note: "El sentido queda al revés: fumar no es bueno para la salud." },
            { en: "No.", good: false, note: "Cerrás la conversación; conviene dar un ejemplo." },
          ]},
        ],
      },
      {
        id: "jet-lag",
        label: "jet lag",
        emoji: "✈️",
        steps: [
          { type: "teacher", en: "Why would you choose jet lag?", es: "¿Por qué elegirías el jet lag?",
            alts: ["So, why jet lag?", "Why talk about jet lag?"] },
          { type: "choice", options: [
            { en: "I would choose it because it happens when you travel to a different time zone.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because travel.", good: false, note: "Incompleto: 'because it happens when you travel' + desarrollá." },
            { en: "Jet lag.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "How does jet lag prevent sleep?", es: "¿Cómo impide dormir el jet lag?" },
          { type: "choice", options: [
            { en: "Jet lag can make you feel tired during the day and awake at night.", good: true, note: "Causa clara en presente simple." },
            { en: "Jet lag make you tired.", good: false, note: "Concordancia: 'jet lag makes you tired'." },
          ]},
          { type: "teacher", en: "How do you deal with that?", es: "¿Cómo lo manejás?" },
          { type: "choice", options: [
            { en: "I try to sleep earlier and drink a lot of water. What about you?", good: true, note: "Ejemplo + invita al otro." },
            { en: "I don't deal.", good: false, note: "Mejor desarrollá una idea: 'I try to sleep earlier'." },
            { en: "Nothing.", good: false, note: "Cerrás la conversación; conviene desarrollar." },
          ]},
        ],
      },
      {
        id: "daytime-napping",
        label: "daytime napping",
        emoji: "🛋️",
        steps: [
          { type: "teacher", en: "Why would you choose daytime napping?", es: "¿Por qué elegirías las siestas de día?",
            alts: ["So, why daytime napping?", "Why talk about daytime naps?"] },
          { type: "choice", options: [
            { en: "I would choose it because a lot of people take naps after lunch.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because I sleep.", good: false, note: "Incompleto: 'because many people take naps' + desarrollá." },
            { en: "Napping.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "How do daytime naps prevent sleep?", es: "¿Cómo impiden dormir las siestas?" },
          { type: "choice", options: [
            { en: "Long naps can make it hard to sleep at night.", good: true, note: "Causa clara en presente simple." },
            { en: "Long naps makes hard sleep.", good: false, note: "Mejor: 'long naps make it hard to sleep at night'." },
          ]},
          { type: "teacher", en: "Are short naps a problem too?", es: "¿Las siestas cortas también son un problema?" },
          { type: "choice", options: [
            { en: "I think short naps can be good for you, but long naps affect your sleep. Do you agree?", good: true, note: "Matiza + invita al otro." },
            { en: "Yes.", good: false, note: "Cerrás la conversación; conviene desarrollar e interactuar." },
            { en: "Naps bad.", good: false, note: "Muy corto: armá una oración completa." },
          ]},
        ],
      },
      {
        id: "noisy-bedrooms",
        label: "noisy bedrooms",
        emoji: "🔊",
        steps: [
          { type: "teacher", en: "Why would you choose noisy bedrooms?", es: "¿Por qué elegirías los dormitorios ruidosos?",
            alts: ["So, why noisy bedrooms?", "Why talk about noisy bedrooms?"] },
          { type: "choice", options: [
            { en: "I would choose it because a quiet bedroom is very important for good sleep.", good: true, note: "Opinión + razón. ¡Bien!" },
            { en: "Because noise.", good: false, note: "Incompleto: 'because noise is a problem' + desarrollá." },
            { en: "Noisy rooms.", good: false, note: "Muy corto: falta justificar." },
          ]},
          { type: "teacher", en: "How do noisy bedrooms prevent sleep?", es: "¿Cómo impiden dormir los dormitorios ruidosos?" },
          { type: "choice", options: [
            { en: "Noise makes it difficult to fall asleep and stay asleep.", good: true, note: "Causa clara en presente simple." },
            { en: "Noise make difficult sleep.", good: false, note: "Mejor: 'noise makes it difficult to fall asleep'." },
          ]},
          { type: "teacher", en: "Can you give me an example?", es: "¿Me das un ejemplo?" },
          { type: "choice", options: [
            { en: "For example, if my neighbours make a lot of noise, I can't fall asleep. What about you?", good: true, note: "Ejemplo + invita al otro." },
            { en: "My neighbourhood is loud.", good: false, note: "'neighbourhood' es el barrio; acá van 'neighbours' (vecinos)." },
            { en: "No example.", good: false, note: "Cerrás la conversación; conviene dar un ejemplo." },
          ]},
        ],
      },
    ],
  },
];

// ---- Diálogos para ESCUCHAR (se reproducen solos, voces alternadas) ----
//  3 papers × 3 niveles (easy / medium / hard) = 9 diálogos.
window.LISTENINGS = [
  // ===== PAPER 1 — Getting lost (second conditional) =====
  {
    id: "listen-paper1-easy",
    paper: "paper1",
    level: "easy",
    title: "Lost in a foreign city",
    emoji: "🏙️",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "What would you do if you got lost in a foreign city?", es: "¿Qué harías si te perdieras en una ciudad extranjera?" },
      { sp: 1, en: "If I got lost, I would use Google Maps.", es: "Si me perdiera, usaría Google Maps." },
      { sp: 0, en: "Good idea. And if your phone was dead?", es: "Buena idea. ¿Y si tu teléfono no tuviera batería?" },
      { sp: 1, en: "I would ask someone for help. What about you?", es: "Le pediría ayuda a alguien. ¿Y vos?" },
      { sp: 0, en: "I would find a public place with lots of people.", es: "Yo buscaría un lugar público con mucha gente." },
      { sp: 1, en: "That's a good point. It's safer.", es: "Es un buen punto. Es más seguro." },
    ],
  },
  {
    id: "listen-paper1-medium",
    paper: "paper1",
    level: "medium",
    title: "Lost in the Atacama desert",
    emoji: "🏜️",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "What would you do if you got lost in the Atacama desert?", es: "¿Qué harías si te perdieras en el desierto de Atacama?" },
      { sp: 1, en: "First, I would feel thirsty and worried, because it's very hot and dry.", es: "Primero, me sentiría sediento y preocupado, porque es muy caluroso y seco." },
      { sp: 0, en: "That's true. So what would you do first?", es: "Es verdad. ¿Entonces qué harías primero?" },
      { sp: 1, en: "I would look for shade and try to save water. And you?", es: "Buscaría sombra y trataría de ahorrar agua. ¿Y vos?" },
      { sp: 0, en: "I would stay still during the day, because walking uses a lot of energy.", es: "Yo me quedaría quieto durante el día, porque caminar gasta mucha energía." },
      { sp: 1, en: "I see your point. Moving at night would be cooler.", es: "Entiendo tu punto. Moverse de noche sería más fresco." },
      { sp: 0, en: "Exactly. And I would try to find a road or people.", es: "Exacto. Y trataría de encontrar una ruta o gente." },
      { sp: 1, en: "Good plan. Staying calm is the most important thing.", es: "Buen plan. Mantener la calma es lo más importante." },
      { sp: 0, en: "I agree. Panic makes everything worse.", es: "Estoy de acuerdo. El pánico empeora todo." },
    ],
  },
  {
    id: "listen-paper1-hard",
    paper: "paper1",
    level: "hard",
    title: "Lost in the Amazon rainforest",
    emoji: "🌴",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "Ben, let me ask you something. What would you do if you got lost in the Amazon rainforest?", es: "Ben, dejame preguntarte algo. ¿Qué harías si te perdieras en la selva amazónica?" },
      { sp: 1, en: "Honestly, I think I would feel really scared at first. It's huge and full of dangerous animals.", es: "La verdad, creo que al principio me sentiría muy asustado. Es enorme y está llena de animales peligrosos." },
      { sp: 0, en: "That's true. So how would you calm down?", es: "Es verdad. ¿Entonces cómo te calmarías?" },
      { sp: 1, en: "Well, first I would try to stay calm, because panic makes things worse. Then I would stop and think.", es: "Bueno, primero trataría de mantener la calma, porque el pánico empeora las cosas. Después me detendría a pensar." },
      { sp: 0, en: "I see your point. And what about water and food?", es: "Entiendo tu punto. ¿Y el agua y la comida?" },
      { sp: 1, en: "I would look for a river, because you can follow it and find people. What about you?", es: "Buscaría un río, porque podés seguirlo y encontrar gente. ¿Y vos?" },
      { sp: 0, en: "Hmm, that's a good point, but rivers can be dangerous too. There are strong currents and animals.", es: "Mmm, es un buen punto, pero los ríos también pueden ser peligrosos. Hay corrientes fuertes y animales." },
      { sp: 1, en: "You're right, I didn't think about that. So what would you do instead?", es: "Tenés razón, no lo había pensado. ¿Entonces qué harías en su lugar?" },
      { sp: 0, en: "I would stay near a safe, open place and make a signal, like smoke, so a plane could see me.", es: "Me quedaría cerca de un lugar seguro y abierto, y haría una señal, como humo, para que un avión pudiera verme." },
      { sp: 1, en: "That's clever. And if your phone didn't work?", es: "Eso es ingenioso. ¿Y si tu teléfono no funcionara?" },
      { sp: 0, en: "If my phone didn't work, I would find a safe place to spend the night and wait for the morning.", es: "Si mi teléfono no funcionara, buscaría un lugar seguro para pasar la noche y esperaría a la mañana." },
      { sp: 1, en: "I agree. Moving at night would be too risky.", es: "Estoy de acuerdo. Moverse de noche sería demasiado arriesgado." },
      { sp: 0, en: "Exactly. And I would try to keep my mind busy, so I wouldn't lose hope.", es: "Exacto. Y trataría de mantener la mente ocupada, para no perder la esperanza." },
      { sp: 1, en: "That's a really good point. Staying positive would help a lot.", es: "Ese es un muy buen punto. Mantenerse positivo ayudaría mucho." },
      { sp: 0, en: "In the end, I think staying calm and thinking clearly would be the key.", es: "Al final, creo que mantener la calma y pensar con claridad sería la clave." },
      { sp: 1, en: "I couldn't agree more. Great chat, Ana!", es: "No podría estar más de acuerdo. ¡Buena charla, Ana!" },
    ],
  },

  // ===== PAPER 2 — Feelings (I would feel ... because ...) =====
  {
    id: "listen-paper2-easy",
    paper: "paper2",
    level: "easy",
    title: "Starting a new job",
    emoji: "💼",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "How would you feel on your first day at a new job?", es: "¿Cómo te sentirías en tu primer día en un trabajo nuevo?" },
      { sp: 1, en: "I would feel nervous, because everything would be new.", es: "Me sentiría nervioso, porque todo sería nuevo." },
      { sp: 0, en: "Me too. But I would also feel excited.", es: "Yo también. Pero también me sentiría emocionada." },
      { sp: 1, en: "That's true. Would you ask for help?", es: "Es verdad. ¿Pedirías ayuda?" },
      { sp: 0, en: "Yes, I would ask my new colleagues.", es: "Sí, les pediría ayuda a mis nuevos compañeros." },
      { sp: 1, en: "Good idea. That makes the first day easier.", es: "Buena idea. Eso hace el primer día más fácil." },
    ],
  },
  {
    id: "listen-paper2-medium",
    paper: "paper2",
    level: "medium",
    title: "Moving to a new home",
    emoji: "🏠",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "How would you feel about moving to a new home?", es: "¿Cómo te sentirías al mudarte a una nueva casa?" },
      { sp: 1, en: "I would feel excited but nervous, because everything would be new.", es: "Me sentiría emocionado pero nervioso, porque todo sería nuevo." },
      { sp: 0, en: "Would you feel a little sad too?", es: "¿Te sentirías un poco triste también?" },
      { sp: 1, en: "Yes, I would feel sad to leave my old house, but also happy. What about you?", es: "Sí, me sentiría triste de dejar mi vieja casa, pero también feliz. ¿Y vos?" },
      { sp: 0, en: "I would feel the same, because I would miss my neighbours.", es: "Me sentiría igual, porque extrañaría a mis vecinos." },
      { sp: 1, en: "That's true. On the other hand, you would meet new people.", es: "Es verdad. Por otro lado, conocerías gente nueva." },
      { sp: 0, en: "Good point. A new home is a big change, but a nice one.", es: "Buen punto. Una casa nueva es un cambio grande, pero lindo." },
      { sp: 1, en: "I agree. In the end, I think I would feel happy.", es: "Estoy de acuerdo. Al final, creo que me sentiría feliz." },
      { sp: 0, en: "Me too. It's exciting to start something new.", es: "Yo también. Es emocionante empezar algo nuevo." },
    ],
  },
  {
    id: "listen-paper2-hard",
    paper: "paper2",
    level: "hard",
    title: "A first date and getting married",
    emoji: "💘",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "Ben, how would you feel before a first date?", es: "Ben, ¿cómo te sentirías antes de una primera cita?" },
      { sp: 1, en: "Oh, I would feel really nervous, because I wouldn't know the person well. What about you?", es: "Uy, me sentiría muy nervioso, porque no conocería bien a la persona. ¿Y vos?" },
      { sp: 0, en: "The same, but also excited. I think it's exciting and a little scary at the same time.", es: "Lo mismo, pero también emocionada. Creo que es emocionante y un poco aterrador a la vez." },
      { sp: 1, en: "That's true. So what would you talk about to break the ice?", es: "Es verdad. ¿Y de qué hablarías para romper el hielo?" },
      { sp: 0, en: "I would ask about their hobbies and their favourite films. Easy topics, you know?", es: "Preguntaría por sus hobbies y sus películas favoritas. Temas fáciles, ¿viste?" },
      { sp: 1, en: "Good idea. I always get nervous and talk too much about myself.", es: "Buena idea. Yo siempre me pongo nervioso y hablo demasiado de mí mismo." },
      { sp: 0, en: "Ha! I see your point. Listening is important too.", es: "¡Ja! Entiendo tu punto. Escuchar también es importante." },
      { sp: 1, en: "Exactly. And changing the topic, how would you feel on your wedding day?", es: "Exacto. Y cambiando de tema, ¿cómo te sentirías el día de tu boda?" },
      { sp: 0, en: "Honestly, I would feel happy but a bit nervous, because everyone would be watching me.", es: "La verdad, me sentiría feliz pero un poco nerviosa, porque todos me estarían mirando." },
      { sp: 1, en: "I understand. Would you prefer a big wedding or a small one?", es: "Entiendo. ¿Preferirías una boda grande o una chica?" },
      { sp: 0, en: "I would prefer a small wedding, with close friends and family. Do you agree?", es: "Preferiría una boda chica, con amigos cercanos y familia. ¿Estás de acuerdo?" },
      { sp: 1, en: "I'm not sure. I think I would like a big party, because it only happens once.", es: "No estoy seguro. Creo que me gustaría una fiesta grande, porque pasa una sola vez." },
      { sp: 0, en: "That's a good point, but a big wedding would be more stressful.", es: "Es un buen punto, pero una boda grande sería más estresante." },
      { sp: 1, en: "True. Maybe something in the middle would be perfect.", es: "Cierto. Quizá algo en el medio sería perfecto." },
      { sp: 0, en: "I agree. In the end, the most important thing is the person next to you.", es: "Estoy de acuerdo. Al final, lo más importante es la persona que tenés al lado." },
      { sp: 1, en: "Well said, Ana. That's the key.", es: "Bien dicho, Ana. Esa es la clave." },
    ],
  },

  // ===== PAPER 3 — Sleep (present-simple causes + examples) =====
  {
    id: "listen-paper3-easy",
    paper: "paper3",
    level: "easy",
    title: "Caffeine and sleep",
    emoji: "☕",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "How does caffeine prevent sleep?", es: "¿Cómo impide dormir la cafeína?" },
      { sp: 1, en: "Caffeine keeps you awake, so it's hard to fall asleep.", es: "La cafeína te mantiene despierto, así que es difícil quedarse dormido." },
      { sp: 0, en: "That's true. Do you drink coffee at night?", es: "Es verdad. ¿Tomás café de noche?" },
      { sp: 1, en: "No. If I drink coffee late, I can't sleep well.", es: "No. Si tomo café tarde, no puedo dormir bien." },
      { sp: 0, en: "Me neither. I only drink it in the morning.", es: "Yo tampoco. Solo lo tomo a la mañana." },
      { sp: 1, en: "Good idea. That's much better.", es: "Buena idea. Eso es mucho mejor." },
    ],
  },
  {
    id: "listen-paper3-medium",
    paper: "paper3",
    level: "medium",
    title: "Jet lag and naps",
    emoji: "✈️",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "How does jet lag prevent people from sleeping?", es: "¿Cómo impide dormir el jet lag a la gente?" },
      { sp: 1, en: "Jet lag makes you feel tired during the day and awake at night.", es: "El jet lag te hace sentir cansado de día y despierto de noche." },
      { sp: 0, en: "That's true. For example, I wake up at 3 a.m. after a long flight.", es: "Es verdad. Por ejemplo, me despierto a las 3 de la mañana después de un vuelo largo." },
      { sp: 1, en: "How do you deal with that?", es: "¿Cómo lo manejás?" },
      { sp: 0, en: "I try to sleep earlier and drink a lot of water. What about you?", es: "Trato de dormir más temprano y tomo mucha agua. ¿Y vos?" },
      { sp: 1, en: "The same. But I also avoid long naps during the day.", es: "Lo mismo. Pero también evito las siestas largas durante el día." },
      { sp: 0, en: "Good point. Long naps make it hard to sleep at night.", es: "Buen punto. Las siestas largas hacen difícil dormir de noche." },
      { sp: 1, en: "Exactly. On the other hand, short naps can be good for you.", es: "Exacto. Por otro lado, las siestas cortas pueden ser buenas." },
      { sp: 0, en: "I agree. Twenty minutes is enough for me.", es: "Estoy de acuerdo. Veinte minutos me alcanzan." },
    ],
  },
  {
    id: "listen-paper3-hard",
    paper: "paper3",
    level: "hard",
    title: "Why we can't sleep",
    emoji: "😴",
    speakers: ["Ana", "Ben"],
    lines: [
      { sp: 0, en: "Ben, which sleep problem do you think is the worst?", es: "Ben, ¿cuál problema de sueño pensás que es el peor?" },
      { sp: 1, en: "Let me think for a second. I'd say caffeine, because so many people drink coffee every day.", es: "Dejame pensar un segundo. Diría la cafeína, porque muchísima gente toma café todos los días." },
      { sp: 0, en: "That's a good point. Why exactly does it keep you awake?", es: "Es un buen punto. ¿Por qué exactamente te mantiene despierto?" },
      { sp: 1, en: "Because caffeine stays in your body for hours. For example, if I drink coffee at night, I can't sleep.", es: "Porque la cafeína se queda en el cuerpo por horas. Por ejemplo, si tomo café de noche, no puedo dormir." },
      { sp: 0, en: "I see. On the other hand, some people drink coffee and sleep fine.", es: "Ya veo. Por otro lado, algunas personas toman café y duermen bien." },
      { sp: 1, en: "That's true, I think it depends on the person. What about smoking?", es: "Es verdad, creo que depende de la persona. ¿Y fumar?" },
      { sp: 0, en: "Smoking is similar, because nicotine keeps you awake too. My uncle smokes and he says his heart beats faster at night.", es: "Fumar es parecido, porque la nicotina también te mantiene despierto. Mi tío fuma y dice que de noche el corazón le late más rápido." },
      { sp: 1, en: "Wow, I didn't know that. So he can't relax before bed.", es: "Guau, no sabía eso. Así que no puede relajarse antes de dormir." },
      { sp: 0, en: "Exactly. And what about noisy bedrooms? Do they bother you?", es: "Exacto. ¿Y los dormitorios ruidosos? ¿Te molestan?" },
      { sp: 1, en: "A lot. If my neighbours make a lot of noise, I find it difficult to fall asleep.", es: "Mucho. Si mis vecinos hacen mucho ruido, me resulta difícil quedarme dormido." },
      { sp: 0, en: "I agree. A quiet bedroom is really important for good sleep.", es: "Estoy de acuerdo. Un dormitorio silencioso es muy importante para dormir bien." },
      { sp: 1, en: "Definitely. I even use earplugs sometimes. Do you?", es: "Totalmente. A veces hasta uso tapones. ¿Vos?" },
      { sp: 0, en: "No, but that's a good idea. I usually just close the window.", es: "No, pero es buena idea. Yo normalmente solo cierro la ventana." },
      { sp: 1, en: "Ha, simple but it works! And one more thing, do daytime naps affect you?", es: "¡Ja, simple pero funciona! Y una cosa más, ¿te afectan las siestas de día?" },
      { sp: 0, en: "Short naps are fine, but long naps make it hard to sleep at night.", es: "Las siestas cortas están bien, pero las largas hacen difícil dormir de noche." },
      { sp: 1, en: "I totally agree. Well, that was a great chat about sleep!", es: "Estoy totalmente de acuerdo. ¡Bueno, qué buena charla sobre el sueño!" },
    ],
  },
];
