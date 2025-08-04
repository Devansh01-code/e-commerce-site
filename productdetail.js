
let imgcontainer = document.querySelector(".image-container");

const params = new URLSearchParams(window.location.search);
const imgsrc = params.get('img');
const img = decodeURIComponent(imgsrc);

if (imgsrc && imgcontainer) {
    imgcontainer.innerHTML = `
        <div class="main-image">
            <img id="mainimg" src="${img}" alt="">
        </div>

        <div class="thumbnail-row">
            <img class="thumbnail" src="${img}" alt="">
            <img class="thumbnail" src="images/f2.jpg" alt="">
            <img class="thumbnail" src="images/f3.jpg" alt="">
            <img class="thumbnail" src="images/f4.jpg" alt="">
        </div>
    `;
}

// =======================
// Thumbnail switching
// =======================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("thumbnail")) {
        const mainImg = document.getElementById("mainimg");
        mainImg.src = e.target.src;
    }
});

// =======================
// Add to cart button
// =======================
const addProductBtn = document.getElementById("addproductbtn");

addProductBtn.addEventListener("click", () => {
    const Image = document.getElementById("mainimg").getAttribute("src");
    const name = document.querySelector(".productname").textContent.trim();
    const price = parseFloat(document.querySelector(".productprice").textContent.replace("$", "").trim());

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.some(item => item.Image === Image);

    if (!exists) {
        cart.push({ Image, name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to Cart!");
        addProductBtn.disabled = true;
    } else {
        alert("Added to Cart!");
        addProductBtn.disabled = true;
    }
});
