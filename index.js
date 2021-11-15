/**
 * @author Marcos Rodríguez Yélamo <marcosylrg@gmail.com>
 * @copyright Copyright (c) 2021 - Marcos Rodríguez Yélamo
 * @license GPLv3
*/

/**
 * El administrador de actividades inserta en el contenedor de actividades las tareas realizadas.
*/
const activityManager = () => {

    const url = (isLoopback()) ? './activityIndex.json'
                               : 'https://raw.githubusercontent.com/marcosrg9/LENMA/main/activityIndex.json';

    fetch(url)
    .then(a => {
        a.json()
        .then(body => {
            
            const animationFlag = localStorage.getItem('anim');
            const activityList = document.querySelector('#activityList');
        
            // Invierte el array (para visualizar antes las últimas tareas) y lo recorre.
            body.reverse().forEach( (activity, index) => {
                
                // Enlace a la actividad.
                const link = document.createElement('a');
                link.href = activity.path;
        
                // Entrada de la actividad en la lista.
                const act = document.createElement('li');
                act.classList = 'ease-in';
                if (animationFlag === 'true' || !animationFlag) {
                    act.style.animationDelay = `${ index*100 }ms`;
                }
                // Inserta el nombre de la actividad.
                act.innerText = activity.name;
        
                // Inclusión en la lista de actividades.
                link.appendChild(act);
                activityList.appendChild(link);
        
            })
        })
    })
}

/**
 * Comprueba si se trata de una dirección de loopback.
 * */
const isLoopback = () => {
    const { hostname } = location;
    if (hostname === '127.0.0.1' || hostname === 'localhost') return true;
    return false;
}

// Carga el administrador de actividades cuando el body se ha cargado.
document.body.onload = () => activityManager()