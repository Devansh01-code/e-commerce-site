// ========== Load Product Images ==========
const imgContainer = document.querySelector(".image-container");
const params = new URLSearchParams(window.location.search);

const images = params.get("images"); 
const Name = decodeURIComponent(params.get("name"));
const price = decodeURIComponent(params.get("price"));
const span = decodeURIComponent(params.get("span"));

if (images && imgContainer) {
  const decodedImgs = decodeURIComponent(images).split(","); // split into array
  const mainImg = decodedImgs[0]; // first is main

  imgContainer.innerHTML = `
    <div class="main-image">
      <img id="mainimg" src="${mainImg}" alt="Product Image">
    </div>
    <div class="thumbnail-row">
      ${decodedImgs.map(img => `<img class="thumbnail" src="${img}" alt="">`).join("")}
    </div>
  `;
}


const productname = document.querySelector(".productname");
const animename = document.querySelector(".animeName");
const productprice = document.querySelector(".price");
const pricevalue = productprice.querySelector("h1");

productname.textContent =`${Name}`;
pricevalue.textContent =`${price}`;
animename.textContent =`${span}`;

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
    const name = Name;
    const pricetext = `${price}`;
    let Price = parseFloat(pricetext.replace(/[^0-9.]/g, ""));
    if (isNaN(Price)) Price = 0;   // fallback if not valid
    

    if (!image || !name || isNaN(Price)) {
      alert("Some product details are missing!");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.some(item => item.Image === image);

    if (!exists) {
      cart.push({ Image: image, name, Price});
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to Cart!");
      addProductBtn.innerHTML=`Added Successfully`;
      addProductBtn.disabled = true;
    } else {
      alert("Already Added");
      addProductBtn.disabled = true;
    }
  });
}
