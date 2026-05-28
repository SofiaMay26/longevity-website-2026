let cart = JSON.parse(localStorage.getItem("cart")) || [];

// REMOVE BAD ITEMS AUTOMATICALLY
cart = cart.filter((item) => item && item.name);
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
/* =====================
   SAVE CART
===================== */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =====================
   MASTER UPDATE
===================== */
function updateCart() {
  saveCart();
  updateCartCount();
  renderCart();
  updateSubtotal();
}

/* =====================
   ADD TO CART
===================== */
function addToCart(name, price, image) {
  let cart = getCart();

  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // 🔥 refresh badge immediately
}

/* =====================
   REMOVE ITEM
===================== */
function removeItem(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCart();
}

/* =====================
   INCREASE QTY
===================== */
function increaseQty(name) {
  let item = cart.find((i) => i.name === name);
  if (item) item.qty++;

  updateCart();
}

/* =====================
   DECREASE QTY
===================== */
function decreaseQty(name) {
  let item = cart.find((i) => i.name === name);

  if (item) {
    item.qty--;

    if (item.qty <= 0) {
      cart = cart.filter((i) => i.name !== name);
    }
  }

  updateCart();
}

/* =====================
   CART COUNT BADGE
===================== */

function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const cart = getCart();

  let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  badge.textContent = totalItems;

  badge.style.display = totalItems > 0 ? "inline-block" : "none";
}

function updateSubtotal() {
  const subtotalEl = document.getElementById("subtotal");
  if (!subtotalEl) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  subtotalEl.textContent = subtotal.toLocaleString("en-PH");
}

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
                ₱${(item.price * item.qty).toLocaleString("en-PH")}
              </h4>
            </div>

          </div>
        </div>
      </div>
    `,
    )
    .join("");
}

function updateCart() {
  saveCart();
  updateCartCount();
  renderCart();
  updateSubtotal();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  updateSubtotal();
});
