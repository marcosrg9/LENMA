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
            
            const xsdActivity = document.querySelector('#xsdActivityList');
            const dtdActivity = document.querySelector('#dtdActivityList');
        
            // Invierte el array (para visualizar antes las últimas tareas) y lo recorre.
            body.forEach( (list, index) => {
                
                list.reverse().forEach((activity, actIndex) => {

                    const { name, path, xml, task } = activity;
                    const actName = path.split('/').pop();

                    console.log(name, index);
                    
                    // Elementos.
                    const cont = document.createElement('div');
                    const title = document.createElement('h4');
                    const linksCont = document.createElement('div');
                    
                    // Enlaces a las actividades.
                    const xmlLink  = document.createElement('a');
                    const taskLink = document.createElement('a');
    
                    // Comprueba si hay disponible un fichero .xml
                    if (xml) {
                        if (index == 0)      xmlLink.href = `./ejercicios/xsd${path}/${actName}.xml`
                        else if (index == 1) xmlLink.href = `./ejercicios/dtd${path}/${actName}.xml`;
                        xmlLink.innerText = 'XML';
                        xmlLink.target = '_blank';
                        linksCont.appendChild(xmlLink);
                    }
    
                    // Comprueba si hay disponible un fichero de tarea (xsd o dtd)
                    if (task) {
                        if (index == 0) {
                            taskLink.href = `./ejercicios/xsd/${path}/${actName}.xsd`;
                            taskLink.innerText = 'XSD';
                        } else if (index == 1) {
                            taskLink.href = `./ejercicios/dtd/${path}/${actName}.dtd`;
                            taskLink.innerText = 'DTD';
                        }
                        taskLink.target = '_blank';
                        linksCont.appendChild(taskLink);
                    }
    
                    // Define el título de la tarea.
                    title.innerText = name;
    
                    // Define animación.
                    cont.classList = 'ease-in';
                    cont.style.animationDelay = `${ actIndex*100 }ms`;
                    
                    // Añade al contenedor los elementos.
                    cont.appendChild(title);
                    cont.appendChild(linksCont);
    
                    // Añade a la lista de tareas la tarea actual.
                    if (index == 0)         xsdActivity.appendChild(cont)
                    else if (index == 1)    dtdActivity.appendChild(cont);
                })
        
            });
        })
    })
    .catch(err => {
        alert('Error en la petición del archivo de tareas. Consultar consola.');
        console.error(err);
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