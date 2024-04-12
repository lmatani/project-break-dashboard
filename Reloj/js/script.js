import { getDateTime, miReloj} from './reloj.js';

function changeMode() {
    const fecha = new Date();
    const hora = fecha.getHours();
    const section = document.getElementById('container-reloj');

    if (hora > 20 || hora <= 6) {
        section.classList.toggle('mode-light');
    } else {
        section.classList.toggle('mode-dark');
    }

}

function showTime(reloj) {
    const {fecha, hora, mensaje} = reloj;
    const containerReloj = document.getElementById('container-reloj');
    containerReloj.className = 'mode-light mode-dark';
    containerReloj.innerText = '';
    
    const divFecha = document.createElement('div');
    divFecha.className = 'fecha';
    divFecha.textContent = fecha;
    containerReloj.appendChild(divFecha);

    const divHora = document.createElement('div');
    divHora.className = 'hora';
    divHora.textContent = hora;
    containerReloj.appendChild(divHora);

    const divMsg = document.createElement('div');
    divMsg.className = 'mensaje';
    divMsg.innerHTML = mensaje;
    containerReloj.appendChild(divMsg);
}

setInterval(() => {
    getDateTime(miReloj);
    showTime(miReloj);
    changeMode();
});















