const viewer = document.createElement("dialog");
viewer.className = "photo-viewer";
viewer.innerHTML = `
    <button class="photo-viewer-close" type="button" aria-label="Close photo">×</button>
    <figure>
        <img alt="">
        <figcaption></figcaption>
    </figure>
`;
document.body.append(viewer);

const viewerImage = viewer.querySelector("img");
const viewerCaption = viewer.querySelector("figcaption");

function openPhoto(image) {
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    viewerCaption.textContent = image.alt;
    viewer.showModal();
}

document.querySelectorAll("details img, .photo-grid img").forEach((image) => {
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

viewer.querySelector(".photo-viewer-close").addEventListener("click", () => viewer.close());
viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
});
