
const backgroundImage = document.querySelector('.background-image');
const backgroundElements = document.querySelectorAll('.background-element');

const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');



let scrollPosition = 0;
let initialX;
let isSwiping = false;
let imageSrcWidth;
let imageSrcHeight;

let vw100;
let vh100;
let bgw;
let bgh;
let bgscale;
let projectedWidth;
let projectedHeight;
let leftOverflow;
let topOverflow;

let maxX;


const image = new Image();

function updateOverflowValues() {
    vw100 = window.innerWidth
    vh100 = window.innerHeight

    bgw = 3840;
    bgh = 2160;

    bgscale = Math.max(vh100 / bgh, vw100 / bgw)

    projectedWidth = bgw * bgscale
    projectedHeight = bgh * bgscale

    leftOverflow = (projectedWidth - vw100) / 2
    topOverflow = (projectedHeight - vh100) / 2
    console.log(bgscale.toFixed(2), projectedWidth, projectedHeight, leftOverflow, topOverflow)
}

function updateBGElements(){
    updateOverflowValues();

    // Itérer sur chaque élément
    backgroundElements.forEach(element => {
        // Récupérer les coordonnées à partir de l'attribut data-coord
        const coord = JSON.parse(element.getAttribute('data-coord'));

        // Appliquer des modifications sur style.top et style.left
        element.style.top = (coord.y * backgroundRatio - topOverflow) + 'px';
        element.style.left = (coord.x * backgroundRatio - leftOverflow) + 'px'; 
    });
}

image.src = './img/ILLEGO-SITE-VFINAL.jpeg';

image.onload = function () {
    imageSrcWidth = this.width;
    imageSrcHeight = this.height;

    maxX = Math.round((imageSrcWidth / imageSrcHeight) * window.innerHeight - window.innerWidth)
    if (maxX < 0) {
        maxX = 0;

    }
    maxX = -maxX;

    scrollPosition = maxX / 2;

    updateBackgroundPosition();
    startListener();
}

window.onresize = function () {
    maxX = Math.round((imageSrcWidth / imageSrcHeight) * window.innerHeight - window.innerWidth)
    if (maxX < 0) maxX = 0;
    maxX = -maxX;

    console.log(bgscale.toFixed(2), projectedWidth, projectedHeight, leftOverflow, topOverflow)

    updateBackgroundPosition();
}

function updateBackgroundPosition(transition) {
    if (scrollPosition > 0) scrollPosition = 0;
    if (scrollPosition < maxX) scrollPosition = maxX;

    if (maxX == 0 || maxX == -0) {
        scrollLeftButton.style.visibility = "hidden";
        scrollRightButton.style.visibility = "hidden";
    } else {

        if (scrollPosition == 0) {
            scrollRightButton.style.visibility = "visible";
            scrollLeftButton.style.visibility = "hidden";
        }
        else if (scrollPosition == maxX) {
            scrollLeftButton.style.visibility = "visible";
            scrollRightButton.style.visibility = "hidden";
        }
        else {
            scrollLeftButton.style.visibility = "visible";
            scrollRightButton.style.visibility = "visible";
        }
    }

    backgroundImage.style.transition = transition;
    backgroundImage.style.backgroundPosition = `${scrollPosition}px center`;
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
}




