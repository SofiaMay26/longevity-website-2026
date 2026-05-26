// Navigation Bar

window.addEventListener("scroll", function () {
  const topBar = document.querySelector(".top-bar");

  if (window.scrollY > 50) {
    topBar.classList.add("scrolled");
  } else {
    topBar.classList.remove("scrolled");
  }
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
