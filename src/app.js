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

  date.innerHTML = `${today}, ${month} ${day}`;
}

function convertUpdatedTime(response) {
  let lastUpdatedTime = document.querySelector("#time");
  let unixTime = response.data.dt;
  let time = new Date(unixTime * 1000);
  let hour = time.getHours();
  let minutes = time.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  lastUpdatedTime.innerHTML = `${hour}:${minutes}`;
}

function displayWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let minimumTemperature = document.querySelector("#minimum-temperature");
  let maximumTemperature = document.querySelector("#maximum-temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let weatherIcon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;

  temperature.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
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
}

function convertSunHours(response) {
  let sunrise = document.querySelector("#sunrise");
  let sunriseUnix = response.data.sys.sunrise;
  let sunriseTime = new Date(sunriseUnix * 1000);
  let sunriseHour = sunriseTime.getHours();
  let sunriseMin = sunriseTime.getMinutes();
  let sunset = document.querySelector("#sunset");
  let sunsetUnix = response.data.sys.sunset;
  let sunsetTime = new Date(sunsetUnix * 1000);
  let sunsetHour = sunsetTime.getHours();
  let sunsetMin = sunsetTime.getMinutes();

  if (sunriseHour < 10) {
    sunriseHour = `0${sunriseHour}`;
  }
  if (sunriseMin < 10) {
    sunriseMin = `0${sunriseMin}`;
  }
  if (sunsetHour < 10) {
    sunsetHour = `0${sunsetHour}`;
  }
  if (sunsetMin < 10) {
    sunsetMin = `0${sunsetMin}`;
  }

  sunrise.innerHTML = `${sunriseHour}:${sunriseMin}`;
  sunset.innerHTML = `${sunsetHour}:${sunsetMin}`;
}

let apiKey = "0438fc32e86f8783300a37cf62f26092";
let city = "Póvoa de Varzim";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
axios.get(apiUrl).then(convertUpdatedTime);
axios.get(apiUrl).then(convertSunHours);

showCurrentDate();
