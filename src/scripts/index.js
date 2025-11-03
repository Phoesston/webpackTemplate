import { getWeather, getHourly, getForecast} from './fetchWeatherAPI.js';
import { autoComplete } from './autoComplete.js';

import '../styles/styles.css';

const input = document.getElementById('cityInput');
const suggestions = document.querySelector('.suggestions');
const weatherInfo = document.getElementById('weatherInfo');
const currentWeather = document.getElementById('current-weather');
const weatherGraphics = document.querySelector('.weather-graphics');
const weatherHourly = document.querySelector('.weather-hourly');
const weatherWeekly = document.querySelector('.weather-weekly');

let location = 'Tampa'

async function renderWeather(location){
    try{
        const processedData = await getWeather(location);
        const forecastData = await getForecast(location);

        const current = processedData.current;
        const condition = current.condition;

        currentWeather.innerHTML = `
            <div id="current-temperature">
                    <h2>${processedData.location.name}, ${processedData.location.region}, ${processedData.location.country}</h2>
                    <h1>${current.temp_f}°F</h1>
                    <div class="description">
                        <p>${condition.text}</p>
                        <p>feels like ${current.feelslike_f}°F</p>
                    </div>
                </div>
        `;

        weatherGraphics.innerHTML = `
            <img src="https:${condition.icon}" alt="${condition.text}">
            <p>Humidity: ${current.humidity}%</p>
            <p>UV Index: ${current.uv}</p>
        `;

        //hourly forecast
        forecastData.forecast.forecastday[0].hour.forEach(hour => {
            const hourCard = document.createElement('div');
            hourCard.classList.add('hour-card');

            hourCard.innerHTML = `
                <p>${hour.time.split(' ')[1]}</p>
                <img src="https:${hour.condition.icon}" alt="${hour.condition.text}">
                <p>${hour.temp_f}°F</p>
            `;
            weatherHourly.appendChild(hourCard);
        });

        //weekly forcast
        forecastData.forecast.forecastday.forEach(day =>{
            const dayCard = document.createElement('div');
            dayCard.classList.add('hour-card');

            const date = new Date(day.date);
            const options = { weekday: 'short', month: 'short', day: 'numeric' };

            dayCard.innerHTML = `
                <p>${date.toLocaleDateString(undefined, options)}</p>
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                <p>Max: ${day.day.maxtemp_f}°F</p>
                <p>Min: ${day.day.mintemp_f}°F</p>
            `;
            weatherWeekly.appendChild(dayCard);
        });

    }catch(error){
        weatherInfo.innerHTML = `<p>Error fetching weather: ${error.message}</p>`;
    }
}

input.addEventListener('keypress', async (e) => {
    suggestions.innerHTML = ''
    suggestions.classList.add('active');

    //search autocorrect
    const searchedData = await autoComplete(input.value.trim());
    for(let i = 0; i<Object.keys(searchedData).length; i++){
       
        const li = document.createElement('li');
        li.textContent = `${searchedData[i].name}, ${searchedData[i].region}, ${searchedData[i].country}`;

        li.addEventListener('click', async () =>{
            location = searchedData[i].name;
            renderWeather(location);

            suggestions.innerHTML = ''
            suggestions.classList.remove('active');
        });

        suggestions.appendChild(li);       
    }    

    

    
    if(e.key == 'Enter'){
        e.preventDefault();
        location = input.value.trim();

        suggestions.innerHTML = ''
        suggestions.classList.remove('active');

        if(location){
           renderWeather(location);
        }
    }
    
});



