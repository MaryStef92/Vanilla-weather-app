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

function displayForecast() {
  let forecastElemnt = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
                <div class="weather-forecast-date">${day}</div>

                <img
                  src="https://openweathermap.org/img/wn/04d@2x.png"
                  alt=""
                  width="36"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temp-max">18° </span>
                  <spsan class="weather-forecast-temp-min">12°</spsan>
                </div>ss
            </div>
              `;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElemnt.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElem = document.querySelector("#temperature");
  let cityElem = document.querySelector("#city");
  let descriptionElem = document.querySelector("#description");
  let humidityElem = document.querySelector("#humidity");
  let windElem = document.querySelector("#wind");
  let dateElem = document.querySelector("#date");
  let iconElem = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;

  temperatureElem.innerHTML = Math.round(celsiusTemp);
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

function searchCity(city) {
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let cityInputElem = document.querySelector("#city-input").value;
  searchCity(cityInputElem);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElem = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElem.innerHTML = Math.round(fahrenheiTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElem = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElem.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Stockholm");
displayForecast();
