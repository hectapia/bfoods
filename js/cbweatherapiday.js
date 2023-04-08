// select HTML elements in the document




const cityTemp = document.querySelector('#city-name');
const cityDay = document.querySelector('#city-day');
const cityHumidity = document.querySelector('#city-humidity');
const currentTemp = document.querySelector('#current-temp');
const weatherIconDay = document.querySelector('#weather-icon');
const captionDescDay = document.querySelector('#descript');

const apiKeyDay = '1239f81b2a6cc0c2674caa34d85f1c99';

const zipCodeDay = 92008;
const countryCodeDay = 'us'
const unitsDay = 'metric';
const latDay = 32.421;
const lonDay = -104.229;

const urlDay = `https://api.openweathermap.org/data/2.5/weather?lat=${latDay}&lon=${lonDay}&appid=${apiKeyDay}&units=${unitsDay}`;

//const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode2},${countryCode2}&appid=${apiKey2}&units=${units2}`;



async function apiFetchDay() {
    try {
      const responseDay = await fetch(urlDay);
      if (responseDay.ok) {
        const dataDay = await responseDay.json();
        console.log(dataDay); // this is for testing the call
        displayResultsDay(dataDay);
      } else {
          throw Error(await responseDay.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetchDay();

  function displayResultsDay(weatherData) {
    var utcSeconds = weatherData.dt; 
    var date = new Date(utcSeconds*1000);
    var dString = date.toString();
    var dArray = dString.split(' ');
    var d =  `${dArray[0]}, ${dArray[1]} ${dArray[2]}`;

    cityDay.innerHTML = `${d}`;

    cityTemp.innerHTML = `<strong>${weatherData.name}</strong>`;
    cityHumidity.innerHTML = `Humidity ${weatherData.main.humidity}%`;
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}°C</strong>`;
    const iconsrcDay = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const descDay = weatherData.weather[0].description;
    const descAsArrayDay = descDay.split(' ')
  
    for (var i=0; i < descAsArrayDay.length; i++) {
        descAsArrayDay[i] = descAsArrayDay[i].charAt(0).toUpperCase() + descAsArrayDay[i].slice(1);
    };

    const descUpperCaseDay = descAsArrayDay.join(' ');

    weatherIconDay.setAttribute('src', iconsrcDay);
    weatherIconDay.setAttribute('alt', descUpperCaseDay);
    captionDescDay.textContent = descUpperCaseDay;
  }
