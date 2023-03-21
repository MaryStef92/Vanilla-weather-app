function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Suturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElem = document.querySelector("#temperature");
  let cityElem = document.querySelector("#city");
  let descriptionElem = document.querySelector("#description");
  let humidityElem = document.querySelector("#humidity");
  let windElem = document.querySelector("#wind");
  let dateElem = document.querySelector("#date");
  let iconElem = document.querySelector("#icon");

  temperatureElem.innerHTML = Math.round(response.data.main.temp);
  cityElem.innerHTML = response.data.name;
  descriptionElem.innerHTML = response.data.weather[0].main;
  humidityElem.innerHTML = response.data.main.humidity;
  windElem.innerHTML = Math.round(response.data.wind.speed);
  dateElem.innerHTML = formatDate(response.data.dt * 1000);
  iconElem.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElem.setAttribute("alt", response.data.weather[0].main);
}

let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
let city = "Stockholm";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
