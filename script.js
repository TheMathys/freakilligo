
const backgroundImage = document.querySelector('.background-image');
// const backgroundElements = document.querySelectorAll('.background-element');
const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');

const freakeyButton = document.getElementById('freakey-button');
const illegoButton = document.getElementById('illego-button');

const freakeyButtonPosition = { top: 563, left: 1896 };
const illegoButtonPosition = { top: 1066, left: 644 };

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

    updateBackgroundPosition("none");
}

function updateBackgroundPosition(transition) {
    if (scrollPosition > 0) scrollPosition = 0;
    if (scrollPosition < maxX) scrollPosition = maxX;

    updateButtonsPosition(transition);

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



function updateButtonsPosition(transition) {
    freakeyButtonPosition.top = (563 / 2160) * projectedHeight - topOverflow - 10;
    freakeyButtonPosition.left = (1896 / 3840) * projectedWidth - 10;
    illegoButtonPosition.top = (1066 / 2160) * projectedHeight - topOverflow - 10;
    illegoButtonPosition.left = (644 / 3840) * projectedWidth - 10;


    freakeyButton.style.transition = (transition == "none" ? transition : "left 0.3s ease");
    freakeyButton.style.top = `${freakeyButtonPosition.top}px`;
    freakeyButton.style.left = `${freakeyButtonPosition.left + (maxX == 0 ? 0 : scrollPosition)}px`;

    illegoButton.style.transition = (transition == "none" ? transition : "left 0.3s ease");
    illegoButton.style.top = `${illegoButtonPosition.top}px`;
    illegoButton.style.left = `${illegoButtonPosition.left + (maxX == 0 ? 0 : scrollPosition)}px`;
}

// function updateButtonsPosition() {
//     backgroundElements.forEach(element => {
//         // Récupérer les coordonnées à partir de l'attribut data-coord
//         const coord = JSON.parse(element.getAttribute('data-coord'));

//         // Calculer la position de l'élément
//         const top = (coord.y / 2160) * projectedHeight - topOverflow - 10;
//         const left = (coord.x / 3840) * projectedWidth - 10;

//         // Définir la position de l'élément
//         element.style.transition = (transition == "none" ? transition : "left 0.3s ease");
//         element.style.top = `${top}px`;
//         element.style.left = `${left + (maxX == 0 ? 0 : scrollPosition)}px`;
//     });
// }

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
}
window.onload = async function () {

    function start() {
        updateOverflowValues();

        maxX = -(projectedWidth - window.innerWidth);
        if (maxX > 0) maxX = 0;

        scrollPosition = maxX / 2;

        updateBackgroundPosition();
        startListener();
    }

    await start();
    await new Promise(r => setTimeout(r, 2000));

    // Code pour cacher la page de chargement une fois que le contenu est chargé
    var loader = document.querySelector('.loader');
    loader.style.display = 'none';

    document.getElementById('content').style.display = 'block';
}