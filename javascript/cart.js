let cart = JSON.parse(localStorage.getItem("cart")) || [];

// REMOVE BAD ITEMS AUTOMATICALLY
cart = cart.filter((item) => item && item.name);

/* =====================
   CART CORE FUNCTIONS
===================== */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, image) {
  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  saveCart();
  updateCartCount();
  renderCart();
}

function removeItem(name) {
  cart = cart.filter((item) => item.name !== name);

  saveCart();
  updateCartCount();
  renderCart();
}

function increaseQty(name) {
  let item = cart.find((i) => i.name === name);
  if (item) item.qty++;

  saveCart();
  updateCartCount();
  renderCart();
}

function decreaseQty(name) {
  let item = cart.find((i) => i.name === name);

  if (item) {
    item.qty--;

    if (item.qty <= 0) {
      cart = cart.filter((i) => i.name !== name);
    }
  }

  saveCart();
  updateCartCount();
  renderCart();
}

/* =====================
   CART BADGE
===================== */

function updateCartCount() {
  const badge = document.getElementById("cart-count");

  if (!badge) return;

  let totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  badge.textContent = totalItems;

  badge.style.display = totalItems > 0 ? "inline-block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

/* =====================
   RENDER CART PAGE
===================== */

function renderCart() {
  const container = document.getElementById("cart-items");
  const emptyBox = document.getElementById("empty-cart");

  if (!container || !emptyBox) return;

  if (cart.length === 0) {
    container.innerHTML = "";
    emptyBox.style.display = "block";
    return;
  }

  emptyBox.style.display = "none";

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="card shadow-sm border-0 mb-3">
      <div class="card-body">
        <div class="row align-items-center">

          <div class="col-md-3">
            <img src="${item.image}" class="img-fluid rounded">
          </div>

          <div class="col-md-6">
            <h5>${item.name}</h5>

            <div class="quantity-box d-flex gap-2 align-items-center">
              <button class="btn btn-outline-secondary"
                onclick="decreaseQty('${item.name}')">−</button>

              <input type="text" value="${item.qty}" readonly
                class="form-control text-center" style="width:70px">

              <button class="btn btn-outline-secondary"
                onclick="increaseQty('${item.name}')">+</button>
            </div>

            <button class="btn btn-danger btn-sm mt-2"
              onclick="removeItem('${item.name}')">
              Remove
            </button>
          </div>

          <div class="col-md-3 text-end">
            <h4 class="text-success">
              ₱${item.price * item.qty}
            </h4>
          </div>

        </div>
      </div>
    </div>
  `,
    )
    .join("");
}
/* =====================
   INIT
===================== */

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});

function addToCart(name, price, image) {
  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // 🔥 IMPORTANT
}
