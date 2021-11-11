const loadCarrousel = () => {
    carrousel = document.querySelector('#carrousel2');
    
    setInterval(() => {
        const opacity = getComputedStyle(carrousel).opacity;
        if (opacity == 1) {
            carrousel.style.opacity = 0;
        } else {
            carrousel.style.opacity = 1;
        }
    }, 5000);
}