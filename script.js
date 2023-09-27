
const backgroundImage = document.querySelector('.background-image');
const freakeyButton = document.getElementById('freakey-button');
const illegoButton = document.getElementById('illego-button');
const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');

const freakeyButtonPosition = { top: 563, left: 1896 };
const illegoButtonPosition = { top: 1066, left: 644 };
const bgImages = [
    "./img/4.jpg",
    "./img/3.jpg",
    "./img/2.jpg",
    "./img/1.jpg"
];

let bgValue = 0;

let scrollPosition = 0;
let initialX;
let isSwiping = false;
const imageSrcWidth = 3840;
let imageSrcHeight = 2160;

let projectedWidth;
let projectedHeight;
let leftOverflow;
let topOverflow;

let maxX;

function preloadImages(imagePaths, callback) {
    const loadedImages = [];
    let loadedCount = 0;

    imagePaths.forEach((path, index) => {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            if (loadedCount === imagePaths.length) {
                // Toutes les images sont chargées
                callback(loadedImages);
            }
        };
        img.src = path;
        loadedImages[index] = img;
    });
}


function setImagesAsBackground(images) {

    // Exemple : attribuer la première image préchargée à la div
    if (images.length > 0) {
        backgroundImage.style.backgroundImage = `url('${images[0].src}')`;
    }
}


function updateOverflowValues() {
    const vw100 = window.innerWidth
    const vh100 = window.innerHeight

        /* projected background image size and position */
    const bgscale = Math.max(vh100 / imageSrcHeight, vw100 / imageSrcWidth)

    projectedWidth  = imageSrcWidth * bgscale | 0
    projectedHeight = imageSrcHeight * bgscale | 0

    leftOverflow = (projectedWidth  - vw100) / 2 | 0
    topOverflow  = (projectedHeight - vh100) / 2 | 0
}

window.onresize = function () {
    scrollPosition = scrollPosition / projectedWidth
    updateOverflowValues();
    scrollPosition *= projectedWidth;
    maxX = -(projectedWidth - window.innerWidth);
    if (maxX > 0) maxX = 0;

    updateBackgroundPosition();
}

function updateBackgroundPosition(transition) {
    if (scrollPosition > 0) scrollPosition = 0;
    if (scrollPosition < maxX) scrollPosition = maxX;

    updateButtonsPosition();

    scrollLeftButton.style.visibility = "visible";
    scrollRightButton.style.visibility = "visible";

    if (maxX == 0 || maxX == -0) {
        scrollLeftButton.style.visibility = "hidden";
        scrollRightButton.style.visibility = "hidden";
    } else {
        if (scrollPosition == 0) {
            scrollLeftButton.style.visibility = "hidden";
        }
        else if (scrollPosition == maxX) {
            scrollRightButton.style.visibility = "hidden";
        }
    }

    backgroundImage.style.transition = transition;
    backgroundImage.style.backgroundPosition = `${scrollPosition}px center`;
}



function updateButtonsPosition() {
    freakeyButtonPosition.top = (563 / 2160) * projectedHeight - topOverflow - 10;
    freakeyButtonPosition.left = (1896 / 3840) * projectedWidth - 10;
    illegoButtonPosition.top = (1066 / 2160) * projectedHeight - topOverflow - 10;
    illegoButtonPosition.left = (644 / 3840) * projectedWidth - 10;

    freakeyButton.style.top = `${freakeyButtonPosition.top}px`;
    freakeyButton.style.left = `${freakeyButtonPosition.left + (maxX == 0 ? 0 : scrollPosition)}px`;
    illegoButton.style.top = `${illegoButtonPosition.top}px`;
    illegoButton.style.left = `${illegoButtonPosition.left + (maxX == 0 ? 0 : scrollPosition)}px`;
}

function startListener() {
    backgroundImage.addEventListener('touchstart', (e) => {
        initialX = e.touches[0].clientX;
        isSwiping = true;
    });

    // Ajoutez un gestionnaire d'événements pour le mouvement du geste de balayage
    backgroundImage.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;

        const currentX = e.touches[0].clientX;
        const deltaX = currentX - initialX;

        scrollPosition += deltaX; // Ajustez la vitesse de défilement selon vos préférences
        updateBackgroundPosition("none");

        initialX = currentX;
    });

    // Ecouteur d'événements pour le défilement de la souris
    backgroundImage.addEventListener('wheel', (e) => {
        // Vérifiez si le défilement est horizontal
        const scrollSpeed = 0.7;
        if (e.deltaY) {
            // Ajustez la vitesse de défilement
            scrollPosition -= e.deltaY * scrollSpeed;

            updateBackgroundPosition("none");

            // Empêchez le défilement vertical
            e.preventDefault();
        }
    }, { passive: false });

    scrollLeftButton.addEventListener('click', () => {
        scrollPosition += 150; // Ajustez la valeur de défilement selon vos besoins

        updateBackgroundPosition("background-position 0.3s ease");
    });

    scrollRightButton.addEventListener('click', () => {
        scrollPosition -= 150; // Ajustez la valeur de défilement selon vos besoins

        updateBackgroundPosition("background-position 0.3s ease");
    });

    freakeyButton.addEventListener("click", () => {
        if (bgValue == 1 || bgValue == 3) bgValue -= 1;
        else bgValue += 1;
        backgroundImage.style.backgroundImage = `url("${bgImages[bgValue]}")`;
    });

    illegoButton.addEventListener("click", () => {
        if (bgValue == 2 || bgValue == 3) bgValue -= 2;
        else bgValue += 2;
        backgroundImage.style.backgroundImage = `url("${bgImages[bgValue]}")`;
    });
}

function start() {
    updateOverflowValues();

    preloadImages(bgImages, setImagesAsBackground);

    maxX = -(projectedWidth - window.innerWidth);
    if (maxX > 0) maxX = 0;

    scrollPosition = maxX / 2;

    updateBackgroundPosition();
    startListener();
}

start();