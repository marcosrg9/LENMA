/**
 * @author Marcos Rodríguez Yélamo <marcosylrg@gmail.com>
 * @copyright Copyright (c) 2021 - Marcos Rodríguez Yélamo
 * @license GPLv3
*/

const activityManager = () => {

    const url = (isLoopback()) ? './xmlIndex.json'
                               : 'https://raw.githubusercontent.com/marcosrg9/LENMA/main/ejercicios/xml/xmlIndex.json';

    fetch(url)
    .then(a => {
        a.json()
        .then(body => {
            
            const activityList = document.querySelector('#activityList');
        
            // Invierte el array (para visualizar antes las últimas tareas) y lo recorre.
            body.reverse().forEach( (activity, index) => {
                
                const { name, path, xml, xsd } = activity;
                const actName = path.split('/').pop();
                
                // Elementos.
                const cont = document.createElement('div');
                const title = document.createElement('h4');
                const linksCont = document.createElement('div');
                
                // Enlaces a las actividades.
                const xmlLink = document.createElement('a');
                const xsdLink = document.createElement('a');

                // Comprueba si hay disponible un fichero .xml
                if (xml) {
                    xmlLink.href = `${path}/${actName}.xml`;
                    xmlLink.innerText = 'XML';
                    xmlLink.target = '_blank';
                    linksCont.appendChild(xmlLink);
                }

                // Comprueba si hay disponible un fichero .xsd
                if (xsd) {
                    xsdLink.href = `${path}/${actName}.xsd`;
                    xsdLink.innerText = 'XSD';
                    xsdLink.target = '_blank';
                    linksCont.appendChild(xsdLink);
                }

                // Define el título de la tarea.
                title.innerText = name;

                // Define animación.
                cont.classList = 'ease-in';
                cont.style.animationDelay = `${ index*100 }ms`;
                
                // Añade al contenedor los elementos.
                cont.appendChild(title);
                cont.appendChild(linksCont);

                // Añade a la lista de tareas la tarea actual.
                activityList.appendChild(cont);
        
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