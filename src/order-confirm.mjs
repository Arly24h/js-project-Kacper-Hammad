import { setItemsToStorage } from "./src/cart.mjs";
import { getStorageToLocal } from "./src/utils.mjs";
const nameEl = document.querySelector("#js-name");
const addressEl = document.querySelector("#js-address");

document.body.addEventListener("click", (event) => {
  const target = event.target;
  if (target.href.includes("http")) {
    setItemsToStorage([]);
  }
});
const shippingInfo = getStorageToLocal("ShippingInfo");

nameEl.innerHTML = shippingInfo.name;
addressEl.innerHTML = `${shippingInfo.address}
  ${shippingInfo.city}
  ${shippingInfo.zip};`;

// addressEl.textContent = `${shippingInfo.address}
//   ${shippingInfo.city}
//   ${shippingInfo.zip}
// `;
