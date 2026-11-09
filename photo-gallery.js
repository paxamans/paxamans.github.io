const viewer = document.createElement("dialog");
viewer.className = "photo-viewer";
viewer.innerHTML = `
    <button class="photo-viewer-nav photo-viewer-previous" type="button" aria-label="Previous photo">‹</button>
    <button class="photo-viewer-close" type="button" aria-label="Close photo">×</button>
    <figure>
        <img alt="">
        <figcaption aria-live="polite"></figcaption>
    </figure>
    <button class="photo-viewer-nav photo-viewer-next" type="button" aria-label="Next photo">›</button>
`;
document.body.append(viewer);

const viewerImage = viewer.querySelector("img");
const viewerCaption = viewer.querySelector("figcaption");
const photos = [...document.querySelectorAll("details img, .photo-grid img")];
let currentPhotoIndex = 0;

function showPhoto(index) {
    currentPhotoIndex = (index + photos.length) % photos.length;
    const image = photos[currentPhotoIndex];
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    viewerCaption.textContent = `${image.alt} (${currentPhotoIndex + 1} of ${photos.length})`;
}

function openPhoto(image) {
    showPhoto(photos.indexOf(image));
    viewer.showModal();
}

photos.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Open photo: ${image.alt}`);
    image.addEventListener("click", () => openPhoto(image));
    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPhoto(image);
        }
    });
});

viewer.querySelector(".photo-viewer-previous").addEventListener("click", () => {
    showPhoto(currentPhotoIndex - 1);
});
viewer.querySelector(".photo-viewer-next").addEventListener("click", () => {
    showPhoto(currentPhotoIndex + 1);
});
viewer.querySelector(".photo-viewer-close").addEventListener("click", () => viewer.close());
viewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPhoto(currentPhotoIndex - 1);
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showPhoto(currentPhotoIndex + 1);
    }
});
viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
});
