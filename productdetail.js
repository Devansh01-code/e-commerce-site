// ========== Load Product Images ==========
const imgContainer = document.querySelector(".image-container");

const params = new URLSearchParams(window.location.search);
const imgSrc = params.get("img");
const decodedImg = decodeURIComponent(imgSrc);

if (imgSrc && imgContainer) {
  imgContainer.innerHTML = `
    <div class="main-image">
      <img id="mainimg" src="${decodedImg}" alt="Product Image">
    </div>
    <div class="thumbnail-row">
      <img class="thumbnail" src="${decodedImg}" alt="">
      <img class="thumbnail" src="images/f2.jpg" alt="">
      <img class="thumbnail" src="images/f3.jpg" alt="">
      <img class="thumbnail" src="images/f4.jpg" alt="">
    </div>
  `;
}

// ========== Change Main Image on Thumbnail Click ==========
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("thumbnail")) {
    const mainImg = document.getElementById("mainimg");
    if (mainImg) {
      mainImg.src = e.target.src;
    }
  }
});

// ========== Add to Cart ==========
const addProductBtn = document.getElementById("addproductbtn");

if (addProductBtn) {
  addProductBtn.addEventListener("click", () => {
    const image = document.getElementById("mainimg")?.getAttribute("src");
    const name = document.querySelector(".productname")?.textContent.trim();
    const priceText = document.querySelector(".productprice")?.textContent.trim();
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    if (!image || !name || isNaN(price)) {
      alert("Some product details are missing!");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.some(item => item.Image === image);

    if (!exists) {
      cart.push({ Image: image, name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to Cart!");
      addProductBtn.disabled = true;
    } else {
      alert("Already in Cart!");
      addProductBtn.disabled = true;
    }
  });
}
