import { currency } from "../constants.mjs";
import { getLocalStorage, calcTotal } from "../cart.mjs";
import { createHTML, clearNode, setStorageToLocal } from "../utils.mjs";

const oderSummaryEl = document.querySelector("#js-order-summary");
const totalEll = document.querySelector("#js-total");

/** @type { HTMLFormElement} */
// const checkoutFormEl = document.forms.checkout;
const checkoutFormEl = document.querySelector("#js-checkout-form");

const cartProducts = getLocalStorage();
renderCartProduct(cartProducts);
const total = calcTotal(cartProducts);

totalEll.textContent = `${currency} ${total}`;

function renderCartProduct(list = []) {
  clearNode(oderSummaryEl);
  list.forEach((cartProduct) => {
    const cartProductTemplate = createCartProductTemplate(cartProduct);
    const cartProductEl = createHTML(cartProductTemplate);
    oderSummaryEl.append(cartProductEl);
  });
}

function createCartProductTemplate({ title, price, quantity }) {
  return `
  <div class="product">
                <p>${title} </p>
                <p>${currency} ${price} * ${quantity} </p>
              </div>
    
    
    `;
}
checkoutFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(checkoutFormEl);

  const name = formData.get("name");
  const address = formData.get("address");
  const city = formData.get("city");
  const zip = formData.get("zip");
  const payment = formData.get("payment");
  const cardNumber = formData.get("cardNumber");
  const cardName = formData.get("card-name");
  const expiry = formData.get("expiry");
  const cvv = formData.get("cvv");

  setStorageToLocal("ShippingInfo", { name, address, city, zip });

  try {
    const response = await sendToApi({
      name: name,
      address: address,
      city: city,
      zip: zip,
      payment: payment,
      cardNumber: cardNumber,
      cardName: cardName,
      expiry: expiry,
      cvv: cvv,
    });
  } catch (error) {
    console.error(error?.message);
  }

  window.location = "/order-confirm.html";
});

async function sendToApi(details) {
  alert(JSON.stringify(details));
  return "Success";
}
