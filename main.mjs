import { api_Url, error_message_default, currency } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";
const containerEl = document.querySelector("#js-products");

let products = [];
if (!containerEl) {
  console.error("JavaScript is not working");
} else {
  setup();
}

function setup() {
  getProduct();
}

async function getProduct() {
  clearNode(containerEl);
  try {
    const response = await fetch(api_Url);
    const { data } = await response.json();
    products = data;
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
  return `
  <article class="product-details animate__animated animate__fadeInUp animate__delay-${index}s">
      <div class="product-image">
        
        <img src="${imgUrl}" alt="${imgAl}" />
       
     
      </div

      <div class="c-product-preview-info">
        <h1 class="c-product-preview-title">
          ${title}
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
function renderProductList(products) {
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
