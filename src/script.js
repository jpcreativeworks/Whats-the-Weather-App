function search(event) {
  event.preventDefault();
  let searchCityRequest = document.querySelector("#search-input");
  let city = searchCityRequest.value.trim();

  if (city) {
    console.log(`searching for ${city}`);
    fetchWeather(city);
  } else {
    alert("Please enter a valid city.");
  }
}

function formatDateTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let dayIndex = now.getDay();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfWeek[dayIndex];
  let amPm;
  if (hours >= 12) {
    amPm = "PM";
  } else {
    amPm = "AM";
  }

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours % 12;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedTime = `${day} ${hours}:${minutes} ${amPm}`;
  document.querySelector(".current").innerHTML = formattedTime;
}

formatDateTime();

setInterval(formatDateTimeDateTime, 60000);

function fetchWeather(city) {
  let apiKey = "e0906538bb594019bc3d31cbe5e89144";
  let apiUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let weatherData = response.data.data[0];
  let city = weatherData.city_name;
  let temperature = Math.round(weatherData.temp);
  let humidity = weatherData.rh;
  let windSpeedKmh = weatherData.wind_spd * 3.6;
  let windSpeedMph = Math.round(windSpeedKmh * 0.621371);
  let weatherDescription = weatherData.weather.description;
  let weatherIconCode = weatherData.weather.icon;

  document.querySelector("#city").innerHTML = city;
  document.querySelector("#temperature").innerHTML = `${temperature}`;
  document.querySelector("#humidPercent").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${windSpeedMph} mph`;
  document.querySelector("#description").innerHTML = weatherDescription;

  let iconElement = document.querySelector("#weather-icon");
  let newIconUrl = `https://www.weatherbit.io/static/img/icons/${weatherIconCode}.png`;

  if (weatherIconCode) {
    iconElement.src = newIconUrl;
  } else {
    iconElement.src = "https://www.weatherbit.io/static/img/icons/c02d.png";
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
//axios
// .get(apiUrl)
//  .then((response) => {
//   console.log("weather data:", response.data);
// })
// .catch((error) => {
//   console.error(
//   "error fetching data",
//   error.response ? error.response.data : error.message
// );
//  });
