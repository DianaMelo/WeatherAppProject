//change greeting accordingly to hour
changeGreeting();
function changeGreeting() {
  let now = new Date();
  now.getHours();
  let hour = now.getHours();
  let sentence = document.querySelector("h3#nameGreeting");
  if (hour >= 0 && hour <= 6) {
    sentence.innerHTML = `Good morning`;
  } else if (hour < 12) {
    sentence.innerHTML = `Good morning`;
  } else if (hour >= 12 && hour < 20) {
    sentence.innerHTML = `Good afternoon`;
  } else if (hour < 24) {
    sentence.innerHTML = `Good evening`;
  } else {
    sentence.innerHTML = `Hello`;
  }
}
//change the day
let now = new Date();
//access offset time = returns the time difference between UTC time and local time, in minutes.
let utctime = now.getTimezoneOffset();

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
  //console.log(date); //test only
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

//create and multiply the display for forecast in html
function displayForecast(response) {
  //console.log(response.data); //test only
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  forecast.forEach((forecastDay, index) => {
    if (index > 0 && index < 7) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col-2">
          <div class="weatherFDate">${formatDay(forecastDay.dt)}</div>
          <div>
          <img src="${changeIconSmall(
            forecastDay.weather[0].main
          )}" alt="icon" width="30px" id="imgWeatherIcon">
      </div>
          <div class="weatherFTemp">
         <div>${Math.round(forecastDay.temp.max)}??</div>
         </div>
          <div class="weatherFTemp minTemp">
          <div>${Math.round(forecastDay.temp.min)}??</div>
          </div>
     </div>
      `;
    }
  });

  //change icon for forescast
  function changeIconSmall(weather) {
    let iconSmall = "";
    if (weather === "Clear") {
      iconSmall = "imgs/bSun.png";
    } else if (weather === "Rain") {
      iconSmall = "imgs/bRain.png";
    } else if (weather === "Clouds") {
      iconSmall = "imgs/bCloud.png";
    } else if (weather === "Snow") {
      iconSmall = "imgs/bSnow.png";
    } else if (weather === "Haze") {
      iconSmall = "imgs/bHaze.png";
    } else if (weather === "Thunderstorm") {
      iconSmall = "imgs/bStorm.png";
    } else {
      iconSmall = "imgs/bFogMist.png";
    }
    return iconSmall;
  }

  //alert(response.data.daily[1].weather[0].main); //test only
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
  //console.log(forecastHtml); //test only
  changeIconSmall(response);
}

//get and display the coordinates(latitude and longitude (response.data.coord)) from the original API, called in the showTemp function
function getForecast(coordinates) {
  // console.log(coordinates); // test only
  // let unit = "metric";
  let apiKey = "152e233758619b99e839957040e5e546";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  //console.log(apiUrl); //test only
  axios.get(apiUrl).then(displayForecast);
}

//show temperature according to our search input
function showTemp(response) {
  //console.log(response.data.timezone); //test only
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
  let wind = windConverter(unit);

  function windConverter(unit) {
    let wind = document.querySelector("#wind");
    let windInput = response.data.wind.speed;
    if (unit === "metric") {
      wind.innerHTML = `${Math.round(windInput * 3.6)}km/h`;
    } else {
      wind.innerHTML = `${Math.round(windInput)}mph`;
    }
  }

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
  //define and change sunsire and sunset accordingly to timezone
  let sunriseText = document.querySelector("#sunrise");
  let sunsetText = document.querySelector("#sunset");
  //3600 == minus 1h because of summer time from Mar 28 ???  Oct 31
  if (utctime < 0) {
    sunriseText.innerHTML = sunTime(
      (response.data.sys.sunrise + timezone - 3600) * 1000
    );
    sunsetText.innerHTML = sunTime(
      (response.data.sys.sunset + timezone - 3600) * 1000
    );
  } else {
    sunriseText.innerHTML = sunTime(
      (response.data.sys.sunrise + timezone) * 1000
    );
    sunsetText.innerHTML = sunTime(
      (response.data.sys.sunset + timezone) * 1000
    );
  }
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
  //console.log(apiUrl); //test only
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

//change icon
function changeIcon(response) {
  let icon = document.querySelector("#imgWeather");
  let iconName = response.data.weather[0].icon;
  let weatherInput = response.data.weather[0].description;
  let weatherInputMain = response.data.weather[0].main;
  if (iconName === "01n") {
    icon.setAttribute("src", "imgs/bSunN.png");
  } else if (weatherInputMain === "Clear") {
    icon.setAttribute("src", "imgs/bSun.png");
  } else if (iconName === "09n" || iconName === "10n") {
    icon.setAttribute("src", "imgs/bRainN.png");
  } else if (weatherInputMain === "Rain" || weatherInput === "shower rain") {
    icon.setAttribute("src", "imgs/bRain.png");
  } else if (weatherInput === "light rain") {
    icon.setAttribute("src", "imgs/bRainy.png");
  } else if (iconName === "02n" || iconName === "03n" || iconName === "04n") {
    icon.setAttribute("src", "imgs/bCloudN.png");
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

//define celsius button and add event listener
document.querySelector("#celsius").addEventListener("click", changeTempC);
function changeTempC(event) {
  event.preventDefault();
  unit = "metric";
  searchCity(document.querySelector("#currentCity").innerHTML);
  getForecast();
}
//define fahrenheit button and add event listener
document.querySelector("#fahrenheit").addEventListener("click", changeTempF);
function changeTempF(event) {
  event.preventDefault();
  unit = "imperial";
  searchCity(document.querySelector("#currentCity").innerHTML);
  getForecast();
  alert(wind);
}
