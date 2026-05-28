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

// Sort //

document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");

  const sortSelect = document.getElementById("sortSelect");
  const hideOutOfStock = document.getElementById("hideOutOfStock");
  const showSelect = document.getElementById("showSelect");
  const viewSelect = document.getElementById("viewSelect");

  function updateProducts() {
    let products = Array.from(productGrid.children);

    // SORT
    products.sort((a, b) => {
      const cardA = a.querySelector(".deal-card");
      const cardB = b.querySelector(".deal-card");

      const nameA = cardA.dataset.name;
      const nameB = cardB.dataset.name;

      const priceA = Number(cardA.dataset.price);
      const priceB = Number(cardB.dataset.price);

      switch (sortSelect.value) {
        case "A-Z":
          return nameA.localeCompare(nameB);

        case "Z-A":
          return nameB.localeCompare(nameA);

        case "Price Low to High":
          return priceA - priceB;

        case "Price High to Low":
          return priceB - priceA;

        default:
          return 0;
      }
    });

    // Reorder cards
    products.forEach((product) => {
      productGrid.appendChild(product);
    });

    // Hide/Show products
    const limit = Number(showSelect.value);
    let visibleCount = 0;

    products.forEach((product) => {
      const card = product.querySelector(".deal-card");

      if (hideOutOfStock.checked && card.dataset.stock === "out") {
        product.style.display = "none";
        return;
      }

      visibleCount++;

      if (visibleCount <= limit) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }
    });

    // Grid/List View
    products.forEach((product) => {
      const card = product.querySelector(".deal-card");

      if (viewSelect.value === "list") {
        product.className = "col-12";
        card.classList.add("list-view");
      } else {
        product.className = "col-xl-3 col-lg-4 col-md-6 col-12";
        card.classList.remove("list-view");
      }
    });
  }

  sortSelect.addEventListener("change", updateProducts);
  hideOutOfStock.addEventListener("change", updateProducts);
  showSelect.addEventListener("change", updateProducts);
  viewSelect.addEventListener("change", updateProducts);

  updateProducts();
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Toolbar JS loaded");

  const productGrid = document.getElementById("productGrid");
  console.log("productGrid:", productGrid);

  const sortSelect = document.getElementById("sortSelect");
  console.log("sortSelect:", sortSelect);
});
