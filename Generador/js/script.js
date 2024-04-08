
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()-_=+";
const btnGenPwd = document.getElementById('btn-gen-pwd'); 

btnGenPwd.addEventListener('click', () => {
    let longitud = document.getElementById('size-pwd').value;
    mostrarPass(generadorPass(longitud));  
});

function generadorPass(longitud) {
    let passResult = '';
    if(longitud >= 12 && longitud <=50) {
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

function mostrarPass(pass) { 
    const divPassShow = document.getElementById('div-pass-show');  
    divPassShow.innerHTML = '';

    if (pass !==  '') {
        const titleElem = document.createElement('p');
        titleElem.innerText = 'Nueva contraseña:';
        titleElem.className = 'title-new-pwd';
    
        const pElem = document.createElement('p');
        pElem.innerText = pass;
        pElem.className = 'new-pwd';
        
        divPassShow.appendChild(titleElem);
        divPassShow.appendChild(pElem);
    }
   
}


