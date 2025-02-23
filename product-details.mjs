import { api_Url, error_message_default, currency } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";
// import { addToCart} from "./cart.mjs";
const containerEl = document.querySelector("#js-product-details");

setup();

function setup() {
  if (!containerEl) {
    alert("JS cannot run!");
  } else {
    const parameterString = window.location.search;
    const searchParameters = new URLSearchParams(parameterString);
    const id = searchParameters.get("id");
    fetchProductDetails(id);
  }
}
async function fetchProductDetails(productId) {
  if (!productId) {
    throw new Error("Product ID was not supplied");
  }
  try {
    const response = await fetch(`${api_Url}/${productId}`);
    const { data } = await response.json();
    const { image, title, price, description } = data;
    const template = detailsTemplates({
      primaryImgUrl: image.url,
      alt: image.alt,
      title,
      price,
      description,
    });
    const detailsEl = createHTML(template);
    clearNode(containerEl);
    containerEl.append(detailsEl);
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
}
function detailsTemplates({
  primaryImgUrl = "https://placehold.co/400x450",
  title = "unknown Product",
  price = 0,
  description = "This product does not have a discription",
  alt = "No description present",
}) {
  return `

  <article>
              <div class="product-images">
                <img
                  src=${primaryImgUrl}
                  alt= ${alt}
                  class="main-image"
                />
              </div>
              <div class="product-info">
                <h2>${title}</h2>
                <p class="price">${price} ${currency}</p>
                <p class="description">${description}</p>
                <form class="purchase-options" name = "addToCartForm">
                  <input name="id" value="${id}" hidden/>
                  <input name="imgUrl" value="${primaryImgUrl}" hidden/>
                  <input name="price" value="${price}" hidden/>
                  <input name="title" value="${title}" hidden/>
                  <label for="size">Size:</label>
                  <select id="size" name="size">
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                    <option value="xl">XL</option>
                    </select>
                    
                    <label for="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value="1"
                    />
                    <button type="submit" class="add-to-cart">Add to Cart</button>
                </form>
              </div>
          </article>

  
  
  
  
  `;
}
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  addToCart({
    // id: getIdFromUrl(),
    id: formData.get("id"),
    imgUrl: formData.get("imgUrl"),
    title: formData.get("title"),
    price: formData.get("price"),
    quantity: Number(formData.get("quantity")),
  });
}
