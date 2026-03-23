let sessioneDomande = [];
let sessioneIndice = 0;
let sessioneAttiva = false;
let rispostaSelezionata = "";
let timerSeconds = 0;
let timerInterval = null;
let finalMascotTimer = null;

function normalizzaTesto(testo) {
  return String(testo)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[’]/g, "'");
}

function pulisciInput(testo) {
  return String(testo)
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 120);
}

function uniqueNormalizedStrings(arr) {
  const out = [];
  const seen = new Set();

  for (const item of arr) {
    const norm = normalizzaTesto(item);
    if (!seen.has(norm)) {
      seen.add(norm);
      out.push(item);
    }
  }

  return out;
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function startTimer() {
  stopTimer();
  timerInterval = setInterval(() => {
    timerSeconds++;
    document.getElementById("timerDisplay").textContent = formatTime(timerSeconds);
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function mescolaArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function getAcceptedAnswers(entry, lingua) {
  if (lingua === "en") {
    const enAll = [
      ...(entry.translations["en-GB"] || []),
      ...(entry.translations["en-US"] || [])
    ];

    const expanded = [];
    for (const ans of enAll) {
      expanded.push(ans);

      if (normalizzaTesto(ans).includes("colour")) expanded.push(ans.replace(/colour/gi, "color"));
      if (normalizzaTesto(ans).includes("color")) expanded.push(ans.replace(/color/gi, "colour"));
      if (normalizzaTesto(ans).includes("favourite")) expanded.push(ans.replace(/favourite/gi, "favorite"));
      if (normalizzaTesto(ans).includes("favorite")) expanded.push(ans.replace(/favorite/gi, "favourite"));
      if (normalizzaTesto(ans).includes("travelled")) expanded.push(ans.replace(/travelled/gi, "traveled"));
      if (normalizzaTesto(ans).includes("traveled")) expanded.push(ans.replace(/traveled/gi, "travelled"));
    }

    return uniqueNormalizedStrings(expanded);
  }

  return entry.translations[lingua] || [];
}

function getPronunciation(entry, lingua) {
  if (lingua === "en") {
    return entry.pronunciations["en-GB"] || entry.pronunciations["en-US"] || "";
  }
  return entry.pronunciations[lingua] || "";
}

function getTheory(entry, lingua) {
  let theoryKey = null;

  if (lingua === "en") theoryKey = entry.theory.en;
  if (lingua === "fr-FR") theoryKey = entry.theory["fr-FR"];
  if (lingua === "es-ES") theoryKey = entry.theory["es-ES"];

  if (!theoryKey) return null;

  const langTheory = THEORY[lingua];
  if (!langTheory) return null;

  return langTheory[theoryKey] || null;
}

function generaErroriInglese(fraseCorretta) {
  const errori = [];

  const base = fraseCorretta;

  // 1. togli articolo (an, a, the)
  errori.push(base.replace(/\b(an|a|the)\b\s*/gi, ""));

  // 2. errore verbo (eat → eats / eats → eat)
  errori.push(
    base.replace(/\beats\b/, "eat")
        .replace(/\beat\b/, "eats")
  );

  // 3. errore tempo continuo
  errori.push(
    base.replace(/\b(am|is|are)\b\s*/g, "")
  );

  // 4. aggiunge -ing sbagliato
  errori.push(
    base.replace(/\beat\b/, "eating")
  );

  return uniqueNormalizedStrings(errori).filter(e => normalizzaTesto(e) !== normalizzaTesto(fraseCorretta));
}

function generaOpzioniQuiz(rispostaCorretta, lingua, categoria, livello) {
  let errate = [];

  if (lingua === "en") {
    errate = generaErroriInglese(rispostaCorretta);
  }

  const pool = RAW_DATABASE[categoria][Number(livello)]
    .map(entry => getAcceptedAnswers(entry, lingua)[0])
    .filter(v => v && normalizzaTesto(v) !== normalizzaTesto(rispostaCorretta));

  const extra = uniqueNormalizedStrings(pool);
  const tutteErrate = mescolaArray([...errate, ...extra]);

  return mescolaArray([
    rispostaCorretta,
    ...tutteErrate.slice(0, 3)
  ]);
}

function creaRecordDomanda(entry, lingua, livello, categoria) {
  const risposte = getAcceptedAnswers(entry, lingua);

  return {
    domanda: entry.prompt,
    risposteAccettate: [...risposte],
    pronuncia: getPronunciation(entry, lingua),
    teoria: getTheory(entry, lingua),
    lingua,
    livello,
    categoria,
    rispostaUtente: "",
    corretta: null,
    correttaMostrata: risposte[0],
    controllata: false,
    opzioniQuiz: livello === 1 ? generaOpzioniQuiz(risposte[0], lingua, categoria, livello) : []
  };
}

function creaSessione(listaBase, numero, lingua, livello, categoria) {
  const records = [];

  while (records.length < numero) {
    const round = mescolaArray(listaBase).map(entry =>
      creaRecordDomanda(entry, lingua, livello, categoria)
    );

    for (const record of round) {
      if (records.length < numero) {
        records.push(record);
      }
    }
  }

  return records;
}

function usaModalitaQuiz() {
  if (!sessioneAttiva || !sessioneDomande.length) return false;
  return sessioneDomande[sessioneIndice].livello === 1;
}

function salvaProgresso() {
  const dati = {
    sessioneDomande,
    sessioneIndice,
    sessioneAttiva,
    timerSeconds
  };

  localStorage.setItem("progressiLingue", JSON.stringify(dati));
}

function caricaProgresso() {
  const dati = localStorage.getItem("progressiLingue");
  if (!dati) return;

  const parsed = JSON.parse(dati);

  sessioneDomande = parsed.sessioneDomande || [];
  sessioneIndice = parsed.sessioneIndice || 0;
  sessioneAttiva = false;
  timerSeconds = parsed.timerSeconds || 0;

  document.getElementById("timerDisplay").textContent = "00:00";
}

function aggiornaStatistiche() {
  const totale = sessioneDomande.length;
  const date = sessioneDomande.filter(x => x.controllata).length;
  const corrette = sessioneDomande.filter(x => x.corretta === true).length;
  const sbagliate = sessioneDomande.filter(x => x.corretta === false).length;
  const nonViste = totale - date;

  document.getElementById("domandaAttualeNumero").textContent = totale ? sessioneIndice + 1 : 0;
  document.getElementById("totaleSessione").textContent = totale;
  document.getElementById("risposteDate").textContent = date;
  document.getElementById("corrette").textContent = corrette;
  document.getElementById("sbagliate").textContent = sbagliate;
  document.getElementById("nonViste").textContent = nonViste;
  document.getElementById("progress").style.width = totale ? ((date / totale) * 100) + "%" : "0%";

  const linguaSelect = document.getElementById("lingua");
  const livelloSelect = document.getElementById("livello");
  const categoriaSelect = document.getElementById("categoria");

  const linguaTesto = linguaSelect.options[linguaSelect.selectedIndex].text;
  const livelloTesto = livelloSelect.options[livelloSelect.selectedIndex].text;
  const categoriaTesto = categoriaSelect.options[categoriaSelect.selectedIndex].text;

  document.getElementById("sessionInfo").textContent = totale
    ? `${linguaTesto} • ${categoriaTesto} • ${livelloTesto} • ${sessioneIndice + 1}/${totale}`
    : "Nessuna sessione attiva";

  document.getElementById("modeBadge").textContent = totale
    ? (usaModalitaQuiz() ? "Modalità: risposta multipla" : "Modalità: risposta scritta")
    : "Modalità non attiva";
}

function aggiornaPulsanti() {
  const prevBtn = document.getElementById("prevBtn");
  const mainActionBtn = document.getElementById("mainActionBtn");

  prevBtn.disabled = !sessioneAttiva || sessioneIndice === 0;
  prevBtn.classList.toggle("disabled", prevBtn.disabled);

  if (!sessioneAttiva || !sessioneDomande.length) {
    mainActionBtn.textContent = "Controlla";
    mainActionBtn.className = "primary";
    return;
  }

  const item = sessioneDomande[sessioneIndice];

  if (!item.controllata) {
    mainActionBtn.textContent = item.livello === 1 ? "Scegli una risposta" : "Controlla";
    mainActionBtn.className = "primary";
  } else if (item.corretta) {
    mainActionBtn.textContent = "Corretto! Vai alla domanda successiva";
    mainActionBtn.className = "success";
  } else {
    mainActionBtn.textContent = "Errato! Vai alla domanda successiva";
    mainActionBtn.className = "danger";
  }
}

function mostraTeoria(item) {
  const box = document.getElementById("theoryBox");
  const topic = document.getElementById("theoryTopic");
  const text = document.getElementById("theoryText");

  if (item.livello === 1 || !item.teoria) {
    box.style.display = "none";
    topic.textContent = "";
    text.textContent = "";
    return;
  }

  box.style.display = "block";
  topic.textContent = item.teoria.topic;
  text.textContent = item.teoria.text;
}

function renderOpzioniQuiz(item) {
  const box = document.getElementById("quizOptions");
  box.innerHTML = "";

  item.opzioniQuiz.forEach(opzione => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";

    if (item.rispostaUtente === opzione) {
      btn.classList.add("selected");
    }

    if (item.controllata) {
      if (normalizzaTesto(opzione) === normalizzaTesto(item.correttaMostrata)) {
        btn.classList.add("correct");
      }
      if (
        normalizzaTesto(item.rispostaUtente) === normalizzaTesto(opzione) &&
        normalizzaTesto(opzione) !== normalizzaTesto(item.correttaMostrata)
      ) {
        btn.classList.add("wrong");
      }
    }

    btn.textContent = opzione;
    btn.onclick = function () {
      if (item.controllata) return;
      rispostaSelezionata = opzione;
      item.rispostaUtente = opzione;
      controllaRisposta();
    };

    box.appendChild(btn);
  });
}

function aggiornaMascotteHeader(stato) {
  const mascotte = document.getElementById("mascotte");
  if (!mascotte) return;

  if (stato === "happy") {
    mascotte.src = "logo-happy.png";
  } else if (stato === "sad") {
    mascotte.src = "logo-sad.png";
  } else {
    mascotte.src = "logo-neutral.png";
  }
}

function mostraDomandaCorrente() {
  if (!sessioneAttiva || !sessioneDomande.length) return;

  const item = sessioneDomande[sessioneIndice];
  rispostaSelezionata = item.rispostaUtente || "";

  document.getElementById("summaryBox").classList.add("hidden");
  document.getElementById("mainCard").classList.remove("hidden");
  document.getElementById("domanda").textContent = item.domanda;

  if (!item.controllata) {
    aggiornaMascotteHeader("neutral");
  } else {
    aggiornaMascotteHeader(item.corretta ? "happy" : "sad");
  }

  mostraTeoria(item);

  const input = document.getElementById("risposta");
  const quizBox = document.getElementById("quizOptions");

  if (item.livello === 1) {
    input.style.display = "none";
    quizBox.style.display = "grid";
    renderOpzioniQuiz(item);
  } else {
    input.style.display = "block";
    quizBox.style.display = "none";
    input.value = item.rispostaUtente || "";
  }

  if (item.controllata) {
    document.getElementById("pronuncia").textContent = "Pronuncia: " + item.pronuncia;
    document.getElementById("risultato").textContent = item.corretta ? "✅ Corretto!" : "❌ Sbagliato!";
    document.getElementById("rispostaCorretta").textContent = item.correttaMostrata;
    document.getElementById("pronunciaCorretta").textContent = item.pronuncia;
    document.getElementById("answerBox").style.display = "block";
  } else {
    document.getElementById("pronuncia").textContent = "Pronuncia: nascosta fino alla correzione";
    document.getElementById("risultato").textContent = "";
    document.getElementById("rispostaCorretta").textContent = "";
    document.getElementById("pronunciaCorretta").textContent = "";
    document.getElementById("answerBox").style.display = "none";
  }

  aggiornaStatistiche();
  aggiornaPulsanti();

  if (item.livello !== 1) {
    input.focus();
  }
}

function salvaRispostaTemporanea() {
  if (!sessioneAttiva || !sessioneDomande.length) return;
  const item = sessioneDomande[sessioneIndice];

  if (item.livello === 1) {
    item.rispostaUtente = rispostaSelezionata || item.rispostaUtente || "";
  } else {
    item.rispostaUtente = document.getElementById("risposta").value;
  }
}

function iniziaSessione() {
  const lingua = document.getElementById("lingua").value;
  const categoria = document.getElementById("categoria").value;
  const livello = parseInt(document.getElementById("livello").value, 10);
  const numero = parseInt(document.getElementById("numeroDomande").value, 10);

  const base = RAW_DATABASE[categoria][livello];

  sessioneDomande = creaSessione(base, numero, lingua, livello, categoria);
  sessioneIndice = 0;
  sessioneAttiva = true;
  rispostaSelezionata = "";
  timerSeconds = 0;
  document.getElementById("timerDisplay").textContent = formatTime(timerSeconds);
  startTimer();

  aggiornaMascotteHeader("neutral");
  mostraDomandaCorrente();
  salvaProgresso();
}

function controllaRisposta() {
  if (!sessioneAttiva || !sessioneDomande.length) {
    document.getElementById("risultato").textContent = "Prima avvia una sessione.";
    return;
  }

  const item = sessioneDomande[sessioneIndice];
  let rispostaOriginale = "";

  if (item.livello === 1) {
    rispostaOriginale = item.rispostaUtente || "";
    if (!rispostaOriginale) {
      document.getElementById("risultato").textContent = "Seleziona una risposta.";
      return;
    }
  } else {
    rispostaOriginale = pulisciInput(document.getElementById("risposta").value);
    document.getElementById("risposta").value = rispostaOriginale;
  }

  const rispostaNorm = normalizzaTesto(rispostaOriginale);

  item.rispostaUtente = rispostaOriginale;
  item.corretta = item.risposteAccettate.some(r => normalizzaTesto(r) === rispostaNorm);
  item.controllata = true;

  aggiornaMascotteHeader(item.corretta ? "happy" : "sad");

  document.getElementById("pronuncia").textContent = "Pronuncia: " + item.pronuncia;
  document.getElementById("risultato").textContent = item.corretta ? "✅ Corretto!" : "❌ Sbagliato!";
  document.getElementById("rispostaCorretta").textContent = item.correttaMostrata;
  document.getElementById("pronunciaCorretta").textContent = item.pronuncia;
  document.getElementById("answerBox").style.display = "block";

  if (item.livello === 1) {
    renderOpzioniQuiz(item);
  }

  aggiornaStatistiche();
  aggiornaPulsanti();
  salvaProgresso();

  const date = sessioneDomande.filter(x => x.controllata).length;
  if (date > 0 && date % 40 === 0) {
    mostraPubblicitaDemo();
  }
}

function azionePrincipale() {
  if (!sessioneAttiva || !sessioneDomande.length) {
    document.getElementById("risultato").textContent = "Prima avvia una sessione.";
    return;
  }

  const item = sessioneDomande[sessioneIndice];

  if (!item.controllata) {
    if (item.livello === 1) {
      document.getElementById("risultato").textContent = "Seleziona una risposta per continuare.";
      return;
    }
    controllaRisposta();
  } else {
    domandaSuccessiva();
  }
}

function domandaPrecedente() {
  if (!sessioneAttiva || sessioneIndice === 0) return;
  salvaRispostaTemporanea();
  sessioneIndice--;
  mostraDomandaCorrente();
  salvaProgresso();
}

function domandaSuccessiva() {
  if (!sessioneAttiva || sessioneIndice >= sessioneDomande.length - 1) return;
  salvaRispostaTemporanea();
  sessioneIndice++;
  mostraDomandaCorrente();
  salvaProgresso();
}

function ascoltaPronuncia() {
  if (!sessioneAttiva || !sessioneDomande.length) return;

  const item = sessioneDomande[sessioneIndice];
  const utterance = new SpeechSynthesisUtterance(item.correttaMostrata);

  if (item.lingua === "en") utterance.lang = "en-US";
  if (item.lingua === "fr-FR") utterance.lang = "fr-FR";
  if (item.lingua === "es-ES") utterance.lang = "es-ES";

  speechSynthesis.speak(utterance);
}

function mostraPopupFinaleMascotte(percentuale) {
  const popup = document.getElementById("finalMascotPopup");
  const img = document.getElementById("finalMascotImg");
  const text = document.getElementById("finalMascotText");

  if (!popup || !img || !text) return;

  if (percentuale >= 75) {
    img.src = "logo-happy.png";
    text.textContent = "Fantastico lavoro!";
  } else if (percentuale >= 50) {
    img.src = "logo-neutral.png";
    text.textContent = "Buon risultato, continua così!";
  } else {
    img.src = "logo-sad.png";
    text.textContent = "Non mollare, riprova!";
  }

  popup.setAttribute("aria-hidden", "false");
  popup.classList.add("show");

  if (finalMascotTimer) {
    clearTimeout(finalMascotTimer);
  }

  finalMascotTimer = setTimeout(() => {
    popup.classList.remove("show");
    popup.setAttribute("aria-hidden", "true");
  }, 3000);
  }

function aggiornaMascotteHeaderFinale(percentuale) {
  const mascotte = document.getElementById("mascotte");
  if (!mascotte) return;

  if (percentuale >= 75) {
    mascotte.src = "logo-happy.png";
  } else if (percentuale >= 50) {
    mascotte.src = "logo-neutral.png";
  } else {
    mascotte.src = "logo-sad.png";
  }
}

function fineSessione() {
  if (!sessioneDomande.length) return;

  salvaRispostaTemporanea();
  sessioneAttiva = false;
  stopTimer();

  const corrette = sessioneDomande.filter(x => x.corretta === true).length;
  const sbagliate = sessioneDomande.filter(x => x.corretta === false).length;
  const totale = sessioneDomande.length;
  const percentuale = totale ? Math.round((corrette / totale) * 100) : 0;

  mostraPopupFinaleMascotte(percentuale);
  aggiornaMascotteHeaderFinale(percentuale);

  document.getElementById("mainCard").classList.add("hidden");
  document.getElementById("summaryBox").classList.remove("hidden");

  document.getElementById("finalCorrette").textContent = corrette;
  document.getElementById("finalSbagliate").textContent = sbagliate;
  document.getElementById("finalTotale").textContent = totale;
  document.getElementById("finalPercentuale").textContent = percentuale + "%";
  document.getElementById("finalTempo").textContent = formatTime(timerSeconds);

  const list = document.getElementById("summaryList");
  list.innerHTML = "";

  sessioneDomande.forEach((item, index) => {
    const div = document.createElement("div");
    let cls = "summary-item";

    if (item.corretta === true) cls += " correct";
    if (item.corretta === false) cls += " wrong";

    let esito = "Non controllata";
    if (item.corretta === true) esito = "Corretta";
    if (item.corretta === false) esito = "Sbagliata";

    div.className = cls;

    const title = document.createElement("div");
    title.className = "summary-title";
    title.textContent = `Domanda ${index + 1}: ${item.domanda}`;

    const userAnswer = document.createElement("div");
    userAnswer.textContent = `Tua risposta: ${item.rispostaUtente || "(vuota)"}`;

    const correctAnswer = document.createElement("div");
    correctAnswer.textContent = `Risposta corretta: ${item.correttaMostrata}`;

    const pronunciation = document.createElement("div");
    pronunciation.textContent = `Pronuncia: ${item.pronuncia}`;

    const result = document.createElement("div");
    result.textContent = `Esito: ${esito}`;

    div.appendChild(title);
    div.appendChild(userAnswer);
    div.appendChild(correctAnswer);
    div.appendChild(pronunciation);
    div.appendChild(result);

    list.appendChild(div);
  });

  localStorage.removeItem("progressiLingue");
  aggiornaStatistiche();
  aggiornaPulsanti();
}

function ripetiTutte() {
  if (!sessioneDomande.length) return;

  sessioneDomande = sessioneDomande.map(item => ({
    ...item,
    rispostaUtente: "",
    corretta: null,
    controllata: false,
    opzioniQuiz: item.livello === 1
      ? generaOpzioniQuiz(item.correttaMostrata, item.lingua, item.categoria, item.livello)
      : []
  }));

  sessioneIndice = 0;
  sessioneAttiva = true;
  rispostaSelezionata = "";
  timerSeconds = 0;
  document.getElementById("timerDisplay").textContent = formatTime(timerSeconds);
  startTimer();
  aggiornaMascotteHeader("neutral");
  mostraDomandaCorrente();
  salvaProgresso();
}

function ripetiErrate() {
  const errate = sessioneDomande.filter(item => item.corretta === false);
  if (!errate.length) {
    alert("Non ci sono domande errate da ripetere.");
    return;
  }

  sessioneDomande = errate.map(item => ({
    ...item,
    rispostaUtente: "",
    corretta: null,
    controllata: false,
    opzioniQuiz: item.livello === 1
      ? generaOpzioniQuiz(item.correttaMostrata, item.lingua, item.categoria, item.livello)
      : []
  }));

  sessioneIndice = 0;
  sessioneAttiva = true;
  rispostaSelezionata = "";
  timerSeconds = 0;
  document.getElementById("timerDisplay").textContent = formatTime(timerSeconds);
  startTimer();
  aggiornaMascotteHeader("neutral");
  mostraDomandaCorrente();
  salvaProgresso();
}

function tornaAllInizio() {
  sessioneDomande = [];
  sessioneIndice = 0;
  sessioneAttiva = false;
  rispostaSelezionata = "";
  stopTimer();
  timerSeconds = 0;
  document.getElementById("timerDisplay").textContent = "00:00";

  document.getElementById("summaryBox").classList.add("hidden");
  document.getElementById("mainCard").classList.remove("hidden");

  document.getElementById("domanda").textContent = 'Premi "Inizia sessione"';
  document.getElementById("pronuncia").textContent = "Pronuncia: nascosta fino alla correzione";
  document.getElementById("risultato").textContent = "";
  document.getElementById("risposta").value = "";
  document.getElementById("risposta").style.display = "none";
  document.getElementById("quizOptions").style.display = "none";
  document.getElementById("quizOptions").innerHTML = "";
  document.getElementById("answerBox").style.display = "none";
  document.getElementById("theoryBox").style.display = "none";
  document.getElementById("theoryTopic").textContent = "";
  document.getElementById("theoryText").textContent = "";

  aggiornaStatistiche();
  aggiornaPulsanti();
  aggiornaMascotteHeader("neutral");
  localStorage.removeItem("progressiLingue");
}

function mostraPubblicitaDemo() {
  document.getElementById("adPopup").style.display = "flex";
}

function chiudiPubblicita() {
  document.getElementById("adPopup").style.display = "none";
}

function chiudiWelcomeScreen() {
  const welcome = document.getElementById("welcomeScreen");
  if (!welcome) return;
  welcome.classList.add("hidden");
}

function chiudiWelcomeScreen() {
  const welcome = document.getElementById("welcomeScreen");
  if (!welcome) return;
  welcome.classList.add("hidden");
}
document.addEventListener("DOMContentLoaded", function () {
  caricaProgresso();

  const inputRisposta = document.getElementById("risposta");
  if (inputRisposta) {
    inputRisposta.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !usaModalitaQuiz()) {
        azionePrincipale();
      }
    });
  }

  tornaAllInizio();
});