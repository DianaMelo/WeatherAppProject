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
let currentDay = document.getElementById("day");
currentDay.innerHTML = `<strong>${day}</srong>`;

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
//!!! if I press enter it call the function to current location and not the form city search !!!
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
  console.log(response.data);
  //console.log(response.data.main.temp);
  //show searched city
  let sunriseText = document.querySelector("#sunrise");
  let sunsetText = document.querySelector("#sunset");
  let city = response.data.name;
  let country = response.data.sys.country;
  let heading = (document.querySelector(
    "#currentCity"
  ).innerHTML = `${city}, ${country}`);
  //define and show main temp
  let temperature = Math.round(response.data.main.temp);
  let bigTemp = (document.querySelector(
    "#bigTemp"
  ).innerHTML = `${temperature} <small>º</small>`);
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
  //define and show cloud %cloud
  let cloudsInput = Math.round(response.data.clouds.all);
  let clouds = (document.querySelector("#clouds").innerHTML = cloudsInput);
  //define and show humidity
  let humidtyInput = Math.round(response.data.main.humidity);
  let humidity = (document.querySelector("#humidity").innerHTML = humidtyInput);
  let visibility = Number(response.data.sys.visibility);
  let timezone = response.data.timezone;
  sunriseText.innerHTML = sunTime(
    (response.data.sys.sunrise + timezone - 3600) * 1000
  );
  //3600 == minus 1h because of summer time from Mar 28 –  Oct 31
  sunsetText.innerHTML = sunTime(
    (response.data.sys.sunset + timezone - 3600) * 1000
  );
  //alert(typeof(visibility));
  changeIcon(response);
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

/*data options
data.weather[0].main="Rain"/.description="light rain"
data.weather[0].main="Rain"/.description="moderate rain"
data.weather[0].main="Rain"/.description="heavy intensity rain"
data.weather[0].main="Drizzle"/.description="light intensity drizzle"
data.weather[0].main="Clear"/.description="clear sky"
data.weather[0].main="Haze"/.description="haze"
data.weather[0].main="Clouds"/.description="broken clouds"
data.weather[0].main="Clouds"/.description="overcast clouds"
data.weather[0].main="Clouds"/.description="scattered clouds"
data.weather[0].main="Clouds"/.description="few clouds"
data.weather[0].main="Snow"/.description="light snow"
data.weather[0].main="Snow"/.description="heavy snow"
*/

/*
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
*/

/*NA
//show more details button
let plusButton = document.querySelector("#plus");
plusButton.addEventListener("click", showMore);
function showMore() {
  let div = document.getElementById("bottomDiv");
  let iconPlus = document.getElementById("plus");
 div.style.display = "block";
 iconPlus.style.display = "none";
}

//cancel show more details button
let cancelationButton = document.querySelector("#cancelButton");
cancelationButton.addEventListener("click", cancelButton);

function cancelButton() {
  let cancel = document.getElementById("cancelButton");
  let div = document.getElementById("bottomDiv");
  div.style.display = "none";
}
*/

/*data options
data.weather[0].main="Rain"/.description="light rain"
data.weather[0].main="Rain"/.description="moderate rain"
data.weather[0].main="Rain"/.description="heavy intensity rain"
data.weather[0].main="Drizzle"/.description="light intensity drizzle"
data.weather[0].main="Clear"/.description="clear sky"
data.weather[0].main="Haze"/.description="haze"
data.weather[0].main="Clouds"/.description="broken clouds"
data.weather[0].main="Clouds"/.description="overcast clouds"
data.weather[0].main="Clouds"/.description="scattered clouds"
data.weather[0].main="Clouds"/.description="few clouds"
data.weather[0].main="Snow"/.description="light snow"
data.weather[0].main="Snow"/.description="heavy snow"
*/
