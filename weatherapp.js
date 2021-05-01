const notificationElement = document.getElementById('notification')
const iconElement = document.getElementById('weather-icon')
const tempElement = document.querySelector('.temperature-value p')
const tempmaxElement = document.querySelector('.temperature-max p')
const tempminElement = document.querySelector('.temperature-min p')
const descElement = document.querySelector(".temperature-desc p")
const locationElement = document.querySelector('.location p')

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}
weather.tempmax = {
}
weather.tempmin = {
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "a519371b7b78378e41001e8c664315eb";

// SET USER'S POSITION
function getLocation(){
    let cityname = document.getElementById('city');
    window.console.log(cityname.value)
    
    getWeather(cityname);
}

// GET WEATHER FROM API PROVIDER
function getWeather(cityname){
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&lang=pt_br&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.tempmax = Math.floor(data.main.temp_min - KELVIN);
            weather.tempmin = Math.floor(data.main.temp_max - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            window.console.log(weather)
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempmaxElement.innerHTML = `Temp. máx: ${weather.tempmax}°<span>C</span>`;
    tempminElement.innerHTML = `Temp. min: ${weather.tempmin}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        let fahrenheitmax = celsiusToFahrenheit(weather.tempmax);
        let fahrenheitmin = celsiusToFahrenheit(weather.tempmin);
        fahrenheit = Math.floor(fahrenheit);
        fahrenheitmax = Math.floor(fahrenheit);
        fahrenheitmin = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        tempmaxElement.innerHTML = `Temp. máx: ${fahrenheitmax}°<span>C</span>`;
        tempminElement.innerHTML = `Temp. min: ${fahrenheitmin}°<span>C</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        tempmaxElement.innerHTML = `Temp. máx: ${weather.tempmax}°<span>C</span>`;
        tempminElement.innerHTML = `Temp. min: ${weather.tempmin}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});