export function createHTML(template) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(template, "text/html");
  return parsedDocument.body.firstChild;
}

export function clearNode(el) {
  el.innerHTML = "";
}

export function setStorageToLocal(key = "", value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
export function getStorageToLocal(key = "") {
  return JSON.parse(window.localStorage.getItem(key));
}
