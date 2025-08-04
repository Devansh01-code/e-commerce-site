
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

  product.addEventListener("click", () => {
    const imgSrc = img.getAttribute("src");
    const encodedImg = encodeURIComponent(imgSrc);
    window.location.href = `product-details.html?img=${encodedImg}`;
  });
});


const cartBody = document.querySelector("#cart table tbody");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

cartItems.forEach(item => {
  if(cartBody){
    cartBody.insertAdjacentHTML("beforeend", `
    <tr>
    <td><i class="far fa-times-circle deleteitem"></i></td>
    <td><img src="${item.Image}" alt="Product Image"></td>
    <td>${item.name}</td>
    <td>₹${item.price.toLocaleString("en-IN")}</td>
    <td><input type="number" value="1"></td>
    <td>₹${item.price.toLocaleString("en-IN")}</td>
    </tr>
    `);
  }
});


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteitem")) {
    const row = e.target.closest("tr");
    const imgSrc = row.querySelector("img").getAttribute("src");
    row.remove();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.Image !== imgSrc);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});


const exploreBtn = document.getElementById("explorebtn");

if (exploreBtn) {
  exploreBtn.onclick = function () {
    window.location.href = "shop.html";
  };
}

// const alllinks = document.getElementsByTagName("a");
// for(let i=0; i< alllinks.length; i++){
//   alllinks[i].addEventListener("click", (e)=>{
//     e.preventDefault();
//   })

// }