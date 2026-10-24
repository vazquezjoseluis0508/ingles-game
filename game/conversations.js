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
