



function formatearValor(valor){
    return (valor < 10) ? '0' + valor : valor;
}

function obtenerMensaje(hora, dia) {
    let mensaje = '';
    if (hora > 0 && hora <= 6) {
        mensaje = 'Tú cerebro necesita descansar. Desconecta y sigue mañana.';
    } else if (hora > 6 && hora <= 13) {
        mensaje = `Buenos días en esta bonita mañana de ${dia}. Happy coding! <i class="fa-regular fa-face-grin"></i>`;
    } else if (hora > 13 && hora <= 15) {
        mensaje = '¿Has comido? Recuerda que el cerebro necesita alimento!';
    } else if (hora > 15 && hora <= 20) {
        mensaje = 'Buenas tardes, todavía puedes trabajar un rato más <i class="fa-regular fa-face-smile-wink"></i>';
    } else if (hora > 20 && hora <= 23) {
        mensaje = 'Buenas noches, es hora de pensar en cenar y descansar.';
    }
    return  mensaje;
}

function changeMode() {
    const fecha = new Date();
    const hora =  fecha.getHours();
    const section = document.getElementById('container-reloj');

    if (hora > 20 || hora <= 6) {
        section.classList.toggle('mode-light');
    } else {
        section.classList.toggle('mode-dark');
    }

}

function getTime() {
    setInterval(() => {
        const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
        const fecha = new Date();
        //Fecha
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();
        let fechaFormat = `${formatearValor(dia)}/${formatearValor(mes)}/${anio}`;
       
        // hora
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();
        let horaFormat = `${formatearValor(hora)}:${formatearValor(minutos)}:${formatearValor(segundos)}`;
       
        //mensaje
        let diaSemana = dias[fecha.getDay()];
        showTime(fechaFormat, horaFormat, hora, diaSemana);
    });
}


 function showTime(fechaFormat, horaFormat, hora, diaSemana) {
        const containerReloj = document.getElementById('container-reloj');
        containerReloj.className = 'mode-light mode-dark';
        containerReloj.innerText = '';
       
        const divFecha = document.createElement('div');
        divFecha.className = 'fecha';
        divFecha.textContent = fechaFormat;
        containerReloj.appendChild(divFecha);
   
        const divHora = document.createElement('div');
        divHora.className = 'hora';
        divHora.textContent = horaFormat;
        containerReloj.appendChild(divHora);
   
        const divMsg = document.createElement('div');
        divMsg.className = 'mensaje';
        divMsg.innerHTML = obtenerMensaje(hora, diaSemana);
        containerReloj.appendChild(divMsg);
}

getTime();
changeMode();

export { getTime,  changeMode};











