// select HTML elements in the document

const display = document.querySelector("article");

const apiKey = '1239f81b2a6cc0c2674caa34d85f1c99';
const zipCode = 86179;
const countryCode = 'mx'
const units = 'metric';
const lat = 32.421;
const lon = -104.229;

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();



  function displayResults(weatherData) {
    const now = new Date();
    const currentDay = now.getDate();
    const currentHour = now.getHours();
    

    const listArray = weatherData.list;
    var counter = 1;

    for (var j=0; j < listArray.length; j++) {
      const hourInList = parseInt(weatherData.list[j].dt_txt.substr(11,2));
      const hourInListNext = parseInt(weatherData.list[j+1].dt_txt.substr(11,2));
      const dayInList = parseInt(weatherData.list[j].dt_txt.substr(8,2));
      
      if (currentDay+counter == dayInList && counter <= 3) {
        if (currentHour >= hourInList && currentHour <= hourInListNext){
          console.log(j,currentDay,currentDay+counter,currentHour,dayInList,hourInList,counter,'in');

          let card = document.createElement('section');
          let span1 = document.createElement('span');
          let image = document.createElement('img');
          let span2 = document.createElement('span');
          let span3 = document.createElement('span');

          let yearInList = parseInt(weatherData.list[j].dt_txt.substr(0,4));
          let monthInList = parseInt(weatherData.list[j].dt_txt.substr(5,2));

          var event = new Date(yearInList, monthInList-1, dayInList);
          console.log(event.toDateString(),' ',weatherData.list[j].dt_txt);
          var dStrings = event.toString();
          var dArrays = dStrings.split(' ');
          var dateInList =  `${dArrays[0]}, ${dArrays[1]} ${dArrays[2]}`;

          span1.textContent = dateInList;
          card.appendChild(span1);
                  
          image.src = `https://openweathermap.org/img/w/${weatherData.list[j].weather[0].icon}.png`;
          image.setAttribute('alt', 'OpenWeatherMap Icon');
          card.appendChild(image);
        
          span2.textContent = `${weatherData.list[j].main.temp.toFixed(0)}°C`;
          card.appendChild(span2);

          span3.textContent = `${weatherData.list[j].weather[0].description}`;
          span3.setAttribute('style','padding-left:5px');
          card.appendChild(span3);
        
          display.appendChild(card);

          counter += 1;
        }  
        
      }
      console.log(j,currentDay,currentDay+counter,currentHour,dayInList,hourInList,counter,'out');
    }


  }
