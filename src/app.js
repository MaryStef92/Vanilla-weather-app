function displayTemperature(response) {
  console.log(response.data);
  let temperatureElem = document.querySelector("#temperature");
  temperatureElem.innerHTML = Math.round(response.data.main.temp);
  let cityElem = document.querySelector("#city");
  cityElem.innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
