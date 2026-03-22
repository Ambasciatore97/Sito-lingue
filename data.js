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
    past_simple: {
      topic: "Past Simple",
      text: "Si usa per azioni concluse nel passato. Con i verbi regolari spesso si aggiunge -ed. Esempio: They visited Rome."
    },
    future_will: {
      topic: "Future con will",
      text: "Si usa per decisioni immediate, previsioni o promesse. Struttura: soggetto + will + verbo base. Esempio: I will help you."
    },
    future_going_to: {
      topic: "Future con going to",
      text: "Si usa per intenzioni già decise o eventi molto probabili. Struttura: soggetto + am/is/are going to + verbo base. Esempio: We are going to travel."
    },
    present_perfect: {
      topic: "Present Perfect",
      text: "Si usa quando un'azione passata ha un legame con il presente. Struttura: soggetto + have/has + participio passato. Esempio: I have finished."
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
      text: "Si usa per azioni abituali, fatti generali e anche azioni attuali. La coniugazione cambia in base al soggetto. Esempio: Je mange."
    },
    passe_compose: {
      topic: "Passé composé",
      text: "Si usa per azioni concluse nel passato. Struttura tipica: avoir o être + participio passato. Esempio: J'ai parlé."
    },
    futur_simple: {
      topic: "Futur simple",
      text: "Si usa per azioni future. Si forma aggiungendo le desinenze future all'infinito o a una base specifica. Esempio: Je viendrai."
    },
    conditionnel_present: {
      topic: "Conditionnel présent",
      text: "Si usa per esprimere desideri, ipotesi o cortesia. Esempio: Je voudrais parler."
    },
    si_clause: {
      topic: "Proposizione con si",
      text: "Con si si costruiscono frasi ipotetiche. Per esempio: Si j'avais le temps, je viendrais. La scelta del tempo verbale è fondamentale."
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
    preterito_perfecto: {
      topic: "Pretérito perfecto",
      text: "Si usa per azioni passate collegate al presente. Struttura: haber + participio. Esempio: He terminado."
    },
    futuro_simple: {
      topic: "Futuro simple",
      text: "Si usa per azioni future, previsioni o supposizioni. Esempio: Viajaré mañana."
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
  ["penna","pen","pen","stylo","bolígrafo","pen","pen","stilò","boligrafo"],
  ["matita","pencil","pencil","crayon","lápiz","pen-sil","pen-sil","crèion","lapiz"],
  ["quaderno","notebook","notebook","cahier","cuaderno","nout-buk","nout-buk","caie","cuaderno"],
  ["zaino","backpack","backpack","sac à dos","mochila","bak-pak","bak-pak","sak a dò","mochila"],
  ["giardino","garden","garden","jardin","jardín","gaa-dn","gar-dn","giardèn","jardin"],
  ["albero","tree","tree","arbre","árbol","trii","trii","arbr","arbol"],
  ["fiore","flower","flower","fleur","flor","flaua","flauer","flör","flor"],
  ["strada","street","street","rue","calle","stri:t","striit","rü","caie"],
  ["amico","friend","friend","ami","amigo","frend","frend","ami","amigo"],
  ["amica","friend","friend","amie","amiga","frend","frend","ami","amiga"],
  ["latte","milk","milk","lait","leche","milk","milk","lè","leche"],
  ["mela","apple","apple","pomme","manzana","apol","apol","pom","manzana"],
  ["banana","banana","banana","banane","banana","banana","banana","banan","banana"],
  ["scarpa","shoe","shoe","chaussure","zapato","sciu","shuu","sossür","sapato"],
  ["camicia","shirt","shirt","chemise","camisa","sci:t","shert","shemiz","camisa"],
  ["pantaloni","trousers","pants","pantalon","pantalones","trau-zaz","pants","pantalon","pantalones"],
  ["letto","bed","bed","lit","cama","bed","bed","li","cama"],
  ["cuscino","pillow","pillow","oreiller","almohada","pilou","pilou","oreié","almohada"],
  ["orologio","clock","clock","horloge","reloj","klok","klak","orlog","reloj"],
  ["giorno","day","day","jour","día","dei","dei","giur","dia"],
  ["notte","night","night","nuit","noche","nait","nait","nüi","noche"],
  ["estate","summer","summer","été","verano","sama","samer","eté","berano"],
  ["inverno","winter","winter","hiver","invierno","uin-ta","win-ter","iver","inbierno"]
];

const COMMON_L2 = [
  ["Sto mangiando",["i am eating","i'm eating"],["i am eating","i'm eating"],"je mange","estoy comiendo","ai am ii-ting","ai am ii-ting","ge manj","estoi comiendo","present_continuous","present","presente_progresivo"],
  ["Sto andando a casa",["i am going home","i'm going home"],["i am going home","i'm going home"],"je rentre à la maison","estoy yendo a casa","ai am gouing houm","ai am gouing houm","ge rantr a la mezon","estoi iendo a casa","present_continuous","present","presente_progresivo"],
  ["Noi stiamo aspettando",["we are waiting","we're waiting"],["we are waiting","we're waiting"],"nous attendons","estamos esperando","ui a ueiting","ui ar ueiting","nu zatandon","estamos esperando","present_continuous","present","presente_progresivo"],
  ["Lei sta leggendo un libro",["she is reading a book","she's reading a book"],["she is reading a book","she's reading a book"],"elle lit un livre","ella está leyendo un libro","scii iz rii-ding a buk","shii iz rii-ding a buk","el li an livr","eia esta leyendo un libro","present_continuous","present","presente_progresivo"],
  ["Io bevo acqua ogni mattina","i drink water every morning","i drink water every morning","je bois de l'eau chaque matin","bebo agua cada mañana","ai drink uo-ta evri mo-ning","ai drink uoder evri morning","ge bua de lo shak matan","bebo agua cada maniana","present_simple","present","presente"],
  ["Loro stanno parlando",["they are talking","they're talking"],["they are talking","they're talking"],"ils parlent","ellos están hablando","dhei a to-king","dheir tal-king","il parl","eios estan hablando","present_continuous","present","presente_progresivo"],
  ["Lui vive a Londra","he lives in london","he lives in london","il vit à londres","él vive en londres","hi livz in london","hii livz in landon","il vi a londr","el bibe en londres","present_simple","present","presente"],
  ["Io studio inglese","i study english","i study english","j'étudie l'anglais","estudio inglés","ai stadi ingglish","ai stadi inglish","getudi langlè","estudio ingles","present_simple","present","presente"],
  ["Noi mangiamo insieme","we eat together","we eat together","nous mangeons ensemble","comemos juntos","ui iit tugheda","ui iit tugheder","nu mangeon ensemble","comemos juntos","present_simple","present","presente"],
  ["Lei lavora in città","she works in the city","she works in the city","elle travaille en ville","ella trabaja en la ciudad","scii uorks in dha siti","shii werks in the cidi","el travai an vil","eia trabaja en la ziudad","present_simple","present","presente"],
  ["Io apro la finestra","i open the window","i open the window","j'ouvre la fenêtre","abro la ventana","ai oupn dha uindou","ai oupen the window","giuvr la fenetr","abro la bentana","present_simple","present","presente"],
  ["Lui chiude la porta","he closes the door","he closes the door","il ferme la porte","él cierra la puerta","hi clou-ziz dha dor","hii clouzez the dor","il ferm la port","el zierra la puerta","present_simple","present","presente"]
];

const COMMON_L3 = [
  ["Avrei potuto aiutarti",["i could have helped you","i could've helped you"],["i could have helped you","i could've helped you"],"j'aurais pu t'aider","podría haberte ayudado","ai cud av helpt iu","ai cud av helpt iu","giorè pü tèdè","podria aberte aiutado","modal_perfect","conditionnel_present","condicional"],
  ["Se lo avessi saputo, sarei venuto",["if i had known, i would have come","if i'd known, i would've come"],["if i had known, i would have come","if i'd known, i would've come"],"si je l'avais su, je serais venu","si lo hubiera sabido, habría venido","if ai ad noun, ai wud av cam","if ai ad noun, ai wud av cam","si ge lavè sü","si lo ubiera sabido, avria benido","third_conditional","si_clause","subjuntivo_hipotesis"],
  ["Non sarei uscito con questa pioggia",["i would not have gone out in this rain","i wouldn't have gone out in this rain"],["i would not have gone out in this rain","i wouldn't have gone out in this rain"],"je ne serais pas sorti avec cette pluie","no habría salido con esta lluvia","ai wud not av gon aut in dhis rein","ai wud not av gon aut in dhis rein","ge ne serè pa sorti avè set plüi","no avria salido con esta yubia","conditional_perfect","conditionnel_present","condicional"],
  ["Avrebbero dovuto aspettare di più",["they should have waited longer","they should've waited longer"],["they should have waited longer","they should've waited longer"],"ils auraient dû attendre plus longtemps","deberían haber esperado más","dhei sciud av ueited long-ga","dhei sciud av ueited longer","il zorè dü atandr plü longtan","deberian aber esperado mas","modal_perfect","conditionnel_present","condicional"],
  ["Se avessimo avuto tempo, avremmo viaggiato",["if we had had time, we would have travelled","if we'd had time, we'd have travelled"],["if we had had time, we would have traveled","if we'd had time, we'd have traveled"],"si nous avions eu le temps, nous aurions voyagé","si hubiéramos tenido tiempo, habríamos viajado","if ui ad ad taim, ui wud av tra-vld","if ui ad ad taim, ui wud av traveld","si nu zavion ü le tan, nu zorion voiajé","si ubieramos tenido tiempo, abriamos biayado","third_conditional","si_clause","subjuntivo_hipotesis"],
  ["Avresti dovuto ascoltarmi",["you should have listened to me","you should've listened to me"],["you should have listened to me","you should've listened to me"],"tu aurais dû m'écouter","deberías haberme escuchado","iu sciud av lisnd tu mi","iu sciud av lisnd tu mi","tu orè dü mekuté","deberias aberme escuchado","modal_perfect","conditionnel_present","condicional"],
  ["Sarei rimasto a casa se fossi stato stanco",["i would have stayed at home if i had been tired","i would've stayed at home if i'd been tired"],["i would have stayed at home if i had been tired","i would've stayed at home if i'd been tired"],"je serais resté à la maison si j'avais été fatigué","me habría quedado en casa si hubiera estado cansado","ai wud av steid at houm if ai ad bin taiad","ai wudav steid at houm if aid bin taierd","ge serè restè a la mezon si giavè eté fatigè","me avria kedado en casa si ubiera estado cansado","third_conditional","si_clause","subjuntivo_hipotesis"]
];

const HISTORY_L1 = [
  ["re","king","king","roi","rey","king","king","rua","rei"],
  ["regina","queen","queen","reine","reina","kwiin","kwiin","ren","reina"],
  ["guerra","war","war","guerre","guerra","uo","uor","gher","guerra"],
  ["pace","peace","peace","paix","paz","piis","piis","pè","paz"],
  ["castello","castle","castle","château","castillo","caa-sl","casl","sciatò","castiglio"],
  ["impero","empire","empire","empire","imperio","em-pai-a","em-pai-er","ampir","imperio"]
];

const HISTORY_L2 = [
  ["antichità","antiquity","antiquity","antiquité","antigüedad","an-ti-kwi-ti","an-ti-kwi-di","antikité","antiguedad"],
  ["medioevo","middle ages","middle ages","moyen âge","edad media","midl eidgis","midl eidgis","moièn ag","edad media"],
  ["rivoluzione","revolution","revolution","révolution","revolución","rev-o-lu-scion","rev-o-lu-shen","revolusion","rebolucion"],
  ["battaglia","battle","battle","bataille","batalla","batl","badl","batai","bataya"],
  ["civiltà","civilization","civilization","civilisation","civilización","sivilai-zeiscion","sivilai-zeishen","civilisasion","sibilizacion"]
];

const HISTORY_L3 = [
  ["monarchia assoluta","absolute monarchy","absolute monarchy","monarchie absolue","monarquía absoluta","absolut mon-aki","absolut monarki","monarscì absolü","monarkia absoluta"],
  ["rivoluzione industriale","industrial revolution","industrial revolution","révolution industrielle","revolución industrial","indastrial revolu-scion","indastrial revolu-shen","revolusion andüstrièl","rebolucion industrial"],
  ["prima guerra mondiale","first world war","first world war","première guerre mondiale","primera guerra mundial","ferst uorld uo","ferst uorld uor","premier gher mondiàl","primera guerra mundial"],
  ["seconda guerra mondiale","second world war","second world war","deuxième guerre mondiale","segunda guerra mundial","sekond uorld uo","sekond uorld uor","deuzièm gher mondiàl","segunda guerra mundial"]
];

const GEOGRAPHY_L1 = [
  ["montagna","mountain","mountain","montagne","montaña","maun-tin","maun-tin","montagn","montania"],
  ["fiume","river","river","rivière","río","ri-va","ri-ver","rivièr","rio"],
  ["mare","sea","sea","mer","mar","sii","sii","mer","mar"],
  ["isola","island","island","île","isla","ai-land","ai-land","il","isla"],
  ["continente","continent","continent","continent","continente","kon-ti-nent","kan-ti-nent","continen","continente"],
  ["capitale","capital","capital","capitale","capital","capi-tl","ca-pi-dl","kapital","capital"]
];

const GEOGRAPHY_L2 = [
  ["stato","state","state","état","estado","steit","steit","eta","estado"],
  ["confine","border","border","frontière","frontera","bo-da","bor-der","frontièr","frontera"],
  ["emisfero","hemisphere","hemisphere","hémisphère","hemisferio","hemi-sfia","hemi-sfir","emisfèr","emisferio"],
  ["latitudine","latitude","latitude","latitude","latitud","lati-tiud","ladi-tud","latitüd","latitud"],
  ["longitudine","longitude","longitude","longitude","longitud","longi-tiud","londgi-tud","longitüd","longitud"]
];

const GEOGRAPHY_L3 = [
  ["Londra è la capitale del Regno Unito","london is the capital of the united kingdom","london is the capital of the united kingdom","londres est la capitale du royaume-uni","londres es la capital del reino unido","london iz dha capital ov dha united kingdom","landon iz the capidal ov the iunaited kingdom","londr e la kapital dü roiaum üni","londres es la capital del reino unido"],
  ["Parigi è la capitale della Francia","paris is the capital of france","paris is the capital of france","paris est la capitale de la france","parís es la capital de francia","paris iz dha capital ov frans","peris iz the capidal ov frans","pari e la kapital de la frans","paris es la capital de francia"],
  ["Madrid è la capitale della Spagna","madrid is the capital of spain","madrid is the capital of spain","madrid est la capitale de l'espagne","madrid es la capital de españa","madrid iz dha capital ov spein","madrid iz the capidal ov spein","madrid e la kapital de lespagn","madrid es la capital de espania"],
  ["Roma è la capitale dell'Italia","rome is the capital of italy","rome is the capital of italy","rome est la capitale de l'italie","roma es la capital de italia","roum iz dha capital ov itli","roum iz the capidal ov italy","rom e la kapital de litali","roma es la capital de italia"]
];

const ART_L1 = [
  ["quadro","painting","painting","tableau","cuadro","pein-ting","pein-ting","tablò","cuadro"],
  ["colore","colour","color","couleur","color","ca-la","ca-ler","culör","color"],
  ["disegno","drawing","drawing","dessin","dibujo","dro-ing","dra-ing","desen","dibujo"],
  ["scultura","sculpture","sculpture","sculpture","escultura","scalpcia","skalpcier","sculptür","escultura"],
  ["museo","museum","museum","musée","museo","miu-ziam","miu-ziam","müzé","museo"]
];

const ART_L2 = [
  ["artista","artist","artist","artiste","artista","aa-tist","ar-tist","artist","artista"],
  ["ritratto","portrait","portrait","portrait","retrato","por-trit","por-trit","portrè","retrato"],
  ["paesaggio","landscape","landscape","paysage","paisaje","land-skeip","land-skeip","peisag","paisaje"],
  ["affresco","fresco","fresco","fresque","fresco","freskou","freskou","fresk","fresco"],
  ["galleria d'arte","art gallery","art gallery","galerie d'art","galería de arte","aat galeri","art ghaleri","galeri dart","galeria de arte"]
];

const ART_L3 = [
  ["Leonardo da Vinci era un pittore e inventore","leonardo da vinci was a painter and inventor","leonardo da vinci was a painter and inventor","léonard de vinci était un peintre et inventeur","leonardo da vinci era un pintor e inventor","lionardo da vinci uoz a peinta and inventor","lionardo da vinci waz a peinter and inventor","leonar de vinci etè an pentr e inventör","leonardo da vinci era un pintor e inventor"],
  ["La prospettiva dà profondità al disegno","perspective gives depth to the drawing","perspective gives depth to the drawing","la perspective donne de la profondeur au dessin","la perspectiva da profundidad al dibujo","perspektiv ghivz depth tu dha droing","perspektiv ghivz depth tu the draing","la perspektiv don de la profonder o desen","la perspectiva da profundidad al dibujo"],
  ["Un affresco si dipinge sull'intonaco fresco","a fresco is painted on fresh plaster","a fresco is painted on fresh plaster","une fresque se peint sur l'enduit frais","un fresco se pinta sobre yeso fresco","a freskou iz peintid on fresh plasta","a freskou iz peinid on fresh plaster","ün fresk se pen sür landü frè","un fresco se pinta sobre yeso fresco"],
  ["La scultura può essere in marmo o bronzo","sculpture can be in marble or bronze","sculpture can be in marble or bronze","la sculpture peut être en marbre ou en bronze","la escultura puede ser de mármol o bronce","scalpcia can bi in ma-bol or bronz","skalpcier can bi in marbl or bronz","la sculptür pö etr an marbr u an bronz","la escultura puede ser de marmol o bronze"]
];

const SCIENCE_L1 = [
  ["pianta","plant","plant","plante","planta","plaant","plant","plant","planta"],
  ["animale","animal","animal","animal","animal","ani-mal","ani-mal","animal","animal"],
  ["foglia","leaf","leaf","feuille","hoja","liif","liif","föi","hoja"],
  ["radice","root","root","racine","raíz","ruut","ruut","rasin","raiz"],
  ["fiore","flower","flower","fleur","flor","flaua","flauer","flör","flor"],
  ["insetto","insect","insect","insecte","insecto","in-sekt","in-sekt","insect","insecto"]
];

const SCIENCE_L2 = [
  ["cellula","cell","cell","cellule","célula","sel","sel","selül","celula"],
  ["scheletro","skeleton","skeleton","squelette","esqueleto","skeliton","skeliton","squelet","esqueleto"],
  ["respirazione","respiration","respiration","respiration","respiración","respirai-scion","respirai-shen","respirasion","respiracion"],
  ["fotosintesi","photosynthesis","photosynthesis","photosynthèse","fotosíntesis","foutou-sinthisis","foutou-sinthisis","fotosentès","fotosintesis"],
  ["mammifero","mammal","mammal","mammifère","mamífero","mamel","mamel","mamifèr","mamifero"]
];

const SCIENCE_L3 = [
  ["La cellula è l'unità fondamentale della vita","the cell is the basic unit of life","the cell is the basic unit of life","la cellule est l'unité fondamentale de la vie","la célula es la unidad fundamental de la vida","dha sel iz dha beisik iunit ov laif","the sel iz the beisik iunit ov laif","la selül e lunité fondamantal de la vi","la celula es la unidad fundamental de la vida"],
  ["Le piante producono ossigeno con la fotosintesi","plants produce oxygen through photosynthesis","plants produce oxygen through photosynthesis","les plantes produisent de l'oxygène grâce à la photosynthèse","las plantas producen oxígeno con la fotosíntesis","plants produus oksigen thru fotousinthisis","plants prodius axigen thru fotosinthisis","le plant produiz de loxigèn gras a la fotosentès","las plantas producen oxigeno con la fotosintesis"],
  ["I mammiferi allattano i piccoli","mammals feed their young with milk","mammals feed their young with milk","les mammifères allaitent leurs petits","los mamíferos alimentan a sus crías con leche","mamels fiid dhea yang uith milk","mamels fid dher yang with milk","le mamifèr alèt leur peti","los mamiferos alimentan a sus crias con leche"],
  ["Lo scheletro sostiene il corpo","the skeleton supports the body","the skeleton supports the body","le squelette soutient le corps","el esqueleto sostiene el cuerpo","dha skeliton seports dha body","the skeliton supports the body","le squelet sutien le cor","el esqueleto sostiene el cuerpo"]
];

const PHYSICS_L1 = [
  ["forza","force","force","force","fuerza","fo:s","fors","fors","fuerza"],
  ["energia","energy","energy","énergie","energía","enedgi","enerdgi","energi","energia"],
  ["luce","light","light","lumière","luz","lait","lait","lumier","luz"],
  ["suono","sound","sound","son","sonido","saund","saund","son","sonido"],
  ["calore","heat","heat","chaleur","calor","hiit","hiit","scalör","calor"],
  ["massa","mass","mass","masse","masa","mas","mas","mas","masa"]
];

const PHYSICS_L2 = [
  ["velocità","speed","speed","vitesse","velocidad","spiid","spiid","vitess","velocidad"],
  ["gravità","gravity","gravity","gravité","gravedad","gravi-ti","gravi-di","gravité","gravedad"],
  ["temperatura","temperature","temperature","température","temperatura","tem-pri-cia","tempracher","tonperatür","temperatura"],
  ["elettricità","electricity","electricity","électricité","electricidad","ilektrisiti","ilektrisidi","elektrisité","electricidad"],
  ["magnete","magnet","magnet","aimant","imán","magnet","magnet","eman","iman"]
];

const PHYSICS_L3 = [
  ["La gravità attira i corpi verso la Terra","gravity pulls bodies toward the earth","gravity pulls bodies toward the earth","la gravité attire les corps vers la terre","la gravedad atrae los cuerpos hacia la tierra","gravity pulz bodis touod dha erth","gravi-di pulz badis tor-dh the erth","la gravité atir le cor ver la ter","la gravedad atrae los cuerpos hacia la tierra"],
  ["La luce viaggia più veloce del suono","light travels faster than sound","light travels faster than sound","la lumière voyage plus vite que le son","la luz viaja más rápido que el sonido","lait travels fasta dhan saund","lait travlz faster dhan saund","la lumier voiaj plü vit ke le son","la luz viaja mas rapido que el sonido"],
  ["L'energia può trasformarsi","energy can change form","energy can change form","l'énergie peut se transformer","la energía puede transformarse","enedgi can ceing form","enerdgi can cheindj form","lenergi pö se transformé","la energia puede transformarse"],
  ["Il magnete attira alcuni metalli","the magnet attracts some metals","the magnet attracts some metals","l'aimant attire certains métaux","el imán atrae algunos metales","dha magnet atrakts sam metals","the magnet atrakts sam medals","leman atir serten metò","el iman atrae algunos metales"]
];

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

const RAW_DATABASE = {
  "uso-comune": {
    1: buildEntries(COMMON_L1, 1),
    2: buildEntries(COMMON_L2, 2),
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
