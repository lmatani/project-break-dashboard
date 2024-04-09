const containerPpal = document.getElementById('sec-weather');
const urlBasica = 'https://api.weatherapi.com/v1';
const key = '248eb0dff5f14e1cadd175754240804';
const ciudad = 'Logrono';


function showCurrentWeather(currentWeather) {

        const title = document.createElement('h3');
        title.innerText = `${currentWeather.location.name} (${currentWeather.location.country})`;
        containerPpal.appendChild(title);

        const divCurrent = document.getElementById('current-weather');
        const imagen = document.createElement('img');
        imagen.src = currentWeather.current.condition.icon;
        imagen.alt =  currentWeather.current.condition.text; 
        divCurrent.appendChild(imagen); 
        const div = document.createElement('div');
        const text = document.createElement('p');
        text.className = 'text';
        text.innerText = currentWeather.current.condition.text;
       
        const temp = document.createElement('p');
        temp.className = 'temp';
        temp.innerHTML=`${Math.floor(currentWeather.current.temp_c)} ºC <i class="fa-solid fa-temperature-half"></i> `;
        ///temp.innerText = `${Math.floor(currentWeather.current.temp_c)} ºC`;
       
        div.appendChild(text);
        div.appendChild(temp);
        divCurrent.appendChild(div);

        const ulElem = document.createElement('ul');
        ulElem.id =  'values';
        const liElem1 = document.createElement('li');
        liElem1.innerHTML = `<span>Precipitación:</span> ${currentWeather.current.precip_mm} mm`;
        const liElem2 = document.createElement('li');
        liElem2.innerHTML = `<span>Humedad:</span> ${currentWeather.current.humidity} %`;
        const liElem3 = document.createElement('li');
        liElem3.innerHTML = `<span>Viento:</span> ${currentWeather.current.wind_kph} km/h`;
        ulElem.appendChild(liElem1);
        ulElem.appendChild(liElem2);
        ulElem.appendChild(liElem3);
        divCurrent.appendChild(ulElem);
        containerPpal.appendChild(divCurrent);

}

function showForecastWeatherHours(forecastWeather) {
    const divForecast = document.getElementById('forecast-weather');
    if (forecastWeather.forecast.forecastday != null) {
        forecastWeather.forecast.forecastday[0].hour.forEach(elemen => {
            const ulElem = document.createElement('ul');
            ulElem.className = 'forecast';
            const liElem1 = document.createElement('li');
            const arrTime = elemen.time.split(" ");
            liElem1.className = 'text-forecast';
            liElem1.innerText = arrTime[1];
            const liElem2 = document.createElement('li');
            const imagen = document.createElement('img');
            imagen.src = elemen.condition.icon;
            imagen.alt =  elemen.condition.text;  
            liElem2.appendChild(imagen);
            const liElem3 = document.createElement('li');
            liElem3.innerText = `${Math.floor(elemen.temp_c)} ºC`;
            liElem3.className = 'temp-forecast';
            ulElem.appendChild(liElem1);
            ulElem.appendChild(liElem2);
            ulElem.appendChild(liElem3);
            divForecast.appendChild(ulElem);
        });
       
    }
    
    containerPpal.appendChild(divForecast);
}

/*
function showForecastWeatherHours(forecastWeather) {
    const divForecast = document.getElementById('forecast-weather');
    if (forecastWeather.forecast.forecastday != null) {
        forecastWeather.forecast.forecastday[0].hour.forEach(elemen => {
            const div = document.createElement('div');
            div.className = 'forecast';
            const time = document.createElement('p');
            const arrTime = elemen.time.split(" ");
            time.innerText = arrTime[1];
            const imagen = document.createElement('img');
            imagen.src = elemen.condition.icon;
            imagen.alt =  elemen.condition.text;  
            const temp = document.createElement('p');
            temp.innerText = `${Math.floor(elemen.temp_c)} ºC`;
            temp.className = 'temp-forecast';
            div.appendChild(time);
            div.appendChild(imagen);
            div.appendChild(temp);
            divForecast.appendChild(div);
        });
       
    }
    
    containerPpal.appendChild(divForecast);
}
*/

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
        showCurrentWeather(forecastWeather);
        showForecastWeatherHours(forecastWeather);
        console.log(forecastWeather);
    
    } 
   
}

getInfoWeather();

function showError(txt) {
    containerPpal.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = txt;
    containerPpal.appendChild(div);
}


/*
function showForecastWeatherWeek(forecastWeather) {
    const divSection = document.createElement('div');
    divSection.id = 'forecast-weather';
    if (forecastWeather.forecast.forecastday != null) {
        forecastWeather.forecast.forecastday.forEach(forecastDay => {
            const divForecast = document.createElement('div');
            divForecast.className = 'forecast';
            const dayOfWeek = document.createElement('p');
            dayOfWeek.innerText = forecastDay.date;
            const imagen = document.createElement('img');
            imagen.src = forecastDay.day.condition.icon;
            imagen.alt =  forecastDay.day.condition.text;  
            const temp = document.createElement('p');
            temp.innerText = Math.floor(forecastDay.day.avgtemp_c);
            const tempMinMax = document.createElement('p');
            tempMinMax.innerText = `Min: ${Math.floor(forecastDay.day.mintemp_c)} ºC Max: ${Math.floor(forecastDay.day.maxtemp_c)} ºC`;
           // tempMinMax.innerText = `Temp: ${Math.floor(forecastDay.day.mintemp_c)} ºC - ${Math.floor(forecastDay.day.maxtemp_c)} ºC`;
            
            const tempMax = document.createElement('p');
            tempMax.innerText = Math.floor(forecastDay.day.maxtemp_c);
            divForecast.appendChild(dayOfWeek);
            divForecast.appendChild(imagen);
            //divForecast.appendChild(temp);
            divForecast.appendChild(tempMinMax);
            //divForecast.appendChild(temp);
            divSection.appendChild(divForecast);
        });
       
    }
    
    containerPpal.appendChild(divSection);
}

*/


