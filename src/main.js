window.addEventListener("DOMContentLoaded", () => {
  const bottone1 = document.querySelector("#bottone1");
  const bottone2 = document.querySelector("#bottone2");
  const bottone3 = document.querySelector("#bottone3");
  const divAggiungiArg = document.querySelector(".aggiungi_arg");
  const divVisualizzaArg = document.querySelector(".visualizza_arg");
  const divVisualizzaCal = document.querySelector(".visualizza_cal");

  if (bottone1 && divAggiungiArg && divVisualizzaArg && divVisualizzaCal) {
    bottone1.addEventListener("click", () => {

      divAggiungiArg.style.display = "block";
      divVisualizzaArg.style.display = "none";
      divVisualizzaCal.style.display = "none";
    });

    
    bottone2.addEventListener("click", () => {

      divAggiungiArg.style.display = "none";
      divVisualizzaArg.style.display = "block";
      divVisualizzaCal.style.display = "none";
    });

    bottone3.addEventListener("click", () => {

      divAggiungiArg.style.display = "none";
      divVisualizzaArg.style.display = "none";
      divVisualizzaCal.style.display = "block";
    });

  } else {
    console.error("Uno o più elementi non sono stati trovati nel DOM");
  }
});


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
