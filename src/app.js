function displayWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let minimumTemperature = document.querySelector("#minimum-temperature");
  let maximumTemperature = document.querySelector("#maximum-temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  temperature.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].main;
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "0438fc32e86f8783300a37cf62f26092";
let city = "Póvoa de Varzim";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
