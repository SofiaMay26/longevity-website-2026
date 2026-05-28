console.log("Toolbar JS loaded");

// Navigation Bar
const topBar = document.querySelector(".top-bar");
const navbar = document.querySelector(".mega-nav");
const header = document.querySelector(".main-header");
const btn = document.querySelector(".scroll-menu-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    topBar?.classList.add("hide");
    navbar?.classList.add("hide");
    header?.classList.add("move-up");
    header?.classList.add("header-scrolled");
  } else {
    topBar?.classList.remove("hide");
    navbar?.classList.remove("hide");
    header?.classList.remove("move-up");
    header?.classList.remove("header-scrolled");
  }
});

btn?.addEventListener("click", () => {
  navbar?.classList.remove("hide");
  navbar?.classList.add("move-up");
});

const grid = document.getElementById("productGrid");

const sortSelect = document.getElementById("sortSelect");
const hideOutOfStock = document.getElementById("hideOutOfStock");
const showSelect = document.getElementById("showSelect");
const viewSelect = document.getElementById("viewSelect");

// GET COLUMNS (IMPORTANT)
function getColumns() {
  return Array.from(
    document.querySelectorAll("#productGrid .col-md-3, #productGrid .col-12"),
  );
}

// ================= SORT =================
sortSelect?.addEventListener("change", () => {
  let cards = getColumns();

  cards.sort((a, b) => {
    const aCard = a.querySelector(".product");
    const bCard = b.querySelector(".product");

    const nameA = aCard.dataset.name.toLowerCase();
    const nameB = bCard.dataset.name.toLowerCase();

    const priceA = Number(aCard.dataset.price);
    const priceB = Number(bCard.dataset.price);

    switch (sortSelect.value) {
      case "A-Z":
        return nameA.localeCompare(nameB);
      case "Z-A":
        return nameB.localeCompare(nameA);
      case "Price Low to High":
        return priceA - priceB;
      case "Price High to Low":
        return priceB - priceA;
    }
  });

  cards.forEach((col) => grid.appendChild(col));
});

// ================= OUT OF STOCK =================
hideOutOfStock?.addEventListener("change", () => {
  document.querySelectorAll(".product").forEach((card) => {
    const inStock = card.dataset.stock === "1";

    card.parentElement.style.display =
      hideOutOfStock.checked && !inStock ? "none" : "";
  });
});

// ================= SHOW LIMIT =================
showSelect?.addEventListener("change", () => {
  const limit = Number(showSelect.value);

  getColumns().forEach((col, index) => {
    col.style.display = index < limit ? "" : "none";
  });
});

// ================= VIEW MODE =================
viewSelect?.addEventListener("change", () => {
  const isList = viewSelect.value === "list";

  grid.classList.toggle("list-mode", isList);

  getColumns().forEach((col) => {
    if (isList) {
      col.classList.remove("col-md-3", "col-sm-6");
      col.classList.add("col-12");
    } else {
      col.classList.add("col-md-3", "col-sm-6");
      col.classList.remove("col-12");
    }
  });
});

// Item Page

function changeImage(el) {
  const mainImage = document.getElementById("mainProductImage");
  mainImage.src = el.src;

  // remove active class
  document.querySelectorAll(".thumb").forEach((img) => {
    img.classList.remove("active");
  });

  // set active
  el.classList.add("active");
}

// Subscription

const form = document.getElementById("newsletterForm");
const msg = document.getElementById("newsletterMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("firstName").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name === "" || email === "") {
    msg.style.color = "red";
    msg.textContent = "Please fill in all fields.";
    return;
  }

  // Fake success (frontend only)
  msg.style.color = "green";
  msg.textContent = `Thanks ${name}! You are subscribed.`;

  form.reset();
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1000);
});

// Create Account

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  console.log("JS is working"); // DEBUG

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // validation
    if (!name || !email || !password) {
      message.style.color = "red";
      message.textContent = "⚠️ Please fill in all fields.";
      return;
    }

    if (password.length < 6) {
      message.style.color = "red";
      message.textContent = "⚠️ Password must be at least 6 characters.";
      return;
    }

    message.style.color = "green";
    message.textContent = "✅ Account created successfully!";

    form.reset();
  });
});
