const loader = document.querySelector('.loader');
const loaderImg = document.querySelector('.loader-img');

window.addEventListener('load', () => {

    setTimeout(() => {
        loaderImg.classList.add('fondu-out');
        setTimeout(() => {
            loader.classList.add('fondu-out');
            setTimeout(() => {
                loader.style.display = "none";
                loaderImg.style.display = "none";
            }, 1000);
        }, 300);
    }, 1500);

    // if (sessionStorage.getItem('premierChargement') === 'true') {
    //     loader.style.display = "none";
    //     loaderImg.style.display = "none";
    // }
    // else {
    //     setTimeout(() => {
    //         loaderImg.classList.add('fondu-out');
    //         setTimeout(() => {
    //             loader.classList.add('fondu-out');
    //             setTimeout(() => {
    //                 loader.style.display = "none";
    //                 loaderImg.style.display = "none";
    //             }, 1000);
    //         }, 300);
    //     }, 1500);

    //     sessionStorage.setItem('premierChargement', 'true');
    // }
    

})