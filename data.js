const THEORY = {
  en: {
    present_simple: {
      topic: "Present Simple",
      text: "Si usa per abitudini, fatti generali e azioni ripetute. Struttura base: soggetto + verbo base. Con he/she/it il verbo spesso prende -s. Esempio: He lives in London."
    },
    present_continuous: {
      topic: "Present Continuous",
      text: "Si usa per azioni in corso nel momento in cui si parla. Struttura: soggetto + am/is/are + verbo in -ing. Esempio: I am eating."
    },
    conditional_perfect: {
      topic: "Conditional Perfect",
      text: "Si usa per parlare di qualcosa che sarebbe accaduto in certe condizioni. Struttura: would have + participio passato. Esempio: I would have come."
    },
    third_conditional: {
      topic: "Third Conditional",
      text: "Si usa per situazioni ipotetiche nel passato che non sono realmente accadute. Struttura: If + past perfect, would have + participio passato. Esempio: If I had known, I would have come."
    },
    modal_perfect: {
      topic: "Modal Perfect",
      text: "Si usa con should have, could have, might have per parlare di possibilità, rimpianti o doveri nel passato. Esempio: You should have listened."
    }
  },
  "fr-FR": {
    present: {
      topic: "Présent",
      text: "Si usa per azioni abituali, fatti generali e anche azioni attuali. Esempio: Je mange."
    },
    conditionnel_present: {
      topic: "Conditionnel présent",
      text: "Si usa per esprimere desideri, ipotesi o cortesia. Esempio: Je voudrais parler."
    },
    si_clause: {
      topic: "Proposizione con si",
      text: "Con si si costruiscono frasi ipotetiche. Per esempio: Si j'avais le temps, je viendrais."
    }
  },
  "es-ES": {
    presente: {
      topic: "Presente",
      text: "Si usa per azioni abituali, verità generali e situazioni attuali. Esempio: Vivo en Madrid."
    },
    presente_progresivo: {
      topic: "Presente progresivo",
      text: "Si usa per azioni in corso. Struttura: estar + gerundio. Esempio: Estoy estudiando."
    },
    condicional: {
      topic: "Condicional",
      text: "Si usa per desideri, ipotesi o situazioni non reali. Esempio: Me gustaría visitar Madrid."
    },
    subjuntivo_hipotesis: {
      topic: "Hipótesis y subjuntivo",
      text: "Nelle frasi ipotetiche complesse spesso compare il congiuntivo, come in: Si hubiera sabido, habría respondido."
    }
  }
};

function buildEntries(rows, level) {
  return rows.map(r => {
    const enGB = Array.isArray(r[1]) ? r[1] : [r[1]];
    const enUS = Array.isArray(r[2]) ? r[2] : [r[2]];
    const frFR = Array.isArray(r[3]) ? r[3] : [r[3]];
    const esES = Array.isArray(r[4]) ? r[4] : [r[4]];

    return {
      prompt: r[0],
      level,
      translations: {
        "en-GB": enGB,
        "en-US": enUS,
        "fr-FR": frFR,
        "es-ES": esES
      },
      pronunciations: {
        "en-GB": r[5],
        "en-US": r[6],
        "fr-FR": r[7],
        "es-ES": r[8]
      },
      theory: {
        en: r[9] || null,
        "fr-FR": r[10] || null,
        "es-ES": r[11] || null
      }
    };
  });
}

const COMMON_L1 = [
  ["cane","dog","dog","chien","perro","dog","dog","shièn","perro"],
  ["gatto","cat","cat","chat","gato","cat","cat","sha","gato"],
  ["casa","house","house","maison","casa","haus","haus","mezon","casa"],
  ["pane","bread","bread","pain","pan","bred","bred","pen","pan"],
  ["acqua","water","water","eau","agua","uo-ta","uoder","o","agua"],
  ["sole","sun","sun","soleil","sol","san","san","solei","sol"],
  ["luna","moon","moon","lune","luna","muun","muun","lun","luna"],
  ["libro","book","book","livre","libro","buk","buk","livr","libro"],
  ["sedia","chair","chair","chaise","silla","chea","cher","shez","siya"],
  ["tavolo","table","table","table","mesa","tei-bl","tei-bl","tabl","mesa"],
  ["porta","door","door","porte","puerta","dor","dor","port","puerta"],
  ["finestra","window","window","fenêtre","ventana","uin-dou","uin-dou","fenetr","bentana"],
  ["madre","mother","mother","mère","madre","ma-dha","ma-dher","mer","madre"],
  ["padre","father","father","père","padre","fa-dha","fa-dher","per","padre"],
  ["fratello","brother","brother","frère","hermano","bra-dha","bra-dher","frer","ermano"],
  ["sorella","sister","sister","soeur","hermana","si-sta","si-ster","ser","ermana"],
  ["via cittadina","street","street","rue","calle","stri:t","striit","rü","caie"],
  ["carreggiata / strada percorribile","road","road","route","carretera","roud","roud","rut","carretera"],
  ["scuola","school","school","école","escuela","skuul","skuul","ekol","escuela"],
  ["penna","pen","pen","stylo","bolígrafo","pen","pen","stilò","boligrafo"]
];

const COMMON_L2 = [
  ["Sto mangiando",["i am eating","i'm eating"],["i am eating","i'm eating"],"je mange","estoy comiendo","ai am ii-ting","ai am ii-ting","ge manj","estoi comiendo","present_continuous","present","presente_progresivo"],
  ["Sto andando a casa",["i am going home","i'm going home"],["i am going home","i'm going home"],"je rentre à la maison","estoy yendo a casa","ai am gouing houm","ai am gouing houm","ge rantr a la mezon","estoi iendo a casa","present_continuous","present","presente_progresivo"],
  ["Io bevo acqua ogni mattina","i drink water every morning","i drink water every morning","je bois de l'eau chaque matin","bebo agua cada mañana","ai drink uo-ta evri mo-ning","ai drink uoder evri morning","ge bua de lo shak matan","bebo agua cada maniana","present_simple","present","presente"],
  ["Lui vive a Londra","he lives in london","he lives in london","il vit à londres","él vive en londres","hi livz in london","hii livz in landon","il vi a londr","el bibe en londres","present_simple","present","presente"],
  ["Io studio inglese","i study english","i study english","j'étudie l'anglais","estudio inglés","ai stadi ingglish","ai stadi inglish","getudi langlè","estudio ingles","present_simple","present","presente"],
  ["Lei lavora in città","she works in the city","she works in the city","elle travaille en ville","ella trabaja en la ciudad","scii uorks in dha siti","shii werks in the cidi","el travai an vil","eia trabaja en la ziudad","present_simple","present","presente"]
];

const COMMON_L3 = [
  ["Avrei potuto aiutarti",["i could have helped you","i could've helped you"],["i could have helped you","i could've helped you"],"j'aurais pu t'aider","podría haberte ayudado","ai cud av helpt iu","ai cud av helpt iu","giorè pü tèdè","podria aberte aiutado","modal_perfect","conditionnel_present","condicional"],
  ["Se lo avessi saputo, sarei venuto",["if i had known, i would have come","if i'd known, i would've come"],["if i had known, i would have come","if i'd known, i would've come"],"si je l'avais su, je serais venu","si lo hubiera sabido, habría venido","if ai ad noun, ai wud av cam","if ai ad noun, ai wud av cam","si ge lavè sü, ge serè venü","si lo ubiera sabido, avria benido","third_conditional","si_clause","subjuntivo_hipotesis"],
  ["Non sarei uscito con questa pioggia",["i would not have gone out in this rain","i wouldn't have gone out in this rain"],["i would not have gone out in this rain","i wouldn't have gone out in this rain"],"je ne serais pas sorti avec cette pluie","no habría salido con esta lluvia","ai wud not av gon aut in dhis rein","ai wud not av gon aut in dhis rein","ge ne serè pa sorti avè set plüi","no avria salido con esta yubia","conditional_perfect","conditionnel_present","condicional"],
  ["Avresti dovuto ascoltarmi",["you should have listened to me","you should've listened to me"],["you should have listened to me","you should've listened to me"],"tu aurais dû m'écouter","deberías haberme escuchado","iu sciud av lisnd tu mi","iu sciud av lisnd tu mi","tu orè dü mekuté","deberias aberme escuchado","modal_perfect","conditionnel_present","condicional"]
];

const HISTORY_L1 = [
  ["re","king","king","roi","rey","king","king","rua","rei"],
  ["regina","queen","queen","reine","reina","kwiin","kwiin","ren","reina"],
  ["guerra","war","war","guerre","guerra","uo","uor","gher","guerra"],
  ["pace","peace","peace","paix","paz","piis","piis","pè","paz"]
];

const HISTORY_L2 = [
  ["antichità","antiquity","antiquity","antiquité","antigüedad","an-ti-kwi-ti","an-ti-kwi-di","antikité","antiguedad"],
  ["medioevo","middle ages","middle ages","moyen âge","edad media","midl eidgis","midl eidgis","moièn ag","edad media"],
  ["rivoluzione","revolution","revolution","révolution","revolución","rev-o-lu-scion","rev-o-lu-shen","revolusion","rebolucion"]
];

const HISTORY_L3 = [
  ["monarchia assoluta","absolute monarchy","absolute monarchy","monarchie absolue","monarquía absoluta","absolut mon-aki","absolut monarki","monarscì absolü","monarkia absoluta"],
  ["rivoluzione industriale","industrial revolution","industrial revolution","révolution industrielle","revolución industrial","indastrial revolu-scion","indastrial revolu-shen","revolusion andüstrièl","rebolucion industrial"]
];

const GEOGRAPHY_L1 = [
  ["montagna","mountain","mountain","montagne","montaña","maun-tin","maun-tin","montagn","montania"],
  ["fiume","river","river","rivière","río","ri-va","ri-ver","rivièr","rio"],
  ["mare","sea","sea","mer","mar","sii","sii","mer","mar"],
  ["isola","island","island","île","isla","ai-land","ai-land","il","isla"]
];

const GEOGRAPHY_L2 = [
  ["stato","state","state","état","estado","steit","steit","eta","estado"],
  ["confine","border","border","frontière","frontera","bo-da","bor-der","frontièr","frontera"],
  ["emisfero","hemisphere","hemisphere","hémisphère","hemisferio","hemi-sfia","hemi-sfir","emisfèr","emisferio"]
];

const GEOGRAPHY_L3 = [
  ["Londra è la capitale del Regno Unito","london is the capital of the united kingdom","london is the capital of the united kingdom","londres est la capitale du royaume-uni","londres es la capital del reino unido","london iz dha capital ov dha united kingdom","landon iz the capidal ov the iunaited kingdom","londr e la kapital dü roiaum üni","londres es la capital del reino unido"],
  ["Parigi è la capitale della Francia","paris is the capital of france","paris is the capital of france","paris est la capitale de la france","parís es la capital de francia","paris iz dha capital ov frans","peris iz the capidal ov frans","pari e la kapital de la frans","paris es la capital de francia"]
];

const ART_L1 = [
  ["quadro","painting","painting","tableau","cuadro","pein-ting","pein-ting","tablò","cuadro"],
  ["colore","colour","color","couleur","color","ca-la","ca-ler","culör","color"],
  ["disegno","drawing","drawing","dessin","dibujo","dro-ing","dra-ing","desen","dibujo"]
];

const ART_L2 = [
  ["artista","artist","artist","artiste","artista","aa-tist","ar-tist","artist","artista"],
  ["ritratto","portrait","portrait","portrait","retrato","por-trit","por-trit","portrè","retrato"]
];

const ART_L3 = [
  ["Leonardo da Vinci era un pittore e inventore","leonardo da vinci was a painter and inventor","leonardo da vinci was a painter and inventor","léonard de vinci était un peintre et inventeur","leonardo da vinci era un pintor e inventor","lionardo da vinci uoz a peinta and inventor","lionardo da vinci waz a peinter and inventor","leonar de vinci etè an pentr e inventör","leonardo da vinci era un pintor e inventor"]
];

const SCIENCE_L1 = [
  ["pianta","plant","plant","plante","planta","plaant","plant","plant","planta"],
  ["animale","animal","animal","animal","animal","ani-mal","ani-mal","animal","animal"],
  ["foglia","leaf","leaf","feuille","hoja","liif","liif","föi","hoja"]
];

const SCIENCE_L2 = [
  ["cellula","cell","cell","cellule","célula","sel","sel","selül","celula"],
  ["scheletro","skeleton","skeleton","squelette","esqueleto","skeliton","skeliton","squelet","esqueleto"]
];

const SCIENCE_L3 = [
  ["La cellula è l'unità fondamentale della vita","the cell is the basic unit of life","the cell is the basic unit of life","la cellule est l'unité fondamentale de la vie","la célula es la unidad fundamental de la vida","dha sel iz dha beisik iunit ov laif","the sel iz the beisik iunit ov laif","la selül e lunité fondamantal de la vi","la celula es la unidad fundamental de la vida"]
];

const PHYSICS_L1 = [
  ["forza","force","force","force","fuerza","fo:s","fors","fors","fuerza"],
  ["energia","energy","energy","énergie","energía","enedgi","enerdgi","energi","energia"],
  ["luce","light","light","lumière","luz","lait","lait","lumier","luz"]
];

const PHYSICS_L2 = [
  ["velocità","speed","speed","vitesse","velocidad","spiid","spiid","vitess","velocidad"],
  ["gravità","gravity","gravity","gravité","gravedad","gravi-ti","gravi-di","gravité","gravedad"]
];

const PHYSICS_L3 = [
  ["La gravità attira i corpi verso la Terra","gravity pulls bodies toward the earth","gravity pulls bodies toward the earth","la gravité attire les corps vers la terre","la gravedad atrae los cuerpos hacia la tierra","gravity pulz bodis touod dha erth","gravi-di pulz badis tor-dh the erth","la gravité atir le cor ver la ter","la gravedad atrae los cuerpos hacia la tierra"]
];

const GEN_COMMON_L2 = {
  soggetti: [
    { it: "io", en: "I", fr: "je", es: "yo" },
    { it: "tu", en: "you", fr: "tu", es: "tú" },
    { it: "lui", en: "he", fr: "il", es: "él" },
    { it: "lei", en: "she", fr: "elle", es: "ella" }
  ],

  verbi: [
    {
      it: "mangiare",
      en: "eat",
      fr: "manger",
      es: "comer",
      type: "present_continuous"
    },
    {
      it: "bere",
      en: "drink",
      fr: "boire",
      es: "beber",
      type: "present_simple"
    },
    {
      it: "studiare",
      en: "study",
      fr: "étudier",
      es: "estudiar",
      type: "present_simple"
    }
  ],

  oggetti: [
    { it: "una mela", en: "an apple", fr: "une pomme", es: "una manzana" },
    { it: "acqua", en: "water", fr: "de l'eau", es: "agua" },
    { it: "inglese", en: "english", fr: "l'anglais", es: "inglés" }
  ]
};
function generaFrasiCommonL2() {
  const results = [];

  GEN_COMMON_L2.soggetti.forEach(soggetto => {
    GEN_COMMON_L2.verbi.forEach(verbo => {
      GEN_COMMON_L2.oggetti.forEach(oggetto => {

        // ITALIANO (prompt)
        const fraseIT = `${soggetto.it} ${verbo.it} ${oggetto.it}`;

        // INGLESE
        let en = "";
        if (verbo.type === "present_continuous") {
          const aux = soggetto.en === "I" ? "am" :
                      soggetto.en === "he" || soggetto.en === "she" ? "is" : "are";
          en = `${soggetto.en} ${aux} ${verbo.en}ing ${oggetto.en}`;
        } else {
          const v = (soggetto.en === "he" || soggetto.en === "she")
            ? verbo.en + "s"
            : verbo.en;
          en = `${soggetto.en} ${v} ${oggetto.en}`;
        }

        // FRANCESE (semplificato)
        const fr = `${soggetto.fr} ${verbo.fr} ${oggetto.fr}`;

        // SPAGNOLO
        const es = `${soggetto.es} ${verbo.es} ${oggetto.es}`;

        results.push([
          fraseIT,
          en,
          en,
          fr,
          es,
          en,
          en,
          fr,
          es,
          verbo.type,
          "present",
          "presente"
        ]);

      });
    });
  });

  return buildEntries(results, 2);
}
const RAW_DATABASE = {
  "uso-comune": {
    1: buildEntries(COMMON_L1, 1),
    2: [
    ...buildEntries(COMMON_L2, 2),
    ...generaFrasiCommonL2()
  ],
    3: buildEntries(COMMON_L3, 3)
  },
  "storia": {
    1: buildEntries(HISTORY_L1, 1),
    2: buildEntries(HISTORY_L2, 2),
    3: buildEntries(HISTORY_L3, 3)
  },
  "geografia": {
    1: buildEntries(GEOGRAPHY_L1, 1),
    2: buildEntries(GEOGRAPHY_L2, 2),
    3: buildEntries(GEOGRAPHY_L3, 3)
  },
  "arte": {
    1: buildEntries(ART_L1, 1),
    2: buildEntries(ART_L2, 2),
    3: buildEntries(ART_L3, 3)
  },
  "scienze": {
    1: buildEntries(SCIENCE_L1, 1),
    2: buildEntries(SCIENCE_L2, 2),
    3: buildEntries(SCIENCE_L3, 3)
  },
  "fisica": {
    1: buildEntries(PHYSICS_L1, 1),
    2: buildEntries(PHYSICS_L2, 2),
    3: buildEntries(PHYSICS_L3, 3)
  }
};