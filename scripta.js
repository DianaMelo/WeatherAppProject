//document.getElementById("day").innerHtml("Hello");
//document.getElementById("day").innerHTML = "Hello";
//document.querySelector("time").innerHTML = "Hello";

//change greeting with your name upon loading the page
greeting();
function greeting() {
  let now = new Date();
  now.getHours();
  let hour = now.getHours();

  // let name = prompt("What is your name?");
  let sentence = document.querySelector("h1#nameGreeting");

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
let currentDay = document.getElementById("day");
currentDay.innerHTML = day;

//change the hours and minutes
now.getHours();
let hour = now.getHours();
let minutes = now.getMinutes();
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
  .querySelector("#location")
  .addEventListener("click", showTemp); //should be geolocation
let form = document
  .querySelector("#searchForm")
  .addEventListener("submit", handleSubmit);
let buttonSearch = document
  .querySelector("#searchButton")
  .addEventListener("click", handleSubmit);

//show temperature according to our search input
function showTemp(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  //show searched city
  let city = response.data.name;
  let heading = (document.querySelector("#currentCity").innerHTML = city);
  //define and show main temp
  let temperature = Math.round(response.data.main.temp);
  let bigTemp = (document.querySelector("#bigTemp").innerHTML = temperature);
  //define and show min temp
  let minumumTemperarure = Math.round(response.data.main.temp_min);
  let minTemp = (document.querySelector(
    "#minTemp"
  ).innerHTML = minumumTemperarure);
  //define and show max temp
  let maximumTemperature = Math.round(response.data.main.temp_max);
  let maxTemp = (document.querySelector(
    "#maxTemp"
  ).innerHTML = maximumTemperature);
  // change the weather description
  let weatherInput = response.data.weather[0].description;
  let description = (document.querySelector(
    "#textBig"
  ).innerHTML = weatherInput);
  //define and show wind
  let windInput = Math.round(response.data.wind.speed);
  let wind = (document.querySelector("#wind").innerHTML = windInput);
  //define and feels like
  let feelsLikeInput = Math.round(response.data.main.feels_like);
  let feelsLike = (document.querySelector(
    "#feelsLike"
  ).innerHTML = feelsLikeInput);
  //define and show precipation //only when it rains it shows the precipitation
  //define and show humidity
  let humidtyInput = Math.round(response.data.main.humidity);
  let humidity = (document.querySelector("#humidity").innerHTML = humidtyInput);
}

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

function searchLocation(position) {
  let apiKey = "152e233758619b99e839957040e5e546";
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
  console.log(apiUrl);
}

//change the 1st input once loaded to our current location
let currentLocalButton = document.querySelector("#currentLocation");
currentLocalButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

searchCity("Porto"); //makes the default value of Porto, instead of showing empty once you load the page

//change cº to fº
let changTempButton = document.querySelector("#changeTemp");
changTempButton.addEventListener("click", changeTemperature);
function changeTemperature() {
  let bigTemp = document.querySelector("#bigTemp");
  tempNow = Number(bigTemp.innerText);
  tempNow = Math.round(tempNow * 1.8 + 32);
  let textTemp = document.querySelector("#bigTempText");
  textTemp.innerHTML = `${tempNow}ºF`;

  let minTemp = document.querySelector("#minTemp");
  tempNowMin = Number(minTemp.innerText);
  tempNowMin = Math.round(tempNowMin * 1.8 + 32);
  minTemp.innerHTML = `${tempNowMin}`;

  let maxTemp = document.querySelector("#maxTemp");
  tempNowMax = Number(maxTemp.innerText);
  tempNowMax = Math.round(tempNowMax * 1.8 + 32);
  maxTemp.innerHTML = `${tempNowMax}`;

  let buttonChange = document.querySelector("#changeTemp");
  buttonChange.innerHTML = "Change to Cº";

  let feelsLike = document.querySelector("#feelsLike");
  tempFeels = Number(feelsLike.innerText);
  tempFeels = Math.round(tempFeels * 1.8 + 32);
  feelsLike.innerHTML = `${tempFeels}`;

  //not working
  let nextDay = document.querySelectorAll("span", ".tempSide");
  tempNext = Number(nextDay.innerText);
  tempNext = Math.round(tempNext * 1.8 + 32);
  nextDay.innerHTML = `${tempNext}`;
}

//show more details button
let plusButton = document.querySelector("#plus");
plusButton.addEventListener("click", showMore);
function showMore() {
  let div = document.getElementById("bottomDiv");
  div.style.display = "block";
  //document.body.style.background = alert("ok");
}

//cancel show more details button
let cancelationButton = document.querySelector("#cancelButton");
cancelationButton.addEventListener("click", cancelButton);

function cancelButton() {
  let cancel = document.getElementById("cancelButton");
  let div = document.getElementById("bottomDiv");
  div.style.display = "none";
}
