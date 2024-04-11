import {  getTime, changeMode } from './Reloj/js/script.js';
import {  generadorPassword, mostrarPassword, mostrarPassGenerada } from './Generador/js/script.js';



function cargar_imagen_random () {
    const numImgs = 10;
    var imgRandom = Math.floor(Math.random() * numImgs);
    (imgRandom === 0) ? imgRandom++ : imgRandom;
    document.querySelector('body').style.backgroundImage = 'url(./assets/img/img_' + imgRandom + '.jpg)';
}

setInterval(cargar_imagen_random, 5000);

getTime();
 changeMode();
//const passContainer = document.getElementById('container-pass');
//console.log(passContainer);


//console.log(generadorPass(22));
/*
containerPass.addEventListener ('click', function(event) {
    if (event.target.id === 'btn-gen-pwd') {
        const longitud = document.getElementById('size-pwd').value;
        mostrarPassGenerada(generadorPassword(longitud)); 
    }
});

*/