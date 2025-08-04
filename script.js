// ========== Mobile Menu Toggle ==========
const hamburger = document.querySelector(".mobile");
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
let isopen = false;

hamburger.addEventListener("click", () => {
  isopen = !isopen;
  if (isopen) {
    nav.classList.add("active");
    bar.src = "images/close.svg";
  } else {
    nav.classList.remove("active");
    bar.src = "images/hamburger.svg";
  }
});

// ========== Product Click Handler ==========
const products = document.querySelectorAll(".pro");
products.forEach(product => {
  const img = product.querySelector("img");
  product.addEventListener("click", () => {
    const imgsrc = img.getAttribute("src");
    const encodeimg = encodeURIComponent(imgsrc);
    window.location.href = `product-details.html?img=${encodeimg}`;
  });
});



// ========== Cart Load from localStorage ==========
const cartitem = document.querySelector("#cart table tbody"); 
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

cartItems.forEach(item => {
  cartitem.insertAdjacentHTML("beforeend", `
  <tr>
      <td><i class="far fa-times-circle deleteitem"></i></td>
      <td><img src="${item.Image}" alt=""></td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" value="1"></td>
      <td>$${item.price.toFixed(2)}</td>
    </tr>
    `);
});

// ========== Delete Cart Item ==========
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteitem")) {
    const row = e.target.closest("tr");
    const imageSrc = row.querySelector("img").getAttribute("src");

    // Remove row from DOM
    row.remove();
    
    // Update localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.Image !== imageSrc);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});


const explorebtn = document.getElementById("explorebtn");

explorebtn.onclick=function(){
  window.location.href ="shop.html";
}
