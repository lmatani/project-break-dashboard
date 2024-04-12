
const urlBasica = 'https://api.weatherapi.com/v1';
const key = '248eb0dff5f14e1cadd175754240804';
const ciudad = 'Logrono';
const containerMeteo = document.getElementById('container-meteo');

function showSectionWeather(forecastWeather) { 
    const containerMeteo = document.getElementById('container-meteo');

    const divCurrent = document.createElement('div');
    divCurrent.id = 'current-weather';
    showCurrentWeather(divCurrent, forecastWeather);

    const divForecast = document.createElement('div');
    divForecast.id = 'forecast-weather';
    showForecastWeatherHours(divForecast, forecastWeather);
}

function showCurrentWeather(divCurrent, currentWeather) {
      
        const divCity = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = currentWeather.location.name + ' (' + currentWeather.location.country + ')';
        divCity.appendChild(title);
        containerMeteo.appendChild(divCity);
  
        const imagen = document.createElement('img');
        imagen.src = currentWeather.current.condition.icon;
        imagen.alt =  currentWeather.current.condition.text; 
        divCurrent.appendChild(imagen); 
        
        const divTemp = document.createElement('div');
        divTemp.id = 'temp';
        const text = document.createElement('p');
        text.className = 'text';
        text.textContent = currentWeather.current.condition.text;
       
        const temp = document.createElement('p');
        temp.className = 'temp';
       
        temp.appendChild(document.createTextNode(Math.floor(currentWeather.current.temp_c) + ' ºC '));
        const icon = document.createElement('i');
        icon.className ='fa-solid fa-temperature-half';
        temp.appendChild(icon);

        divTemp.appendChild(text);
        divTemp.appendChild(temp);
        divCurrent.appendChild(divTemp);

        const ulElem = document.createElement('ul');
        ulElem.id =  'values';
        const liElem1 = document.createElement('li');
        const spam1 = document.createElement('span');
        spam1.textContent = 'Precipitación: ';
        liElem1.appendChild(spam1);
        liElem1.appendChild(document.createTextNode(currentWeather.current.precip_mm + ' mm'));
      
        const liElem2 = document.createElement('li');
        const spam2 = document.createElement('span');
        spam2.textContent = 'Humedad: ';
        liElem2.appendChild(spam2);
        liElem2.appendChild(document.createTextNode(currentWeather.current.humidity + ' %'));
   
        const liElem3 = document.createElement('li');
        const spam3 = document.createElement('span');
        spam3.textContent = 'Viento: ';
        liElem3.appendChild(spam3);
        liElem3.appendChild(document.createTextNode(currentWeather.current.wind_kph + ' km/h'));

        ulElem.appendChild(liElem1);
        ulElem.appendChild(liElem2);
        ulElem.appendChild(liElem3);
        divCurrent.appendChild(ulElem);

        containerMeteo.appendChild(divCurrent);

}

function showForecastWeatherHours(divForecast, forecastWeather) {

    if (forecastWeather.forecast.forecastday != null) {
        forecastWeather.forecast.forecastday[0].hour.forEach(elemen => {
            const ulElem = document.createElement('ul');
            ulElem.className = 'forecast';
            
            const liElem1 = document.createElement('li');
            const arrTime = elemen.time.split(" ");
            liElem1.className = 'text-forecast';
            liElem1.textContent = arrTime[1];
            
            const liElem2 = document.createElement('li');
            const imagen = document.createElement('img');
            imagen.src = elemen.condition.icon;
            imagen.alt =  elemen.condition.text;  
            liElem2.appendChild(imagen);
            
            const liElem3 = document.createElement('li');
            liElem3.textContent =  Math.floor(elemen.temp_c) + ' ºC';
            liElem3.className = 'temp-forecast';

            ulElem.appendChild(liElem1);
            ulElem.appendChild(liElem2);
            ulElem.appendChild(liElem3);
            divForecast.appendChild(ulElem);
        });
       
    }
    containerMeteo.appendChild(divForecast);
}


async function getWeatherApi(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Ha ocurrido un error', response.status);
      }
      return await response.json();

    } catch (error) {
      console.log('Error al obtener los datos: ', error);
      showError(error);
    }
  }



async function getInfoWeather() {
    
    const forecastWeather = await getWeatherApi(`${urlBasica}/forecast.json?key=${key}&q=${ciudad}&days=1&aqi=no&alerts=no`);
    if (forecastWeather != null)  {
        showSectionWeather(forecastWeather);
    } 
   
}

getInfoWeather();

function showError(txt) {
    containerPpal.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = txt;
    containerPpal.appendChild(div);
}

export default getInfoWeather;
