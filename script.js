//change greeting accordingly to hour
changeColor();
function changeColor() {
  let now = new Date();
  now.getHours();
  let hour = now.getHours();
  let sentence = document.querySelector("h3#nameGreeting");
  if (hour >= 0 && hour <= 6) {
    sentence.innerHTML = `Good morning`;
    document.body.style.background =
      "linear-gradient(to right, #b2afcf, #dddd86d3)";
  } else if (hour < 12) {
    sentence.innerHTML = `Good morning`;
    document.body.style.background =
      "linear-gradient(to right, #e9d38be7, #e98a0575)";
  } else if (hour >= 12 && hour < 20) {
    sentence.innerHTML = `Good afternoon`;
    document.body.style.background =
      "linear-gradient(to right, #D6A4A4, #DAE2F8)";
  } else if (hour < 24) {
    sentence.innerHTML = `Good evening`;
    document.body.style.background =
      "linear-gradient(to right, #5473b9, #212f4d)";
    let git = (document.querySelector("#gitText").style.color = "#fff");
  } else {
    sentence.innerHTML = `Hello`;
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

//change the display of forecast days
  function formatDay(timestamp) {
    //to convert the timestamp from a number to a 
    let date = new Date(timestamp * 1000);
    console.log(date);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return days[day];
  }
  
//create and multiply the display for forecast in html
function displayForecast(response) {
  console.log(response.data);

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col-2">
          <div class="weatherFDate">${formatDay(forecastDay.dt)}</div>
      
      
          <div>
          <img src="changeIconSmall(response)" alt="icon" width="30px" id="imgWeatherIcon">
      </div>
      
          <div class="weatherFTemp">
         <div>${Math.round(forecastDay.temp.max)}º</div>
         </div>
      
          <div class="weatherFTemp minTemp">
          <div>${Math.round(forecastDay.temp.min)}º</div>
          </div>
     </div>
      `;
    }
  });
 

  function changeIconSmall(response) {
    response = response.data.daily[1].weather[0].main;
    //change icon
    let iconSmall = document.querySelector("#imgWeatherIcon");
    if (response === "Clear") {
      iconSmall.setAttribute("src", "imgs/bSun.png");
    } else if (response === "Rain") {
      iconSmall.setAttribute("src", "imgs/bRain.png");
    } else if (response === "Clouds") {
      iconSmall.setAttribute("src", "imgs/bCloud.png");
    } else if (response === "Snow") {
      iconSmall.setAttribute("src", "imgs/bSnow.png");
    } else if (response === "Haze") {
      iconSmall.setAttribute("src", "imgs/bHaze.png");
    } else if (response === "Thunderstorm") {
      iconSmall.setAttribute("src", "imgs/bStorm.png");
    } else {
      iconSmall.setAttribute("src", "imgs/bFogMist.png");
    }
  }
  
  //alert(response.data.daily[1].weather[0].main); //test only
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
  //console.log(forecastHtml); //test only
  changeIconSmall(response);
}


//get and display the coordinates(latitude and longitude (response.data.coord)) from the original API, called in the showTemp function
function getForecast(coordinates) {
  console.log(coordinates);
  let unit = "metric";
  let apiKey = "152e233758619b99e839957040e5e546";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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

  changeIcon(response);
  //displayForecast();
  getForecast(response.data.coord);
}

// change the city in the URL to the searched input
function searchCity(city) {
  let apiKey = "152e233758619b99e839957040e5e546";
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
//makes the default value of Porto and unit to metric, instead of showing empty once you load the page and with absolute unit(kelvin)
let unit = "metric";
searchCity("Porto");

function changeIcon(response) {
  //change icon
  let icon = document.querySelector("#imgWeather");
  let iconSmall = document.querySelector("#imgWeatherIcon");
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
document.querySelector("#celsius").addEventListener("click", changeTempC);
function changeTempC(event) {
  event.preventDefault();
  unit = "metric";
  searchCity(document.querySelector("#currentCity").innerHTML);
}
//define fahrenheit button and add event listener
document.querySelector("#fahrenheit").addEventListener("click", changeTempF);
function changeTempF(event) {
  event.preventDefault();
  unit = "imperial";
  searchCity(document.querySelector("#currentCity").innerHTML);
}
