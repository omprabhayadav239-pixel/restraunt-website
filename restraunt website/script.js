const menuTabs = document.querySelectorAll(".menu-tab");
const dishCards = document.querySelectorAll(".dish-card");

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;
    menuTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    dishCards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});

const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);
dateInput.min = localToday;

const reservationForm = document.querySelector("#reservation-form");
const formMessage = document.querySelector("#form-message");

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;

  const formData = new FormData(reservationForm);
  const guestName = formData.get("name").trim();
  const guests = formData.get("guests");
  const date = new Date(`${formData.get("date")}T00:00:00`);
  const formattedDate = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  formMessage.textContent = `Thanks, ${guestName}! Your table request for ${guests} on ${formattedDate} is ready. We’ll be in touch to confirm.`;
  reservationForm.reset();
  dateInput.min = localToday;
});
