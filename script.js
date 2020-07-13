let apiKey = "d07623e18376563d1e53dd1323063f19"
let units = "celsius"
let searchMethod

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
        searchMethod = "zip"
    else
        searchMethod = "q"
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm)
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${apiKey}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    });
}

function init(resultFromServer) {
    switch(resultFromServer.weather[0].main){
        case "Clear":
            document.body.style.backgroundImage = 'url("assets//sunny.jpg")'
            break;
        case "Clouds":
            document.body.style.backgroundImage = 'url("assets//cloudy.jpg")'
            break;
        case "Rain":
            document.body.style.backgroundImage = 'url("assets//drizzle.jpg")'
            break;
        case "Drizzle":
            document.body.style.backgroundImage = 'url("assets//sunny.jpg")'
            break;
        case "Mist":
            document.body.style.backgroundImage = 'url("assets//drizzle.jpg")'
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("assets//storm.jpg")'
            break;
        case "Snow":
            document.body.style.backgroundImage = 'url("assets//snow.jpg")'
            break;
        case "Drizzle":
            document.body.style.backgroundImage = 'url("assets//drizzle.jpg")'
        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader")
    let temperatureElement = document.getElementById("temperature")
    let humidityElement = document.getElementById("humidity")
    let windSpeedElement = document.getElementById("windSpeed")
    let cityHeader = document.getElementById("cityHeader")
    let weatherIcon = document.getElementById("documentIconImg")
    let realFeelElement = document.getElementById("feel")
    let tempWeatherMinElement = document.getElementById("tempWeatherMin")
    let tempWeatherMaxElement = document.getElementById("tempWeatherMax")
    let searchInputElement = document.getElementById("searchInput")

    weatherIcon.src = "http://openweathermap.org/img/wn/" + resultFromServer.weather[0].icon + ".png"

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    tempWeatherMinElement.innerHTML = "Temp Min : "+ Math.floor(resultFromServer.main.temp_min-273) + "&#176 | " 
    tempWeatherMaxElement.innerHTML = "Temp Max : "+ Math.floor(resultFromServer.main.temp_max-273) +"&#176 | "

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp-273) + "&#176"
    windSpeedElement.innerHTML = "Winds at " + Math.floor(resultFromServer.wind.speed) + " m/s"
    cityHeader.innerHTML = resultFromServer.name +", "+ resultFromServer.sys.country
    humidityElement.innerHTML = "Humidity levels at " + resultFromServer.main.humidity + "%"
    realFeelElement.innerHTML = "Real feel : " + Math.floor(resultFromServer.main.feels_like-273) + "&#176"
    searchInputElement.value = resultFromServer.name +", "+ resultFromServer.sys.country

    prepareWeatherInfo()
}

document.getElementById("searchButton").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value;
    if(searchTerm)
        searchWeather(searchTerm);
});

// Get the input field
var searchInput = document.getElementById("searchInput");

// Execute a function when the user releases a key on the keyboard
searchInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    let searchTerm = document.getElementById("searchInput").value;
    if(searchTerm)
        searchWeather(searchTerm);
  }
});

function prepareWeatherInfo(){
    let weatherContainer = document.getElementById("weatherContainer")
    let weatherContainerHeight = weatherContainer.clientHeight
    let weatherContainerWidth = weatherContainer.clientWidth

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`
    weatherContainer.style.visibility = "visible"
}