import {  getDateTime, miReloj} from './Reloj/js/reloj.js';
import  mostrarPassword from './Generador/js/script.js';
import getInfoWeather from './Meteo/js/script.js';
import { showFavoritos, cargarDatosLSBD } from './Favoritos/js/script.js';

// imagenes randoom
function cargar_imagen_random () {
    const numImgs = 14;
    var imgRandom = Math.floor(Math.random() * numImgs);
    (imgRandom === 0) ? imgRandom++ : imgRandom;
    document.querySelector('body').style.backgroundImage = 'url(./assets/img/img_' + imgRandom + '.jpg)';
}

cargar_imagen_random();
setInterval(cargar_imagen_random, 15000);


// mostrar reloj
function showTimeCabecera(reloj) {
    const {fecha, hora, mensaje} = reloj;
    const containerReloj = document.getElementById('container-home-reloj');
    containerReloj.innerHTML = '';
    const divReloj = document.createElement('div');
    divReloj.id = 'home-reloj';
  
    const pFecha = document.createElement('p');
    pFecha.textContent = fecha;
    pFecha.className = 'fecha-home';
    divReloj.appendChild(pFecha);
    const pHora = document.createElement('p');
    pHora.textContent = hora;
    pHora.className = 'hora-home';
    divReloj.appendChild(pHora);
 
    containerReloj.appendChild(divReloj);
}

setInterval(() => {
    getDateTime(miReloj);
    showTimeCabecera(miReloj);
});

