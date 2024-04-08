
const btnAddlink = document.getElementById('btn-add-link');
const btnEraser = document.getElementById('btn-eraser');
const listaFav = document.getElementById('lista');
let listaFavLocalBD = [];
let initId = 1;
const opcDelete = 0;
const opcInsert = 1;

//localStorage.clear();

const link = {
    id : 0,
    nombre : '',
    url : '',
}


btnAddlink.addEventListener('click', () => {
    addLink();
});


btnEraser.addEventListener('click', () => {
    limpiarDatos();
});

document.body.addEventListener("click", function(event) {
    let target = event.target;     
    let nombreTag = target.tagName.toLowerCase();
    let myId = parseFloat(target.id);
    console.log(myId);
    if (nombreTag === 'button' && Number.isInteger(myId) && myId > 0){
        // quito de la lista de html
        let linkABorrarLS = document.getElementById(`li${target.id}`);
        listaFav.removeChild(linkABorrarLS);
        
        // actualizo LS
        updateListaBD(parseFloat(target.id), opcDelete);
    }
    
});

cargarDatosLSBD();

/* FUNCIONES LOCALSTORAGE */

function cargarDatosLSBD() {
    listaFav.innerHTML ='';
    getListaBD();
    for(let link of listaFavLocalBD)
    {
        addLinkListaFav(link);
    }
}

function getListaBD() {
    if (localStorage.getItem('listaFavoritos') !== null) {
        listaFavLocalBD = JSON.parse(localStorage.getItem('listaFavoritos'));
    }
}

function updateListaBD(link, operacion) {
    getListaBD();
    if (operacion === opcInsert) {
        const newArrayFav = [...listaFavLocalBD, link];
        localStorage.setItem('listaFavoritos', JSON.stringify(newArrayFav));        
    }
    else if (operacion === opcDelete) {
        const newListBD = listaFavLocalBD.filter(elem => elem.id !== link);
        localStorage.setItem('listaFavoritos', JSON.stringify(newListBD));
    }
}
/* FUNCIONES DOM */

function addLink() {
    let linkFav = new Object(link);
    const result = obtenerDatos(linkFav);
    if (result) {
        addLinkListaFav(linkFav);
        limpiarDatos();
        updateListaBD(linkFav, opcInsert);
    }
}


function dameId(){
    let id = localStorage.getItem('favId');
    (id === null) ? id = 1 : id = parseFloat(localStorage.getItem('favId')) + 1;
    localStorage.setItem('favId', id);
    return id;
}

function addLinkListaFav(linkFav) { 
    const liElem = document.createElement('li');
    const aElem = document.createElement('a');
    aElem.href = linkFav.url;
    aElem.setAttribute("target", "_blank");
    aElem.innerText =  linkFav.nombre;
    liElem.appendChild(aElem);
    const btnElem = document.createElement('button');
    btnElem.textContent = 'X';
    btnElem.id = `${linkFav.id}`;
    liElem.id = `li${linkFav.id}`;
    liElem.appendChild(btnElem);
    listaFav.appendChild(liElem);
}

function obtenerDatos(favorito) {
    let result = false;
    const minLength = 5;
    const nameInput = document.getElementById('name-input');
    const urlInput  = document.getElementById('url-input');
 
    if (nameInput.value !== undefined && urlInput.value !== undefined && 
        nameInput.value !== '' && urlInput.value !== '' &&
         nameInput.value.length >= minLength && urlInput.value.length >= minLength) {
            favorito.id = dameId();
            favorito.nombre = nameInput.value.trim();
            favorito.url = urlInput.value.trim();
            result = true;
    }
    else {
        alert('Por favor, introduce un enlace correcto.\nAmbos datos tiene que tener un mínimo de 5 caracteres');
    }

    return result;
}

function limpiarDatos()
{
    const nameInput = document.getElementById('name-input');
    const urlInput  = document.getElementById('url-input');
    nameInput.value = '';
    urlInput.value = '';
}