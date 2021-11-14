/**
 * @author Marcos Rodríguez Yélamo <marcosylrg@gmail.com>
 * @copyright Copyright (c) 2021 - Marcos Rodríguez Yélamo
 * @license GPLv3
 */

document.body.onload = () => loadCarousel();

/**
 * Carga la referencia al carousel y establece un intérvalo de 5 segundos entre transición.
 */
const loadCarousel = () => {
    carousel = document.querySelector('#carousel2');
    
    setInterval(() => {
        const opacity = getComputedStyle(carousel).opacity;
        
        (opacity === '1') ? carousel.style.opacity = 0
                          : carousel.style.opacity = 1;
    }, 5000);
}