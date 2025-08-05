
// const hamburger = document.querySelector(".mobile");
// const bar = document.getElementById("bar");
// const nav = document.getElementById("navbar");

// let isOpen = false;

// hamburger.addEventListener("click", () => {
//   isOpen = !isOpen;

//   if (isOpen) {
//     nav.classList.add("active");
//     bar.src = "images/close.svg";
//   } else {
//     nav.classList.remove("active");
//     bar.src = "images/hambuger.svg";
//   }
// });

// const products = document.querySelectorAll(".pro");

// products.forEach(product => {
//   const img = product.querySelector("img");
//   const Name = product.querySelector("h4").textContent;
//   const price = product.querySelector("p").textContent;


//   product.addEventListener("click", () => {
//     const imgSrc = img.getAttribute("src");

//     const encodedImg = encodeURIComponent(imgSrc);
//     const encodedname = encodeURIComponent(Name);
//     const encodedprice = encodeURIComponent(price);
//     window.location.href = `product-details.html?img=${encodedImg}&name=${encodedname}&price=${encodedprice}`;
//   });
// });


// const cartBody = document.querySelector("#cart table tbody");
// const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// const cartcal = document.getElementById("subtotal");
// const cartsubtotal = document.getElementById("cartsubtotal");
// const shippingcharges = document.getElementById("shippingcharges");
// const grandtotal = document.getElementById("total");


// cartItems.forEach(item => {
//   if(cartBody){
//     cartBody.insertAdjacentHTML("beforeend", `
//     <tr>
//     <td><i class="far fa-times-circle deleteitem"></i></td>
//     <td><img src="${item.Image}" alt="Product Image"></td>
//     <td>${item.name}</td>
//     <td>₹${item.price.toLocaleString("en-IN")}</td>
//     <td><input type="number" value="1" class="quantity"></td>
//     <td class="subtotal">₹${item.price.toLocaleString("en-IN")}</td>
//     </tr>
//     `);
//   }
//   let quantityinput = document.querySelectorAll(".quantity");
  
//   quantityinput.forEach(quantity =>{
//     quantity.addEventListener("input",()=>{
//       const newvalue = quantity.value;
//       const subtotalrow = quantity.closest("tr");
//       const subtotal = subtotalrow.querySelector(".subtotal")
//      subtotal.textContent = parseInt(newvalue*item.price).toLocaleString("en-In"));
//     })
    
//     cartsubtotal.textContent = subtotal;
//     grandtotal.textContent = subtotal+99;
//   })


// });


// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("deleteitem")) {
//     const row = e.target.closest("tr");
//     const imgSrc = row.querySelector("img").getAttribute("src");
//     row.remove();
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart = cart.filter(item => item.Image !== imgSrc);
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }
// });


// const exploreBtn = document.getElementById("explorebtn");

// if (exploreBtn) {
//   exploreBtn.onclick = function () {
//     window.location.href = "shop.html";
//   };
// }

// const applycoupon = document.getElementById("applycoupon");

// applycoupon.addEventListener("click", ()=>{
//  alert("Invalid Code") 
// })
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
    bar.src = "images/hambuger.svg";
  }
});

const products = document.querySelectorAll(".pro");

products.forEach(product => {
  const img = product.querySelector("img");
  const Name = product.querySelector("h4").textContent;
  const price = product.querySelector("p").textContent;

  product.addEventListener("click", () => {
    const imgSrc = img.getAttribute("src");
    const encodedImg = encodeURIComponent(imgSrc);
    const encodedname = encodeURIComponent(Name);
    const encodedprice = encodeURIComponent(price);
    window.location.href = `product-details.html?img=${encodedImg}&name=${encodedname}&price=${encodedprice}`;
  });
});

const cartBody = document.querySelector("#cart table tbody");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartsubtotal = document.querySelector("#cartsubtotal + td");
const shippingcharges = document.querySelector("#shippingcharges + td");
const grandtotal = document.querySelector("#total + td");

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
    const shipping = parseFloat(shippingcharges.textContent.replace(/[^0-9.]/g, "")) || 0;
    grandtotal.textContent = `₹${(subtotalSum + shipping).toLocaleString("en-IN")}`;
  }
}

cartItems.forEach(item => {
  if (cartBody) {
    cartBody.insertAdjacentHTML("beforeend", `
      <tr>
        <td><i class="far fa-times-circle deleteitem"></i></td>
        <td><img src="${item.Image}" alt="Product Image"></td>
        <td>${item.name}</td>
        <td>₹${item.price.toLocaleString("en-IN")}</td>
        <td><input type="number" value="1" class="quantity"></td>
        <td class="subtotal">₹${item.price.toLocaleString("en-IN")}</td>
      </tr>
    `);
  }
});

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

    const newSubtotal = quantity * item.price;
    subtotalCell.textContent = `₹${newSubtotal.toLocaleString("en-IN")}`;

    calculateTotals();
  });
});

calculateTotals();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteitem")) {
    const row = e.target.closest("tr");
    const imgSrc = row.querySelector("img").getAttribute("src");
    row.remove();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.Image !== imgSrc);
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
