document.getElementById("submit").addEventListener("click", function(){
  //  var sumDay0 = 0, sumDay1 = 0, sumDay2 = 0, sumDay3 = 0, sumDay4 = 0;
    const tplCityWeather = document.getElementById("tpl-city-weather");
    const target = document.getElementById("target");
    let weatherInfo = [];
    let city = document.getElementById("city").value;

// Make a request for a user with a given ID
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&APPID=0624529f33603cdd04d328d40402fb19')
        .then(function (response) {
            target.innerText = "";
            weatherInfo = response;
            target.appendChild(tplCityWeather.content.cloneNode(true));
            let cityName = document.getElementById("cityName");
            cityName.innerText = city;
            cityName.style.textTransform = "capitalize";
            weatherInfo.data.list.forEach(function(threeHourForecast, currentIndex) {
                const DAY_IN_MILLISECONDS = 86400000;
                const TOTAL_DAY_DATA_SET = 8;
                let date = new Date(threeHourForecast.dt * 1000); //make into milli so we can calculate
                let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let nameOfDay = days[date.getDay()];
                let today = new Date().getDay();
                    console.log("show me here "+ today);
                if(date % DAY_IN_MILLISECONDS === 0) {
                    if (currentIndex < TOTAL_DAY_DATA_SET) {
                        //creates the first day
                        let nameOfDay = days[date.getDay()-1];
                        let sum = 0;
                        let min = 100;  //temperature will never be over 100degrees but has enough distance to do calculation over 8 data periods
                        let max = -100; //same reasoning here for max
                        for (let i = 0; i < currentIndex; i++) {
                            //we know that a full day complete is equal to 8 data points thus adding 8 here will display values for a complete day
                            if (weatherInfo.data.list[i].main.temp_min < min) {
                                min = weatherInfo.data.list[i].main.temp_min;
                            }
                            if (weatherInfo.data.list[i].main.temp_max > max) {
                                max = weatherInfo.data.list[i].main.temp_max;
                            }
                            sum += Math.round(weatherInfo.data.list[i].main.temp);
                            console.log("sum "+sum);
                            var average = sum/currentIndex;
                            console.log("first day ave" + average);
                        }
                            let dayBlock = document.createElement("div");
                            dayBlock.className = 'weather_info';
                            dayBlock.innerHTML =
                                `<div class="day">
                                    <h4 class="weather_info">${nameOfDay}</h4>
                                    <img src="http://openweathermap.org/img/wn/${weatherInfo.data.list[currentIndex + 3].weather[0].icon}@2x.png">
                                    <p>Average Temperature</p>
                                    <span class="degrees">${Math.round(average)}&#8451;</span>
                                    <p>Minimum Temperature</p>
                                    <span class="degrees">${Math.round(min)}&#8451;</span>
                                    <p>Maximum Temperature</p>
                                    <span class="degrees">${Math.round(max)}&#8451;</span>
                                </div>`;
                            target.appendChild(dayBlock);
                    }
                    console.log(nameOfDay);
                    let sum = 0;
                    let min = 100;  //temperature will never be over 100degrees but has enough distance to do calculation over 8 data periods
                    let max = -100; //same reasoning here for max
                    for (let i = currentIndex; i < currentIndex + TOTAL_DAY_DATA_SET; i++) {
                        //we know that a full day complete is equal to 8 data points thus adding 8 here will display values for a complete day

                        if (weatherInfo.data.list[i].main.temp_min < min) {
                            min = weatherInfo.data.list[i].main.temp_min;
                        }
                        if (weatherInfo.data.list[i].main.temp_max > max) {
                            max = weatherInfo.data.list[i].main.temp_max;
                        }
                        sum += Math.round(weatherInfo.data.list[i].main.temp);
                        console.log("sum "+sum);
                        var average = sum/TOTAL_DAY_DATA_SET;
                        console.log(average);
                    }
                    let dayBlock = document.createElement("div");
                    dayBlock.className = 'weather_info';
                    dayBlock.innerHTML =
                        `<div class="day">
                            <h4 class="weather_info">${nameOfDay}</h4>
                            <img src="http://openweathermap.org/img/wn/${weatherInfo.data.list[currentIndex + 3].weather[0].icon}@2x.png">
                            <p>Average Temperature</p>
                            <span class="degrees">${Math.round(average)}&#8451;</span>
                            <p>Minimum Temperature</p>
                            <span class="degrees">${Math.round(min)}&#8451;</span>
                            <p>Maximum Temperature</p>
                            <span class="degrees">${Math.round(max)}&#8451;</span>
                         </div>`;
                    target.appendChild(dayBlock);
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });
});
