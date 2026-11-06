// Island Vibes: shared JavaScript for all three pages.
"use strict";

const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = currentYear;

// Array of objects: sample event information used to create the event cards.
const events = [
  { id: 1, title: "Reggae Sunset Session", genre: "Reggae", date: "November 21, 2026", venue: "Seaside Lawn, Kingston", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80", description: "An evening of roots reggae, live musicians and a relaxed sunset atmosphere." },
  { id: 2, title: "Dancehall Energy Night", genre: "Dancehall", date: "December 5, 2026", venue: "City Arena, Kingston", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80", description: "A high-energy dancehall showcase celebrating the sound and movement of the genre." },
  { id: 3, title: "Island Fusion Live", genre: "Fusion", date: "December 19, 2026", venue: "Cultural Park, Spanish Town", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80", description: "A mix of Caribbean sounds, performers and live entertainment." },
  { id: 4, title: "Roots & Culture Evening", genre: "Reggae", date: "January 9, 2027", venue: "Heritage Gardens, Kingston", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80", description: "A community music evening highlighting reggae and Caribbean culture." }
];

function renderEvents(selectedGenre = "All") {
  const eventList = document.getElementById("eventList");
  if (!eventList) return;

  eventList.innerHTML = "";
  let visibleCount = 0;

  // Iteration: loop through the event objects and display matching items.
  for (const event of events) {
    if (selectedGenre !== "All" && event.genre !== selectedGenre) continue;

    visibleCount++;
    const column = document.createElement("div");
    column.className = "col-md-6 col-lg-4";
    column.innerHTML = `
      <article class="card event-card">
        <img src="${event.image}" class="card-img-top" alt="Live music atmosphere for ${event.title}">
        <div class="card-body d-flex flex-column">
          <span class="genre-tag align-self-start mb-3">${event.genre}</span>
          <h3 class="card-title h5">${event.title}</h3>
          <p class="text-secondary small mb-1">${event.date}</p>
          <p class="text-secondary small">${event.venue}</p>
          <button class="btn btn-outline-success mt-auto" type="button" data-event-id="${event.id}" data-bs-toggle="modal" data-bs-target="#eventModal">View details</button>
        </div>
      </article>`;
    eventList.appendChild(column);
  }

  const noEvents = document.getElementById("noEvents");
  if (noEvents) noEvents.classList.toggle("d-none", visibleCount !== 0);
}

const genreFilter = document.getElementById("genreFilter");
if (genreFilter) {
  genreFilter.addEventListener("change", function () {
    renderEvents(this.value);
  });
  renderEvents();
}

// Event delegation: find the selected event and place its information in a Bootstrap modal.
document.addEventListener("click", function (event) {
  const detailsButton = event.target.closest("[data-event-id]");
  if (!detailsButton) return;

  const selectedEvent = events.find(item => item.id === Number(detailsButton.dataset.eventId));
  if (!selectedEvent) return;

  document.getElementById("eventModalTitle").textContent = selectedEvent.title;
  document.getElementById("eventModalDescription").textContent =
    `${selectedEvent.description} Date: ${selectedEvent.date}. Venue: ${selectedEvent.venue}.`;
  document.getElementById("eventModalGenre").textContent = selectedEvent.genre;
});

// Form validation and visible confirmation on the registration page.
const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const eventChoice = document.getElementById("eventChoice");
    const tickets = document.getElementById("tickets");
    const agree = document.getElementById("agree");
    const formMessage = document.getElementById("formMessage");

    // Custom checks supplement the browser's built-in form validation.
    const ticketCount = Number(tickets.value);
    tickets.setCustomValidity(ticketCount >= 1 && ticketCount <= 5 ? "" : "Choose 1 to 5 places.");

    if (!registrationForm.checkValidity()) {
      registrationForm.classList.add("was-validated");
      formMessage.className = "alert alert-danger mt-4";
      formMessage.textContent = "Please review the highlighted fields and correct the information.";
      return;
    }

    const registration = {
      name: fullName.value.trim(),
      email: email.value.trim(),
      event: eventChoice.value,
      places: ticketCount,
      confirmed: agree.checked
    };

    formMessage.className = "alert alert-success mt-4";
    formMessage.textContent = `Thank you, ${registration.name}! Your request for ${registration.places} place(s) at ${registration.event} has been recorded in this demo.`;
    registrationForm.reset();
    registrationForm.classList.remove("was-validated");

    // Bootstrap Toast component provides a second confirmation message.
    const toastElement = document.getElementById("successToast");
    if (toastElement) bootstrap.Toast.getOrCreateInstance(toastElement).show();
  });
}

// jQuery interaction: add a subtle highlight to the current page's active navigation link.
$(function () {
  $(".navbar .nav-link.active").attr("aria-current", "page");
});
