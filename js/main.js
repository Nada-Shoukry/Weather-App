// Selecting Elements ..

const searchLocationInput = document.getElementById("searchLocation");

const todayName = document.getElementById("todayName");
const todayDate = document.getElementById("todayDate");
const cityName = document.getElementById("cityName");
const tempreture = document.getElementById("tempreture");
const weatherStatus = document.getElementById("weather-status");
const statusIcon = document.getElementById("status-icon");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const direction = document.getElementById("direction");

const tomorrowName = document.getElementById("tomorrowName");
const tomorrowDate = document.getElementById("tomorrowDate");
const tomorrowStatus = document.getElementById("tomorrow-status");
const tMaxTemp = document.getElementById("tMaxTemp");
const tMinTemp = document.getElementById("tMinTemp");
const tWeather = document.getElementById("tWeather");

const afterTName =document.getElementById("afterTName");
const afterTDate =document.getElementById("afterTDate");
const afterTStatus =document.getElementById("afterT-status");
const maxTempAfterT =document.getElementById("maxTempAfterT");
const minTempAfterT =document.getElementById("minTempAfterT");
const weatherAfterT =document.getElementById("weatherAfterT");


// ==== Geo-Location Navigator ======

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        getWeatherData(`${lat},${long}`);
    })
} else {
    // window.alert("Allow Location!");
    console.log ("Not Allowed");
}

// ====== get Weather Data ======

async function getWeatherData (query){
    let response = await fetch (`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=0bbc9484642d46e598b230802241006`);
    let data = await response.json();
    console.log(data);
    displayTodayWeather(data);
    displayTomorrow (data);
    displayAfterTomorrow (data);
}

searchLocationInput.addEventListener("input", function(e){
    getWeatherData(e.target.value);
})

// ====== Today Weather =====

function displayTodayWeather (data){
    console.log (data.current.last_updated ,'Date');

    const lastDateUpdate = data.current.last_updated ;
    let date = new Date(lastDateUpdate);
    
    const currentDay = date.toLocaleString('en-us', {weekday :'long'});
    const currentDate = date.getDate();
    const currentMonth = date.toLocaleString('en-us',{month :'long'});

    const city = data.location.name ;
    const temp = data.current.temp_c ;
    const status = data.current.condition.text ;
    const statusImage = data.current.condition.icon ;
    const todayHumidity = data.current.humidity ;
    const todayWind = data.current.wind_kph ;
    const windDirection = data.current.wind_dir;

    todayName.innerHTML = currentDay;
    todayDate.innerHTML = `${currentDate} ${currentMonth}`;
    cityName.innerHTML = city ;
    tempreture.innerHTML = temp + " ْ c";
    weatherStatus.innerHTML = status;
    statusIcon.setAttribute("src", statusImage);
    humidity.innerHTML = `<i class="fa-solid fa-umbrella text-white me-1"></i> ${todayHumidity}`;
    wind.innerHTML = `<i class="fa-solid fa-wind text-white me-1"></i> ${todayWind} km/h`;
    direction.innerHTML = `<i class="fa-regular fa-compass text-white me-1"></i> ${windDirection}`;
}

// ====== Tomorrow Weather =====

function displayTomorrow ({forecast}){

    const tomorrow = forecast.forecastday[1].date;
    // console.log(tomorrow);
    // console.log(new Date(tomorrow));

    const nextDay = new Date(tomorrow).toLocaleString('en-us', {weekday :'long'});
    const nextDate = new Date(tomorrow).getDate();
    const tMonth = new Date(tomorrow).toLocaleString('en-us',{month :'long'});
    const tStatusImage = forecast.forecastday[1].day.condition.icon ;


    tomorrowName.innerHTML = nextDay;
    tomorrowDate.innerHTML =`${nextDate} ${tMonth}`;
    tomorrowStatus.setAttribute("src", tStatusImage);
    tMaxTemp.innerHTML = forecast.forecastday[1].day.maxtemp_c ;
    tMinTemp.innerHTML = forecast.forecastday[1].day.mintemp_c ;
    tWeather.innerHTML = forecast.forecastday[1].day.condition.text;

}

// ====== After Tomorrow Weather =====

function displayAfterTomorrow ({forecast}){

    const afterTomorrow = forecast.forecastday[2].date;
    // console.log(afterTomorrow);
    // console.log(new Date(afterTomorrow));

    const afterTDay = new Date(afterTomorrow).toLocaleString('en-us', {weekday :'long'});
    const afterDate = new Date(afterTomorrow).getDate();
    const afterMonth = new Date(afterTomorrow).toLocaleString('en-us',{month :'long'});
    const afterStatusImage = forecast.forecastday[2].day.condition.icon ;


    afterTName.innerHTML = afterTDay;
    afterTDate.innerHTML =`${afterDate} ${afterMonth}`;
    afterTStatus.setAttribute("src", afterStatusImage);
    maxTempAfterT.innerHTML = forecast.forecastday[2].day.maxtemp_c ;
    minTempAfterT.innerHTML = forecast.forecastday[2].day.mintemp_c ;
    weatherAfterT.innerHTML = forecast.forecastday[2].day.condition.text;

}

