const { invoke } = window.__TAURI__.core;


// aggiungi argomento
document.querySelector("#bottone_aggiungi").addEventListener("click", () => {
  const titolo = document.getElementById("titolo").value;
  const descrizione = document.getElementById("descrizione").value;
  const materia = document.getElementById("materia").value;

  if (titolo && descrizione && materia) {
    invoke("inserisci_argomento", {materia: materia, nome: titolo, descrizione: descrizione} )
      .then(response => console.log("Argomento aggiunto con successo"))
      .catch(error => console.error("Errore:", error));
  } else {
    alert("Compila tutti i campi");
  }

  document.getElementById("titolo").value = "";
  document.getElementById("descrizione").value = "";
  document.getElementById("materia").value = "";
  caricaMaterie();
})
 

// bottoni principali
window.addEventListener("DOMContentLoaded", () => {
  const bottone1 = document.querySelector("#bottone1");
  const bottone2 = document.querySelector("#bottone2");
  const bottone3 = document.querySelector("#bottone3");
  const divAggiungiArg = document.querySelector(".aggiungi_arg");
  const divVisualizzaArg = document.querySelector(".visualizza_arg");
  const divVisualizzaCal = document.querySelector(".visualizza_cal");
  const divLeggiArg = document.querySelector(".leggi_arg");

  if (bottone1 && divAggiungiArg && divVisualizzaArg && divVisualizzaCal) {
    bottone1.addEventListener("click", () => {

      divAggiungiArg.style.display = "block";
      divVisualizzaArg.style.display = "none";
      divVisualizzaCal.style.display = "none";
      divLeggiArg.style.display = "none";
    });

    
    bottone2.addEventListener("click", () => {

      divAggiungiArg.style.display = "none";
      divVisualizzaArg.style.display = "block";
      divVisualizzaCal.style.display = "none";
      divLeggiArg.style.display = "none";
    });

    bottone3.addEventListener("click", () => {

      divAggiungiArg.style.display = "none";
      divVisualizzaArg.style.display = "none";
      divVisualizzaCal.style.display = "block";
      divLeggiArg.style.display = "none";
    });

  } else {
    console.error("Uno o più elementi non sono stati trovati nel DOM");
  }

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


window.addEventListener("DOMContentLoaded", () => {
  const divAggiungiArg = document.querySelector(".aggiungi_arg");
  const divVisualizzaArg = document.querySelector(".visualizza_arg");
  const divVisualizzaCal = document.querySelector(".visualizza_cal");
  const bottone4 = document.querySelector("#bottone4");
  const divLeggiArg = document.querySelector(".leggi_arg");
  const titoloArg = document.querySelector("#titolo_argomento");
  const descrizioneArg = document.querySelector("#descrizione_argomento");

  // Assegna l'event listener al contenitore che contiene gli argomenti (ul o div padre)
  const listaMaterie = document.getElementById("lista_materie");

  // Richiedi i dati delle materie (invocazione asincrona)
  invoke("ottieni_materie_json").then(materie => {

    // Usa event delegation per catturare i click su elementi con classe .liArgomento
    listaMaterie.addEventListener("click", (event) => {
      if (event.target.classList.contains("liArgomento")) {
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
