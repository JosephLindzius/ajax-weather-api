document.getElementById("submit").addEventListener("click", function(){
    var sum = 0;
    var weatherInfo = [];
    var city = document.getElementById("city").value;
// Make a request for a user with a given ID
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=0624529f33603cdd04d328d40402fb19')
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
            //  console.log(response.data);
            // always executed
   //  console.log(weatherInfo);
            for (let i = 0; i < 8; i++) {
              var currentDay = weatherInfo.data.list[i];
           //   console.log(weatherInfo.data.list[i]);
               sum = sum + currentDay.main.temp;
               console.log(sum);
               //var average = sum/8;
               //console.log(average);
            }
            var average = sum/8;
            console.log(average);

        });
});


//=M%C3%BCnchen,DE&appid=b6907d289e10d714a6e88b30761fae22