import { createHTML, clearNode } from "./utils.mjs";

const cartToggleBtnEl = document.querySelector("#js-cart-toggle");
const cartEl = document.querySelector("#js-cart");
const cartCloseBtnEl = document.querySelector("#js-close-cart");
const cartItemsEl = document.querySelector("#js-cart-items");
const clearCartBtnEl = document.querySelector("#js-clear-cart");

setup();

function setup() {
  if (!cartCloseBtnEl || !cartEl || !cartCloseBtnEl || !clearCartBtnEl) {
    alert("Js cannot run !!!");
  } else {
    cartToggleBtnEl.addEventListener("click", toggleCartDisplay);
    cartCloseBtnEl.addEventListener("click", toggleCartDisplay);
    clearCartBtnEl.addEventListener("click", clearCart);

    const products = getLocalStorage();

    renderCartItems(products);
  }
}

export function toggleCartDisplay() {
  cartEl.classList.toggle("is-open");
}

export function addToCart({ id, imgUrl, price, title }) {
  const products = getLocalStorage();
  products.push({
    id,
    title,
    imgUrl,
    price,
    // quantity,
  });

  setLocalStorage(products);
  renderCartItems(products);
}

function cartItemTemplate({
  imgUrl = "",
  alt = "No alt is provided",
  title = "unknown",
  price = 0,
  id,
  quantity = 1,
  subTotal = price,
}) {
  return `
   <div class="c-cart-item">
    <section class="c-cart-item_row-first">
    
    <a href="/product-details.html?id=${id}">
      <img src="${imgUrl}" alt="${alt}" />
    </a>
    
    <h4>${title}</h4>
    
    <strong class="c-cart-item_price">${price}</strong>
    
    <p class="c-cart-item_quantity-total">(${subTotal})</p>
    
    </section>

    <section class="c-cart-item_controls">
      <button class="c-cart-item_remove" data-btn="remove" id="${id}">Remove</button>

      <div class="c-cart-item_quantity-container">
        <button class="c-cart-item_remove" data-btn="decreaseQuantity" data-id="${id}">-</button>
        
        <p class="c-cart-item_quantity">${quantity}</p>
        
        <button class="c-cart-item_remove" data-btn="increaseQuantity" data-id="${id}">+</button>
      </div>
    </section>
   </div>
    
    `;
}
function renderCartItems(items = []) {
  clearNode(cartItemsEl);
  items.forEach(({ id, imgUrl, title, price, quantity }) => {
    const template = cartItemTemplate({
      id,
      imgUrl,
      title,
      price,
      quantity,
    });
    const productItemEl = createHTML(template);
    cartItemsEl.appendChild(productItemEl);
  });
}
function clearCart() {
  setLocalStorage([]);
  renderCartItems([]);
}

function setLocalStorage(items = []) {
  window.localStorage.setItem("cart", JSON.stringify(items));
}
function getLocalStorage() {
  return JSON.parse(window.localStorage.getItem("cart")) || [];
}
