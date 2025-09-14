
const hamburger = document.querySelector(".mobile");
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

let isOpen = false;

hamburger.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    nav.classList.add("active");
    bar.src = "images/close.svg";
  } else {
    nav.classList.remove("active");
    bar.src = "images/hamburger.svg";
  }
});

// Product Click Redirect
const products = document.querySelectorAll(".pro");

products.forEach(product => {
  const images = product.getAttribute("data-images");
  const Name = product.querySelector("h4").textContent;
  const price = product.querySelector("p").textContent;
  const span = product.querySelector("span").textContent;

  product.addEventListener("click", () => {
    const encodedImgs = encodeURIComponent(images);
    const encodedName = encodeURIComponent(Name);
    const encodedPrice = encodeURIComponent(price);
    const encodedspan = encodeURIComponent(span);
    
    window.location.href = `product-details.html?images=${encodedImgs}&name=${encodedName}&price=${encodedPrice}&span=${encodedspan}`;
  });
});

//Cart
const cartBody = document.querySelector("#cart table tbody");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartsubtotal = document.querySelector("#cartsubtotal + td");
const shippingcharges = document.querySelector("#shippingcharges + td");
const grandtotal = document.querySelector("#total + td");

// --- Calculating Totals ---
function calculateTotals() {
  const subtotals = document.querySelectorAll(".subtotal");
  let subtotalSum = 0;

  subtotals.forEach(cell => {
    const value = parseFloat(cell.textContent.replace(/[^0-9.]/g, ""));
    subtotalSum += isNaN(value) ? 0 : value;
  });

  localStorage.setItem("subtotal", subtotalSum);

  if (cartsubtotal && grandtotal) {
    cartsubtotal.textContent = `₹${subtotalSum.toLocaleString("en-IN")}`;
    const shipping = parseInt(shippingcharges.textContent.replace(/[^0-9]/g, "")) || 0;
    grandtotal.textContent = `₹${(subtotalSum + shipping).toLocaleString("en-IN")}`;
  }
}



cartItems.forEach((item, index) => {
  if (cartBody) {
    const itemPrice = Number(item.Price) || 0;
    const quantity = Number(item.Quantity) || 1;
    const subtotal = itemPrice * quantity;

    cartBody.insertAdjacentHTML("beforeend", `
      <tr>
        <td><i class="far fa-times-circle deleteitem"></i></td>
        <td><img src="${item.Image}" alt="Product Image"></td>
        <td>${item.name}</td>
        <td>₹${itemPrice.toLocaleString("en-IN")}</td>
        <td><input type="number" value="${quantity}" class="quantity"></td>
        <td class="subtotal">₹${subtotal.toLocaleString("en-IN")}</td>
      </tr>
    `);
  }
});

// --- Updating Quantity ---
document.querySelectorAll(".quantity").forEach((quantityInput, index) => {
  quantityInput.addEventListener("input", () => {
    const row = quantityInput.closest("tr");
    const subtotalCell = row.querySelector(".subtotal");
    const item = cartItems[index];
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
      quantityInput.value = 1;
      return;
    }

    const itemPrice = Number(item.Price) || 0;
    const newSubtotal = quantity * itemPrice;
    subtotalCell.textContent = `₹${newSubtotal.toLocaleString("en-IN")}`;

    cartItems[index].Quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cartItems));

    calculateTotals();
  });
});

// --- Initial Totals ---
calculateTotals();

// --- Delete Item ---
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteitem")) {
    const row = e.target.closest("tr");
    const imgSrc = row.querySelector("img").getAttribute("src");
    const productName = row.querySelector("td:nth-child(3)").textContent;

    row.remove();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => !(item.Image === imgSrc && item.name === productName));
    localStorage.setItem("cart", JSON.stringify(cart));

    calculateTotals();
  }
});

const exploreBtn = document.getElementById("explorebtn");

if (exploreBtn) {
  exploreBtn.onclick = function () {
    window.location.href = "shop.html";
  };
}


const applycoupon = document.getElementById("applycoupon");

if (applycoupon) {
  applycoupon.addEventListener("click", () => {
    alert("Invalid Code"); 
  });
}

document.getElementById("orderplacedbtn").addEventListener("click", () => {
  const overlay = document.createElement("div");
overlay.className = "order-overlay";

const card = document.createElement("div");
card.className = "order-card";

card.innerHTML = `
  <div class="icon">
    <svg fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="white" width="36" height="36">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
  <h2>Order Placed</h2>
  <p>Your order has been placed successfully.</p>
`;

overlay.appendChild(card);
document.body.appendChild(overlay);

// Show popup
overlay.style.display = "flex";

// After 2.5s → remove popup + clear cart
setTimeout(() => {
  overlay.remove();

  // Clear localStorage cart
  localStorage.removeItem("cart");

  // Clear cart table from DOM (if present)
  const cartBody = document.querySelector("#cart table tbody");
  if (cartBody) {
    cartBody.innerHTML = "";
  }

  // Reset totals
  const cartsubtotal = document.querySelector("#cartsubtotal + td");
  const grandtotal = document.querySelector("#total + td");
  if (cartsubtotal) cartsubtotal.textContent = "₹0";
  if (grandtotal) grandtotal.textContent = "₹0";
}, 2500);
});
