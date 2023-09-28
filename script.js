
// DÉCLARATION DES VARIABLES

const backgroundImage = document.querySelector('.background-image');
const backgroundElements = document.querySelectorAll('.background-element');
const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');

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

// --------------------------------------------------------

// GESTION DU DÉFILEMENT AVEC LES BOUTONS

let isScrollingLeft = false;
let isScrollingRight = false;

function scrollLeft() {
    if (isScrollingLeft) {
        scrollPosition += 5; // Ajustez la vitesse de défilement selon vos besoins
        updateBackgroundPosition("none");
        requestAnimationFrame(scrollLeft);
    }
}

function scrollRight() {
    if (isScrollingRight) {
        scrollPosition -= 5; // Ajustez la vitesse de défilement selon vos besoins
        updateBackgroundPosition("none");
        requestAnimationFrame(scrollRight);
    }
}

function startScrolling(direction) {
    if (direction === 'left') {
        isScrollingLeft = true;
        scrollLeftButton.classList.add('pushed');
        requestAnimationFrame(scrollLeft);
    } else {
        isScrollingRight = true;
        scrollRightButton.classList.add('pushed');
        requestAnimationFrame(scrollRight);
    }
}

function stopScrolling() {
    isScrollingLeft = false;
    isScrollingRight = false;
    scrollLeftButton.classList.remove('pushed');
    scrollRightButton.classList.remove('pushed');
}
// --------------------------------------------------------

function updateOverflowValues() {
    const vw100 = window.innerWidth
    const vh100 = window.innerHeight

    /* projected background image size and position */
    const bgscale = Math.max(vh100 / imageSrcHeight, vw100 / imageSrcWidth)

    projectedWidth = imageSrcWidth * bgscale | 0
    projectedHeight = imageSrcHeight * bgscale | 0

    leftOverflow = (projectedWidth - vw100) / 2 | 0
    topOverflow = (projectedHeight - vh100) / 2 | 0
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

function updateButtonsPosition() {
    backgroundElements.forEach(element => {
        // Récupérer les coordonnées à partir de l'attribut data-coord
        const coord = JSON.parse(element.getAttribute('data-coord'));

        // Calculer la position de l'élément
        const top = (coord.y / 2160) * projectedHeight - topOverflow - 10;
        const left = (coord.x / 3840) * projectedWidth - 10;

        // Définir la position de l'élément
        element.style.top = `${top}px`;
        element.style.left = `${left + (maxX == 0 ? 0 : scrollPosition)}px`;
    });
}

window.onresize = function () {
    scrollPosition = scrollPosition / projectedWidth
    updateOverflowValues();
    scrollPosition *= projectedWidth;
    maxX = -(projectedWidth - window.innerWidth);
    if (maxX > 0) maxX = 0;

    updateBackgroundPosition("none");
}

// --------------------------------------------------------

// ÉCOUTEURS D'ÉVENEMENTS POUR LE DÉFILEMENT

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

    // --------------------------------------------------------

    // ÉCOUTEURS D'ÉVENEMENTS POUR LES BOUTONS SCROLL

    // Appliquer les écouteurs d'événements pour les deux boutons
    for (const [direction, button] of [['left', scrollLeftButton], ['right', scrollRightButton]]) {
        button.addEventListener('mousedown', () => startScrolling(direction));
        button.addEventListener('mouseup', stopScrolling);
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startScrolling(direction);
        });
        button.addEventListener('touchend', stopScrolling);
    }

    // Appliquer les écouteurs d'événements pour le document
    document.addEventListener('mouseup', stopScrolling);
    document.addEventListener('touchend', stopScrolling);

}

// --------------------------------------------------------

// INITIALISATION

function start() {
    updateOverflowValues();

    maxX = -(projectedWidth - window.innerWidth);
    if (maxX > 0) maxX = 0;

    scrollPosition = maxX / 2;

    updateBackgroundPosition();
    startListener();
}

start();