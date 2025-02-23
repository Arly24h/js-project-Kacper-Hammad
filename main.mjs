import { api_Url, error_message_default, currency } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";
const containerEl = document.querySelector("#js-products");
const sortByEl = document.querySelector("#js-sort-by");
const searchInputEl = document.querySelector("#search");

let products = [];
if (!containerEl || !sortByEl) {
  console.error("JavaScript is not working");
} else {
  setup();
}

function setup() {
  getProduct();
}

// sort-by

sortByEl.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val === "asc") {
    sortByAccending();
  } else if (val === "dec") {
    sortByDecending();
  } else if (val === "none") {
    location.reload();
  }
  renderProductList(products);
});

async function getProduct() {
  clearNode(containerEl);
  try {
    const response = await fetch(api_Url);
    const { data } = await response.json();
    products = data;
    window.localStorage.setItem("products", JSON.stringify(products));
    renderProductList(products);
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
}
function productTemplate({
  id,
  title,
  imgUrl,
  imgAl,
  price,
  description,
  index,
}) {
  const detailsUrl = `product-details.html?id=${id}`;
  return `
  <article class="product-details animate__animated animate__fadeInUp animate__delay-${index}s">
      <div class="product-image">
        <a href =${detailsUrl}>
        <img src="${imgUrl}" alt="${imgAl}" />
        </a>
      </div

      <div class="c-product-preview-info">
        <h1 class="c-product-preview-title">
         <a href = ${detailsUrl}> ${title}</a>
        </h1>


      <div class="product-info">
        <h1 class="product-title">${title}</h1>
        <div class="product-rating">
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9734;</span>
          <span>(123 reviews)</span>
        </div>
        <div class="product-price">${price} ${currency}</div>
        <div class="product-description">
          <p>
            ${description}
          </p>
        </div>
        <button class="add-to-cart" id="js-add-to-cart-${id}">Add to Cart</button>
      </div>
    </article>
      
      `;
}
function sortByAccending() {
  products.sort((a, b) => {
    return a.price - b.price;
  });
}
function sortByDecending() {
  products.sort((a, b) => {
    return b.price - a.price;
  });
}

function renderProductList(products) {
  clearNode(containerEl);
  products.forEach(({ id, title, image, price, description }) => {
    const template = productTemplate({
      id,
      title,
      imgUrl: image.url,
      imgAl: image.alt,
      price,
      description,
    });
    const newEl = createHTML(template);
    containerEl.append(newEl);
  });
}

searchInputEl.addEventListener("input", (event) => {
  const val = event.target.value;
  const products = JSON.parse(window.localStorage.getItem("products"));
  if (!Array.isArray(products)) {
    alert("Invalid product data in localStorage");
    return;
  }
  const searchedProduct = products.filter((product) => {
    return product.title.toLowerCase().includes(val.trim().toLowerCase());
  });
  renderProductList(searchedProduct);
});
