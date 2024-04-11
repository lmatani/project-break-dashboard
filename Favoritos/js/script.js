
let btnAddlink = null;
let btnEraser = null;
let listaFav = null;
let containerFav = document.getElementById('container-favoritos');
console.log(containerFav);

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

containerFav.addEventListener ('click', function(event) {
    if (event.target.id === 'btn-add-link') {
        addLink();
    }
    if (event.target.id === 'btn-eraser') {
        limpiarDatos();
    }
});

document.body.addEventListener('click', function(event) {
    let target = event.target;     
    let nombreTag = target.tagName.toLowerCase();
    let myId = parseFloat(target.id);
    //console.log(myId);
    if (nombreTag === 'button' && Number.isInteger(myId) && myId > 0){
        // quito de la lista de html
        let linkABorrarLS = document.getElementById(`li${target.id}`);
        listaFav.removeChild(linkABorrarLS);
        
        // actualizo LS
        updateListaBD(parseFloat(target.id), opcDelete);
    }
    
});




showFavoritos();
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

function showFavoritos(){
  
    // sección container-favoritos
    const divAddFav = document.createElement('div');
    divAddFav.id = 'add-favoritos';
    
    const title = document.createElement('h2');
    title.className = 'title-fav';
    title.textContent = 'Incluye en tus enlaces favoritos';
    divAddFav.appendChild(title);
    console.log(divAddFav);
    //  inputs
    const divInputFav = document.createElement('div');
    divInputFav.id = 'fav-input';
    divInputFav.className = 'fav';
    
    const inputAdd = document.createElement('input');
    inputAdd.type = 'text';
    inputAdd.id = 'name-input';
    inputAdd.placeholder = 'Nombre del enlace';
    inputAdd.required = true;
    const inputUrl = document.createElement('input');
    inputUrl.type = 'text';
    inputUrl.id = 'url-input';
    inputUrl.placeholder = 'Copia aquí la URL';
    inputUrl.required = true;
    divInputFav.appendChild(inputAdd);
    divInputFav.appendChild(inputUrl);
    
    
    // buttons
    const divBtn = document.createElement('div');
    divBtn.id = 'fav-btn';
    const btnAdd = document.createElement('button');
    btnAdd.id = 'btn-add-link';
    btnAdd.title = 'Añadir enlace';
    btnAdd.textContent = 'Añadir enlace';
    const btnClean = document.createElement('button');
    btnClean.id = 'btn-eraser';
    btnClean.title = 'Limpiar campos';
    const iconBorrar = document.createElement('i');
    iconBorrar.className ='fa-solid fa-eraser';
    btnClean.appendChild(iconBorrar);

    divBtn.appendChild(btnAdd);
    divBtn.appendChild(btnClean);
    divAddFav.appendChild(divInputFav);
    divAddFav.appendChild(divBtn);
    

    // sección lista de favoritos
    const divListFav = document.createElement('div');
    divListFav.id = 'list-favoritos';

    const icon = document.createElement('i');
    icon.className ='fa-solid fa-star';
    const title2 = document.createElement('h2');
    title2.className = 'title-fav';
    title2.appendChild(icon);
    title2.appendChild(document.createTextNode('Lista de favoritos'));

    const divLista = document.createElement('div');
    divLista.id = 'fav-lista';
    divLista.className = 'fav';
    const ulElem = document.createElement('ul');
    ulElem.id='lista';
    divLista.appendChild(ulElem);
    
    divListFav.appendChild(title2);
    divListFav.appendChild(divLista);
    
    // incluyo a contenedor las dos secciones
    containerFav.appendChild(divAddFav);
    containerFav.appendChild(divListFav);
   
    //actualizo las variables para el funcionamiento de botones
    btnAddlink = document.getElementById('btn-add-link');
    btnEraser = document.getElementById('btn-eraser');
    listaFav = document.getElementById('lista');
}

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


export {showFavoritos, cargarDatosLSBD};