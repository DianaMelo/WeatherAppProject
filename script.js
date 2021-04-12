//document.getElementById("day").innerHtml("Hello");
//document.getElementById("day").innerHTML = "Hello";
//document.querySelector("time").innerHTML = "Hello";

//change greeting with your name upon loading the page
changeColor();
function changeColor() {
  let now = new Date();
  now.getHours();
  let hour = now.getHours();

  let sentence = document.querySelector("h2#nameGreeting");

  if (hour >= 0 && hour <= 6) {
    sentence.innerHTML = `Good morning <strong>${name}</strong>`;
    document.body.style.background =
      "linear-gradient(to right, #b2afcf, #dddd86d3)";
  } else if (hour < 12) {
    sentence.innerHTML = `Good morning <strong>${name}</strong>`;
    document.body.style.background =
      "linear-gradient(to right, #e9d38be7, #e98a0575)";
  } else if (hour >= 12 && hour < 20) {
    sentence.innerHTML = `Good afternoon <strong>${name}</strong>`;
    document.body.style.background =
      "linear-gradient(to right, #D6A4A4, #DAE2F8)";
  } else if (hour < 24) {
    sentence.innerHTML = `Good evening <strong>${name}</strong>`;
    document.body.style.background =
      "linear-gradient(to right, #928DAB, #3b2e88ad)";
  } else {
    sentence.innerHTML = `Hello <strong>${name}</strong>`;
    document.body.style.background =
      "linear-gradient(to right, #b2afcf, #dddd86d3)";
  }
}

//change the day
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentDay = (document.getElementById(
  "day"
).innerHTML = `<strong>${day}</srong>`);

//change the hours and minutes
now.getHours();
let hour = now.getHours();
hour = ("0" + hour).slice(-2);
//to convert the hours to two digits
let minutes = now.getMinutes();
minutes = ("0" + minutes).slice(-2);
//to convert the minutes to two digits
let hours = `${hour}:${minutes}`;

let currentTime = document.getElementById("time");
currentTime.innerHTML = hours;

//change text and display full date
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
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

document.getElementById("fullDate").innerHTML = `${date} of ${month}, ${year}`;

//change Location/City accordingly to the search input
let locationButton = document
  .querySelector("#currentLocation")
  .addEventListener("click", showTemp); //should be geolocation
let form = document
  .querySelector("#searchForm")
  .addEventListener("submit", handleSubmit);
let buttonSearch = document
  .querySelector("#searchButton")
  .addEventListener("click", handleSubmit);

//show temperature according to our search input
function showTemp(response) {
  //console.log(response.data.main.temp);
  console.log(response.data);

  //define and show city and country
  let city = response.data.name;
  let country = response.data.sys.country;
  let heading = (document.querySelector(
    "#currentCity"
  ).innerHTML = `${city}, ${country}`);

  //define celsius temperature
  //celsiusTemperature = Math.round(response.data.main.temp);
  //define main temp as the celsius temperature

  let temperature = Math.round(response.data.main.temp);

  //define and show main temp
  let mainTemp = (document.querySelector(
    "#bigTemp"
  ).innerHTML = `${temperature}`);
  //define and show min temp
  let minTemp = (document.querySelector("#minTemp").innerHTML = Math.round(
    response.data.main.temp_min
  ));
  //define and show max temp
  let maxTemp = (document.querySelector("#maxTemp").innerHTML = Math.round(
    response.data.main.temp_max
  ));
  // change the weather description
  let description = (document.querySelector("#textBig").innerHTML =
    response.data.weather[0].description);
  //define and show wind
  let wind = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  //define and feels like
  let feelsLike = (document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  ));
  //define and show cloud %cloud
  let clouds = (document.querySelector("#clouds").innerHTML = Math.round(
    response.data.clouds.all
  ));
  //define and show humidity
  let humidity = (document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  ));
  //define and access timezone
  let timezone = response.data.timezone;
  //define and change sunsire accordingly to timezone
  let sunriseText = (document.querySelector("#sunrise").innerHTML = sunTime(
    //3600 == minus 1h because of summer time from Mar 28 –  Oct 31
    (response.data.sys.sunrise + timezone - 3600) * 1000
  ));
  //define and change sunsire accordingly to timezone
  let sunsetText = (document.querySelector("#sunset").innerHTML = sunTime(
    //3600 == minus 1h because of summer time from Mar 28 –  Oct 31
    (response.data.sys.sunset + timezone - 3600) * 1000
  ));
  //alert(typeof(visibility));
  changeIcon(response);
}

//create global variable to be accessed everywhere
//let celsiusTemperature = null;

// change the city in the URL to the searched input
function searchCity(city) {
  let apiKey = "152e233758619b99e839957040e5e546";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

// handle the submit button and enter key
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

// change the city in the URL to your current location accordingly to your coordinates
function searchLocation(position) {
  let apiKey = "152e233758619b99e839957040e5e546";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
  console.log(apiUrl);
}

//change the 1st input once loaded to our current location
let currentLocalButton = document
  .querySelector("#currentLocation")
  .addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//makes the default value of Porto, instead of showing empty once you load the page
searchCity("Porto");

function changeIcon(response) {
  //change icon
  let icon = document.querySelector("#imgWeather");
  //let forecast = document.querySelector("#");
  let weatherInput = response.data.weather[0].description;
  let weatherInputMain = response.data.weather[0].main;

  if (weatherInputMain === "Clear") {
    icon.setAttribute("src", "imgs/bSun.png");
  } else if (weatherInputMain === "Rain" || weatherInput === "shower rain") {
    icon.setAttribute("src", "imgs/bRain.png");
  } else if (weatherInput === "light rain") {
    icon.setAttribute("src", "imgs/bRainy.png");
  } else if (
    (weatherInputMain === "Clouds" && weatherInput === "few clouds") ||
    weatherInput === "scattered clouds"
  ) {
    icon.setAttribute("src", "imgs/bCloudy.png");
  } else if (weatherInputMain === "Clouds") {
    icon.setAttribute("src", "imgs/bCloud.png");
  } else if (weatherInputMain === "Snow") {
    icon.setAttribute("src", "imgs/bSnow.png");
  } else if (weatherInputMain === "Haze") {
    icon.setAttribute("src", "imgs/bHaze.png");
  } else if (weatherInputMain === "Thunderstorm") {
    icon.setAttribute("src", "imgs/bStorm.png");
  } else {
    icon.setAttribute("src", "imgs/bFogMist.png");
  }
}

function sunTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  hours = ("0" + hours).slice(-2);
  let minutes = date.getMinutes();
  minutes = ("0" + minutes).slice(-2);
  return `${hours}:${minutes}`;
}
//see how to change the icon at night(hour)

//define celsius button and add event listener
let celsiusButton = document
  .querySelector("#celsius")
  .addEventListener("click", searchCity);

//define fahrenheit button and add event listener
let fahrenheitButton = document
  .querySelector("#fahrenheit")
  .addEventListener("click", searchCity);
//I wanted to create a new parameter to change the unit from metric to imperial, for ex: searchCity(city, unit="imperial")

/*
//change cº to fº
function changeTempF(event) {
  event.preventDefault();
  let bigTemp = document.querySelector("#bigTemp");
  let tempNow = Number(bigTemp.innerText);
  tempNow = Math.round(tempNow * 1.8 + 32);
  alert(tempNow.value);
  let textTemp = document.querySelector("#bigTempText");
  bigTemp.innerHTML = `${tempNow}`;

  let minTemp = document.querySelector("#minTemp");
  let tempNowMin = Number(minTemp.innerText);
  tempNowMin = Math.round(tempNowMin * 1.8 + 32);
  minTemp.innerHTML = `${tempNowMin}`;

  let maxTemp = document.querySelector("#maxTemp");
  let tempNowMax = Number(maxTemp.innerText);
  tempNowMax = Math.round(tempNowMax * 1.8 + 32);
  maxTemp.innerHTML = `${tempNowMax}`;

  let feelsLike = document.querySelector("#feelsLike");
  tempFeels = Number(feelsLike.innerText);
  tempFeels = Math.round(tempFeels * 1.8 + 32);
  feelsLike.innerHTML = `${tempFeels}`;
}

let celsiusTemp = null;
*/
