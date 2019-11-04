function showCurrentDate() {
  let now = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let today = weekDays[now.getDay()];
  let month = months[now.getMonth()];
  let day = now.getDate();
  let date = document.querySelector("#date");

  document.querySelector("#week-day").innerHTML = `${today}`;
  date.innerHTML = `${month} ${day}`;
}

function convertTime(timestamp) {
  let time = new Date(timestamp);
  let hour = time.getHours();
  let minutes = time.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function displayWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let minimumTemperature = document.querySelector("#minimum-temperature");
  let maximumTemperature = document.querySelector("#maximum-temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let weatherIcon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  let lastUpdatedTime = document.querySelector("#time");

  degreesCelsius = response.data.main.temp;

  currentTemperature.innerHTML = Math.round(degreesCelsius);
  city.innerHTML = response.data.name;

  weatherDescription.innerHTML = response.data.weather[0].main;
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].main);
  lastUpdatedTime.innerHTML = convertTime(response.data.dt * 1000);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = null;
  let forecastResults = null;

  for (let index = 0; index < 6; index++) {
    forecastResults = response.data.list[index];
    forecast.innerHTML += `
      <div class="col-2">
        <span><strong>${Math.round(
          forecastResults.main.temp_max
        )}º </strong>${Math.round(forecastResults.main.temp_min)}º</span>
        <img src="https://openweathermap.org/img/wn/${
          forecastResults.weather[0].icon
        }@2x.png" alt="${forecastResults.weather[0].main}" />
        <span>${convertTime(forecastResults.dt * 1000)}</span>
      </div>`;
  }
}

function convertSunHours(response) {
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");

  sunrise.innerHTML = convertTime(response.data.sys.sunrise * 1000);
  sunset.innerHTML = convertTime(response.data.sys.sunset * 1000);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let degreesFahrenheit = degreesCelsius * (9 / 5) + 32;
  currentTemperature.innerHTML = Math.round(degreesFahrenheit);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(degreesCelsius);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  getWeather(cityInput.value);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0438fc32e86f8783300a37cf62f26092";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(convertSunHours);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function getWeather(city) {
  if (city === "") {
    return false;
  } else {
    let apiKey = "0438fc32e86f8783300a37cf62f26092";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
    axios.get(apiUrl).then(convertSunHours);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
}

let degreesCelsius = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

let current = document.querySelector("#current");
current.addEventListener("click", getCurrentLocation);

getWeather("Póvoa de Varzim");
showCurrentDate();
