
const containerPass = document.getElementById('container-pass');  

mostrarPassword(); 

function generadorPassword(longitud) {
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()-_=+";

    let passResult = '';
    if (longitud >= 12 && longitud <=50) {
        let veces = Math.floor(longitud / 4);
         for (let i = 0; i < veces; i++) {
            passResult += dameCaracter(minusculas);
            passResult += dameCaracter(numeros);
            passResult += dameCaracter(mayusculas);
            passResult += dameCaracter(simbolos);
         }
       
        // completo hasta la longitud solicitada 
        if (passResult.length < longitud) {
            let extra = longitud - passResult.length;
            for (let i = 0; i < extra; i++) {
                passResult += dameCaracter(minusculas);
            }
        }
    }
    else {
        alert('Por favor, introduce un valor correcto.\nLa longitud permitida está entre 12 y 50 caracteres.');
        const sizePwd = document.getElementById('size-pwd'); 
        sizePwd.value=12;
    }
    return passResult;
}

const dameCaracter = ((cadena) => cadena.charAt(Math.floor(Math.random() * cadena.length)));

function mostrarPassword() { 
     
    const title = document.createElement('h2');
    title.textContent = 'Genera una contraseña segura';
    const icon = document.createElement('i');
    icon.className ='fa-solid fa-shield';
    title.appendChild(icon);
    containerPass.appendChild(title);

    const divPassGen = document.createElement('div');
    divPassGen.id = 'div-pass-gen';
    divPassGen.className = 'pass-gen';

    const titlePassGen= document.createElement('p');
    titlePassGen.textContent = 'Elige la longitud de tu contraseña';
    divPassGen.appendChild(titlePassGen);

    const inputPassGen= document.createElement('input');
    inputPassGen.type = 'number';
    inputPassGen.id = 'size-pwd';
    inputPassGen.name = 'size-pwd';
    inputPassGen.min = 12;
    inputPassGen.max = 50;
    inputPassGen.value = 12;
    divPassGen.appendChild(inputPassGen);

    const btnPassGen= document.createElement('button');
    btnPassGen.id = 'btn-gen-pwd';
    btnPassGen.textContent = 'Generar Contraseña';
    divPassGen.appendChild(btnPassGen);

    containerPass.appendChild(divPassGen);
}

function mostrarPassGenerada(pass) { 
    const divPassShow = document.getElementById('div-pass-show');
    if (divPassShow) {containerPass.removeChild(divPassShow);}
    if (pass !==  '') {
         const titleElem = document.createElement('p');
        titleElem.innerText = 'Nueva contraseña:';
        titleElem.className = 'title-new-pwd';
    
        const pElem = document.createElement('p');
        pElem.innerText = pass;
        pElem.className = 'new-pwd';
        
        const divPassShow = document.createElement('div');
        divPassShow.id = 'div-pass-show';
        divPassShow.appendChild(titleElem);
        divPassShow.appendChild(pElem);
        containerPass.appendChild(divPassShow);
    }

}

containerPass.addEventListener ('click', function(event) {
    if (event.target.id === 'btn-gen-pwd') {
        const longitud = document.getElementById('size-pwd').value;
        mostrarPassGenerada(generadorPassword(longitud)); 
    }
});


export { generadorPassword, mostrarPassword, mostrarPassGenerada };

