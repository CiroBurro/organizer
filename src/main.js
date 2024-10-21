const { invoke } = window.__TAURI__.core;


// aggiungi argomento
document.querySelector("#bottone_aggiungi").addEventListener("click", () => {
  const titolo = document.getElementById("titolo").value;
  var descrizione = document.getElementById("descrizione").value;
  const materia = document.getElementById("materia").value;
  var voto = document.getElementById("voto").value;
  var collegamenti = document.getElementById("collegamenti").value;

  if (!descrizione) {
    descrizione = "Non è ancora stata inserita una descrizione per questo argomento";
  }

  if (!collegamenti) {
    collegamenti = "Non sono ancora stati inseriti collegamenti per questo argomento";
  }

  if (!voto) {
    voto = "0.0";
  }

  if (titolo && materia) {
    if ((parseFloat(voto) >= 2 && parseFloat(voto) <= 10) || voto === "0.0") {
      invoke("inserisci_argomento", {materia: materia, nome: titolo, descrizione: descrizione, collegamenti: collegamenti, voto: voto} )
        .then(response => alert("Argomento aggiunto con successo"))
        .catch(error => alert("Errore", error));
      
      document.getElementById("titolo").value = "";
      document.getElementById("descrizione").value = "";
      document.getElementById("voto").value = "";
      document.getElementById("materia").value = "";
      document.getElementById("collegamenti").value = "";
    } else {
      alert("Non fare il fenomeno, il voto deve essere compreso tra 2 e 10");
    }
  } else {
    alert("Compila tutti i campi");
  }

  caricaMaterie();
})

document.querySelector("#modifica").addEventListener("click", () => {
  const titolo = document.getElementById("titolo_mod").value;
  const descrizione = document.getElementById("descrizione_mod").value;
  const materia = document.getElementById("materia_mod").value;
  const voto = document.getElementById("voto_mod").value;
  var collegamenti = document.getElementById("collegamenti_mod").value;
  const divModifica = document.querySelector(".modifica");
  const divContent = document.querySelector(".content");
  const divBottoni = document.querySelector(".bottoni");


  if (titolo && materia) {
    if (parseFloat(voto) >= 2 && parseFloat(voto) <= 10) {
      invoke("modifica_argomento", {materia: materia, nome: titolo, descrizione: descrizione, collegamenti: collegamenti, voto: voto} )
        .then(response => alert("Argomento aggiornato con successo, riavvia l'app per vedere le modifiche"))
        .catch(error => alert("Errore", error));
    

      document.getElementById("titolo_mod").value = "";
      document.getElementById("descrizione_mod").value = "";
      document.getElementById("materia_mod").value = "";
      document.getElementById("collegamenti_mod").value = "";
      document.getElementById("voto_mod").value = "";
      divModifica.style.display = "none";
      divContent.style.opacity = 1;
      divBottoni.style.opacity = 1;
    } else {
      alert("Non fare il fenomeno, il voto deve essere compreso tra 2 e 10");
    }
  } else {
    alert("Inserisci il titolo e la materia dell'argomento che vuoi modificare");
  }

  caricaMaterie();
});

document.querySelector("#elimina").addEventListener("click", () => {
  const titolo = document.getElementById("titolo_mod").value;
  const materia = document.getElementById("materia_mod").value;
  const divModifica = document.querySelector(".modifica");
  const divContent = document.querySelector(".content");
  const divBottoni = document.querySelector(".bottoni");

  if (titolo && materia) {
    invoke("elimina_argomento", {materia: materia, nome: titolo} )
      .then(response => alert("Argomento eliminato con successo"))
      .catch(error => alert("Errore:", error));
    
      document.getElementById("titolo_mod").value = "";
      document.getElementById("descrizione_mod").value = "";
      document.getElementById("materia_mod").value = "";
      document.getElementById("collegamenti_mod").value = "";
      document.getElementById("voto_mod").value = "";
      divModifica.style.display = "none";
      divContent.style.opacity = 1;
      divBottoni.style.opacity = 1;

      caricaMaterie();   
  } else {
    alert("Inserisci il titolo e la materia dell'argomento che vuoi eliminare");
  }
});

document.querySelector("#annulla").addEventListener("click", () => {
  const divModifica = document.querySelector(".modifica");
  const divContent = document.querySelector(".content");
  const divBottoni = document.querySelector(".bottoni");

  document.getElementById("titolo_mod").value = "";
  document.getElementById("descrizione_mod").value = "";
  document.getElementById("materia_mod").value = "";
  document.getElementById("collegamenti_mod").value = "";
  document.getElementById("voto_mod").value = "";
  divModifica.style.display = "none";
  divContent.style.opacity = 1;
  divBottoni.style.opacity = 1;
    
});



// bottoni principali
window.addEventListener("DOMContentLoaded", () => {
  const bottone1 = document.querySelector("#bottone1");
  const bottone2 = document.querySelector("#bottone2");
  const bottone3 = document.querySelector("#bottone3");
  const bottone4 = document.querySelector("#bottone4");
  const divAggiungiArg = document.querySelector(".aggiungi_arg");
  const divVisualizzaArg = document.querySelector(".visualizza_arg");
  const divVisualizzaCal = document.querySelector(".visualizza_cal");
  const divLeggiArg = document.querySelector(".leggi_arg");
  const divModifica = document.querySelector(".modifica");
  const divContent = document.querySelector(".content");
  const divBottoni = document.querySelector(".bottoni");

  if (divAggiungiArg && divVisualizzaArg && divVisualizzaCal) {
    bottone1.addEventListener("click", () => {

      divAggiungiArg.style.display = "block";
      divVisualizzaArg.style.display = "none";
      divVisualizzaCal.style.display = "none";
      divLeggiArg.style.display = "none";
      bottone4.style.display = "none";
    });

    
    bottone2.addEventListener("click", () => {

      divAggiungiArg.style.display = "none";
      divVisualizzaArg.style.display = "block";
      divVisualizzaCal.style.display = "none";
      divLeggiArg.style.display = "none";
      bottone4.style.display = "block";
    });

    bottone3.addEventListener("click", () => {

      divAggiungiArg.style.display = "none";
      divVisualizzaArg.style.display = "none";
      divVisualizzaCal.style.display = "block";
      divLeggiArg.style.display = "none";
      bottone4.style.display = "none";
    });

  } else {
    console.error("Uno o più elementi non sono stati trovati nel DOM");
  }


  bottone4.addEventListener("click", () => {
    divContent.style.opacity = 0.5;
    divBottoni.style.opacity = 0.5;
    divModifica.style.display = "block";
  });

});


// calendario
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

document.addEventListener("DOMContentLoaded", function() {
  // Funzione per creare un calendario dinamico
  function createCalendar(year, month) {
    const calendarEl = document.querySelector('.visualizza_cal');
    calendarEl.innerHTML = '';  // Pulisci il div

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    // Intestazione del calendario
    const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    const calendarHeader = `
      <div class="calendar-header">
        <button class="change-month" id="prev-month">←</button>
        ${monthNames[month]} ${year}
        <button class="change-month" id="next-month">→</button>
      </div>`;
    calendarEl.insertAdjacentHTML("beforeend", calendarHeader);

    // Creazione della struttura del calendario
    const daysContainer = document.createElement('div');
    daysContainer.classList.add('days-container');

    // Aggiungi giorni vuoti prima del primo giorno del mese
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('empty');
      daysContainer.appendChild(emptyCell);
    }

    // Aggiungi i giorni del mese
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('day');
      dayCell.textContent = day;


      daysContainer.appendChild(dayCell);
    }

    calendarEl.appendChild(daysContainer);
  }

  // Funzione per aggiornare il calendario
  function updateCalendar() {
    createCalendar(currentYear, currentMonth);
  }

  // Event listeners per i bottoni di cambio mese
  document.body.addEventListener('click', function(event) {
    if (event.target.id === 'prev-month') {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateCalendar();
    } else if (event.target.id === 'next-month') {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateCalendar();
    }
  });

  // Inizializza il calendario
  updateCalendar();
});


// tree view
async function caricaMaterie() {
  try {
    const response = await invoke("ottieni_materie_json"); // Invoca la funzione Tauri
    popolaArgomenti(response); // Popola gli argomenti nell'interfaccia
  } catch (error) {
    console.error("Errore nel caricamento delle materie:", error);
  }
}

// Funzione per popolare le materie e i loro argomenti
function popolaArgomenti(materie) {
  const listaMaterie = document.getElementById("lista_materie");

  // Pulisce eventuali elementi esistenti
  listaMaterie.innerHTML = '';

  // Itera su tutte le materie
  materie.forEach(materia => {
    const li = document.createElement("li");

    // Aggiunge il nome della materia e il contenitore degli argomenti
    li.innerHTML = `<span class="materia_nome">${materia.nome}</span><ul class="argomenti"></ul>`;
    const ulArgomenti = li.querySelector(".argomenti");

    // Itera sugli argomenti e li aggiunge al DOM
    materia.argomenti.forEach(argomento => {
      const liArgomento = document.createElement("li");
      liArgomento.className = "liArgomento";
      liArgomento.textContent = argomento.nome; // Aggiunge il nome dell'argomento
      ulArgomenti.appendChild(liArgomento);
    });

    // Aggiunge la materia alla lista delle materie
    listaMaterie.appendChild(li);
  });
}

// Event delegation per il toggle delle materie
document.getElementById("lista_materie").addEventListener("click", function(event) {
  // Verifica che l'elemento cliccato sia una materia
  if (event.target.classList.contains("materia_nome")) {
    const argomentiList = event.target.parentElement.querySelector(".argomenti");
    argomentiList.classList.toggle("active"); // Mostra o nasconde gli argomenti
    event.target.classList.toggle("materia_nome-open"); // Cambia l'icona del toggle
  }
});

// leggi argomento
window.addEventListener("DOMContentLoaded", () => {
  const divAggiungiArg = document.querySelector(".aggiungi_arg");
  const divVisualizzaArg = document.querySelector(".visualizza_arg");
  const divVisualizzaCal = document.querySelector(".visualizza_cal");
  const bottone4 = document.querySelector("#bottone4");
  const divLeggiArg = document.querySelector(".leggi_arg");
  const titoloArg = document.querySelector("#titolo_argomento");
  const descrizioneArg = document.querySelector("#descrizione_argomento");
  const collegamentiArg = document.querySelector("#collegamenti_argomento");
  const votoArg = document.querySelector("#voto_argomento");

  // Assegna l'event listener al contenitore che contiene gli argomenti (ul o div padre)
  const listaMaterie = document.getElementById("lista_materie");

  // Richiedi i dati delle materie (invocazione asincrona)
  invoke("ottieni_materie_json").then(materie => {

    // Usa event delegation per catturare i click su elementi con classe .liArgomento
    listaMaterie.addEventListener("click", (event) => {
      if (event.target.classList.contains("liArgomento")) {
        caricaMaterie();
        // Nascondi/mostra i div desiderati
        divAggiungiArg.style.display = "none";
        divVisualizzaArg.style.display = "none";
        divVisualizzaCal.style.display = "none";
        divLeggiArg.style.display = "block";
        bottone4.style.display = "block";

        // Ottieni il nome dell'argomento cliccato
        const argomentoCliccato = event.target.textContent;
        titoloArg.textContent = argomentoCliccato;

        // Cerca l'argomento corrispondente nella lista delle materie e fermati al primo match
        for (const materia of materie) {
          for (const argomento of materia.argomenti) {
            if (argomento.nome === argomentoCliccato) {
              // Imposta la descrizione dell'argomento selezionato
              descrizioneArg.textContent = argomento.descrizione;
              collegamentiArg.textContent = argomento.collegamenti;
              if (argomento.voto !== 0) {
                votoArg.textContent = argomento.voto;
              } else if (argomento.voto === 0) {

                votoArg.style.fontSize = "17px";
                votoArg.textContent = "Non è ancora stato inserito un voto per questo argomento";
              }
              return; // Esci dal ciclo una volta trovata la corrispondenza
            }
          }
        }
      }
    });
  }).catch(error => {
    console.error("Errore nel recupero delle materie:", error);
  });
});




// Carica le materie all'avvio
caricaMaterie();
