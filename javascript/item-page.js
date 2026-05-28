function changeImage(el) {
  const mainImage = document.getElementById("mainProductImage");

  // change main image
  mainImage.src = el.src;

  // active class switch
  const thumbs = document.querySelectorAll(".thumb");
  thumbs.forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
}

const qtyInput = document.querySelector(".quantity-box input");
const minusBtn = document.querySelector(".quantity-box .qty-btn:nth-child(1)");
const plusBtn = document.querySelector(".quantity-box .qty-btn:nth-child(3)");

minusBtn.addEventListener("click", () => {
  let value = parseInt(qtyInput.value);
  if (value > 1) {
    qtyInput.value = value - 1;
  }
});

plusBtn.addEventListener("click", () => {
  let value = parseInt(qtyInput.value);
  qtyInput.value = value + 1;
});

let cartCount = 0;

const cartButtons = document.querySelector(".btn-cart");

cartButtons.addEventListener("click", () => {
  const qty = parseInt(document.querySelector(".quantity-box input").value);

  cartCount += qty;

  alert(`Added ${qty} item(s) to cart!`);
  console.log("Cart total:", cartCount);
});

document.querySelector(".btn-buy").addEventListener("click", () => {
  const qty = document.querySelector(".quantity-box input").value;

  alert("Proceeding to checkout...");

  // Example redirect (change this to your checkout page)
  window.location.href = "checkout.html?qty=" + qty;
});
