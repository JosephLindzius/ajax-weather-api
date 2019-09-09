document.getElementById("submit").addEventListener("click", function(){
    var sumDay0 = 0, sumDay1 = 0, sumDay2 = 0, sumDay3 = 0, sumDay4 = 0;
    var weatherInfo = [];
    var city = document.getElementById("city").value;
// Make a request for a user with a given ID
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&APPID=0624529f33603cdd04d328d40402fb19')
        .then(function (response) {
            // handle success
            //console.log(response);
            weatherInfo = response;

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {



           // attempt1
            /*
            for (let i = 0; i < 40; i++) {
                if (i < 8) {
                    const currentDay = weatherInfo.data.list[i];
                    sumDay0 += currentDay.main.temp;
                } else if (i >= 8 && i < 16) {
                    const currentDay = weatherInfo.data.list[i];
                    sumDay1 += currentDay.main.temp;
                } else if (i >= 16 && i < 24) {
                    const currentDay = weatherInfo.data.list[i];
                    sumDay2 += currentDay.main.temp;
                } else if (i >= 24 && i < 32) {
                    const currentDay = weatherInfo.data.list[i];
                    sumDay3 += currentDay.main.temp;
                } else {
                    const currentDay = weatherInfo.data.list[i];
                    sumDay4 += currentDay.main.temp;
                }
            }

            console.log(sumDay0/8);
            console.log(sumDay1/8);
            console.log(sumDay2/8);
            console.log(sumDay3/8);
            console.log(sumDay4/8);
*/
        });
});


//=M%C3%BCnchen,DE&appid=b6907d289e10d714a6e88b30761fae22