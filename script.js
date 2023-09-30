
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



const freakeyLine = new LeaderLine(
    LeaderLine.pointAnchor(document.getElementById('freakey-button'), { x: '75%', y: '100%' }),
    LeaderLine.pointAnchor(document.getElementById('freakey-link'), { x: '50%', y: 0 }),
    {
        element: backgroundImage,
        color: 'white',
        size: 1, // largeur de la ligne en pixels
        dash: {animation: true}, // rend la ligne pointillée et animée
        startPlug: 'behind', // aucune extrémité de ligne visible au début
        endPlug: 'behind', // aucune extrémité de ligne visible à la fin
        path: 'straight', // la ligne est droite
        hide: true
    }
);

const illegoLine = new LeaderLine(
    LeaderLine.pointAnchor(document.getElementById('illego-button'), { x: '75%', y: '25%' }),
    LeaderLine.pointAnchor(document.getElementById('illego-link'), { x: 0, y: '50%' }),
    {
        element: backgroundImage,
        color: 'white',
        size: 1,
        dash: {animation: true},
        startPlug: 'behind',
        endPlug: 'behind',
        path: 'straight',
        hide: true
    }
);;

// --------------------------------------------------------

// GESTION DU DÉFILEMENT AVEC LES BOUTONS

let isScrollingLeft = false;
let isScrollingRight = false;

function scrollLeft() {
    if (isScrollingLeft) {
        scrollPosition += 5; // Ajustez la vitesse de défilement selon vos besoins
        updateBackgroundPosition();
        requestAnimationFrame(scrollLeft);
    }
}

function updateLines() {
    // Rafraîchir la position de l'ancre de fin et mettre à jour la ligne
    freakeyLine.position();

    // Rafraîchir la position de l'ancre de fin et mettre à jour la ligne
    illegoLine.position();

    document.querySelectorAll('.leader-line').forEach(element => {
        element.style.setProperty('overflow-x', 'hidden', 'important');
    });

}

function scrollRight() {
    if (isScrollingRight) {
        scrollPosition -= 5; // Ajustez la vitesse de défilement selon vos besoins
        updateBackgroundPosition();
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

function updateBackgroundPosition() {
    scrollPosition = scrollPosition / projectedWidth
    updateOverflowValues();
    scrollPosition *= projectedWidth;
    maxX = -(projectedWidth - window.innerWidth);
    if (maxX > 0) maxX = 0;

    if (scrollPosition > 0) scrollPosition = 0;
    if (scrollPosition < maxX) scrollPosition = maxX;

    updateButtonsPosition();
    updateLines();

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


    updateBackgroundPosition();
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
        updateBackgroundPosition();

        initialX = currentX;
    });

    // Ecouteur d'événements pour le défilement de la souris
    backgroundImage.addEventListener('wheel', (e) => {
        // Vérifiez si le défilement est horizontal
        const scrollSpeed = 0.7;
        if (e.deltaY) {
            // Ajustez la vitesse de défilement
            scrollPosition -= e.deltaY * scrollSpeed;

            updateBackgroundPosition();

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
    document.querySelectorAll('.leader-line').forEach(element => {
       backgroundImage.appendChild(element);
    });
    updateOverflowValues();

    maxX = -(projectedWidth - window.innerWidth);
    if (maxX > 0) maxX = 0;

    scrollPosition = maxX / 2;
   // alert(scrollPosition);

    updateBackgroundPosition();
    startListener();
}

start();

$(document).ready(function() {
    $('.bullet-button').click(function(e) {
        e.stopPropagation();

        var targetID = $(this).attr('target');
        var lineID = targetID.replace('link', 'line');

        if($(this).hasClass('active')) {
            if (targetID.includes("freakey")) {
                freakeyLine.hide();
            } else if (targetID.includes("illego")) {
                illegoLine.hide();
            }
            $(this).removeClass('active');
            $('#' + targetID).removeClass('active');
            $('#' + lineID).removeClass('active');
            $(this).find('img').attr('src', './img/bullet-plain.png');
        } else {
            $('.bullet-button, .bullet-link, .bullet-line').removeClass('active');
            $('.bullet-button').find('img').attr('src', './img/bullet-plain.png');

            console.log(targetID);
            if (targetID.includes("freakey")) {
                freakeyLine.show("draw", {duration: 500, timing: 'linear'});
                illegoLine.hide();
                console.log(1);
            } else if (targetID.includes("illego")) {
                illegoLine.show("draw", {duration: 500, timing: 'linear'});
                freakeyLine.hide();
                console.log(2);
            }

            $(this).addClass('active');
            $('#' + targetID).addClass('active');
            $('#' + lineID).addClass('active');
            $(this).find('img').attr('src', './img/bullet-dotted.png');
        }
    });

    $(document).click(function() {
        $('.bullet-button, .bullet-link, .bullet-line').removeClass('active');
        $('.bullet-button').find('img').attr('src', './img/bullet-plain.png');
        illegoLine.hide();
        freakeyLine.hide();
    });
});