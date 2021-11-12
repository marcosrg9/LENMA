/**
 * @copyright Copyright (c) 2021 - Marcos Rodríguez Yélamo<marcosylrg@gmail.com>
 * @license GPLv3
 */

/**
 * Carga la referencia al carusel y establece un intérvalo de 5 segundos.
 * Cambia la opacidad del elemento HTML.
 * 
 * Llamar en el evento onload.
 */
const loadCarousel = () => {
    carousel = document.querySelector('#carousel2');
    
    setInterval(() => {
        const opacity = getComputedStyle(carousel).opacity;
        if (opacity == 1) {
            carousel.style.opacity = 0;
        } else {
            carousel.style.opacity = 1;
        }
    }, 5000);
}