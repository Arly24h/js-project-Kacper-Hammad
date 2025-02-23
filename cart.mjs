import { createHTML, clearNode } from "./utils.mjs";

const cartToggleBtnEl = document.querySelector("#js-cart-toggle");
const cartEl = document.querySelector("#js-cart");
const cartCloseBtnEl = document.querySelector("#js-close-cart");
const clearCartBtnEl = document.querySelector("#js-clear-cart");
const cartItemsEl = document.querySelector("#js-cart-items");
const totalEl = document.querySelector("#js-cart-total");
const cartCounterEl = document.querySelector("#js-cart-count");

setup();

function setup() {
  if (
    !cartToggleBtnEl ||
    !cartEl ||
    !cartCloseBtnEl ||
    !clearCartBtnEl ||
    !totalEl ||
    !cartCounterEl ||
    !cartItemsEl
  ) {
    // alert("Js cannot run !!!");
    console.error("Elements are not avalible");
    // return;
  } else {
    cartToggleBtnEl.addEventListener("click", toggleCartDisplay);
    cartCloseBtnEl.addEventListener("click", toggleCartDisplay);
    clearCartBtnEl.addEventListener("click", clearCart);

    const products = getLocalStorage();
    renderCartItems(products);
  }
}

export function addToCart({ id, imgUrl, price, title, quantity = 1 }) {
  const products = getLocalStorage();
  const foundProductIndex = products.findIndex((item) => {
    return item.id === id;
  });
  if (foundProductIndex === -1) {
    products.push({
      id,
      title,
      imgUrl,
      quantity: quantity,
      price,
    });
  } else {
    products[foundProductIndex].quantity += quantity;
  }

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
    const subTotal = (price * quantity).toFixed(2);
    const template = cartItemTemplate({
      id,
      imgUrl,
      title,
      price,
      quantity,
      subTotal,
    });
    const productItemEl = createHTML(template);
    const removeBtnEl = productItemEl.querySelector('[data-btn="remove"]');
    const increaseBtnEl = productItemEl.querySelector(
      '[data-btn="increaseQuantity"]'
    );
    const decreaseBtnEl = productItemEl.querySelector(
      '[data-btn="decreaseQuantity"]'
    );

    removeBtnEl.addEventListener("click", (event) => {
      removeProductItem(items, event.target.id);
    });

    increaseBtnEl.addEventListener("click", (event) => {
      increaseQuantity(items, event.target.dataset.id);
    });

    decreaseBtnEl.addEventListener("click", (event) => {
      decreaseQuantity(items, event.target.dataset.id);
    });

    cartItemsEl.appendChild(productItemEl);
  });

  const total = calcTotal(items);
  renderCount(items, cartCounterEl);
  renderTotal(total, totalEl);
}

function clearCart() {
  setLocalStorage([]);
  renderCartItems([]);
}

function toggleCartDisplay() {
  cartEl.classList.toggle("is-open");
}

export function setLocalStorage(items = []) {
  window.localStorage.setItem("cart", JSON.stringify(items));
}
export function getLocalStorage() {
  return JSON.parse(window.localStorage.getItem("cart")) || [];
}

function removeProductItem(items = [], selectedItemId) {
  const filteredItems = items.filter((i) => i.id !== selectedItemId);
  setLocalStorage(filteredItems);

  renderCartItems(filteredItems);
}

export function calcTotal(items = []) {
  let newTotal = 0;

  if (items.length > 0) {
    newTotal = items.reduce(
      (total, item) => item.quantity * item.price + total,
      0
    );
  } else {
    return 0;
  }

  return newTotal.toFixed(2);
}

function renderTotal(val, el) {
  el.textContent = val;
}

function increaseQuantity(items = [], id) {
  const foundIndex = items.findIndex((item) => item.id === id);
  if (foundIndex === -1) {
    return;
  }

  items[foundIndex].quantity++;

  setLocalStorage(items);
  renderCartItems(items);
}

function decreaseQuantity(items = [], id) {
  const foundIndex = items.findIndex((item) => item.id === id);
  let newItems = [];

  if (foundIndex === -1) {
    return;
  }

  items[foundIndex].quantity--;

  if (items[foundIndex].quantity <= 0) {
    newItems = items.filter((i) => i.id !== items[foundIndex].id);
  } else {
    newItems = items;
  }

  setLocalStorage(newItems);
  renderCartItems(newItems);
}
function renderCount(items = [], el) {
  const newCount = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  el.innerHTML = newCount;
  if (newCount === 0) {
    cartCounterEl.style.display = "none";
  } else {
    cartCounterEl.style.display = "block";
  }
}
