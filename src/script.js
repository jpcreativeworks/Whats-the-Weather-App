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

function fetchWeather(city) {
  let apiKey = "e0906538bb594019bc3d31cbe5e89144";
  let apiUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let weatherData = response.data.data[0];
  let city = weatherData.city_name;
  let temperature = Math.round(weatherData.temp);

  document.querySelector("#city").innerHTML = city;
  document.querySelector("#temperature").innerHTML = `${temperature}`;
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
