import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryList = document.querySelector(".gallery");

function makeImgItem(array) {
  return array
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}
galleryList.insertAdjacentHTML("beforeend", makeImgItem(galleryItems));
galleryList.addEventListener("click", onImgClick);

const instance = basicLightbox.create(
  `
    <img src="" width="1280">
`,
  {
    onShow: (instance) => window.addEventListener("click", onImgClick),
    onClose: (instance) => window.removeEventListener("click", onImgClick),
  }
);

function onImgClick(event) {
  event.preventDefault();

  const dataSource = event.target.dataset.source;
  if (!dataSource) return;

  instance.element().querySelector("img").src = dataSource;

  instance.show();
  document.addEventListener("keydown", onEscape);
}

function onEscape(event) {
  if (event.code !== "Escape") return;
  instance.close();

  document.removeEventListener("keydown", onEscape);
}
