import {  getTime, changeMode } from './Reloj/js/script.js';
import  mostrarPassword from './Generador/js/script.js';
import getInfoWeather from './Meteo/js/script.js';

// imagenes randoom
function cargar_imagen_random () {
    const numImgs = 10;
    var imgRandom = Math.floor(Math.random() * numImgs);
    (imgRandom === 0) ? imgRandom++ : imgRandom;
    document.querySelector('body').style.backgroundImage = 'url(./assets/img/img_' + imgRandom + '.jpg)';
}

setInterval(cargar_imagen_random, 5000);

// mostrar reloj
getTime();
changeMode();

