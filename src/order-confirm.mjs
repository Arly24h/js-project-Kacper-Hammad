import { setLocalStorage } from "../cart.mjs";
import { getStorageToLocal } from "../utils.mjs";
const nameEl = document.querySelector("#js-name");
const addressEl = document.querySelector("#js-address");

document.body.addEventListener("click", (event) => {
  const target = event.target;
  if (target.href.includes("http")) {
    setLocalStorage([]);
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
