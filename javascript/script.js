// Navigation Bar

const topBar = document.querySelector(".top-bar");
const navbar = document.querySelector(".mega-nav");
const header = document.querySelector(".main-header");
const btn = document.querySelector(".scroll-menu-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    topBar.classList.add("hide");
    navbar.classList.add("hide");
    header.classList.add("move-up");
    header.classList.add("header-scrolled");
  } else {
    topBar.classList.remove("hide");
    navbar.classList.remove("hide");
    header.classList.remove("move-up");
    header.classList.remove("header-scrolled");
  }
});

btn.addEventListener("click", () => {
  navbar.classList.remove("hide");
  navbar.classList.add("move-up");
});

// Countdown Banner

const saleEndDate = new Date("May 27, 2026 23:59:59").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = saleEndDate - now;

  if (distance < 0) {
    clearInterval(timer);
    document.querySelector(".timer").innerHTML = "<h3>SALE ENDED</h3>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.innerText = days;
  hoursEl.innerText = hours;
  minutesEl.innerText = minutes;
  secondsEl.innerText = seconds;
}, 1000);
