var userContainer = document.getElementById('users');
var fetchButton = document.getElementById('searchBtn');
var fiveDayForecast = document.getElementById('fiveDayForecast');
var singleDayForecast = document.getElementById('singleForecast')
var searchFiltersButton = document.getElementsByClassName('searchFilters')
var uviEl = document.getElementsByClassName('uviId')
var uviElid = document.getElementById('uviId')

function getApi1() { 
    const searchInputVal = document.getElementById('searchInput').value; //this gets the value from input
    localStorage.setItem('searchInputs', JSON.stringify(searchInputVal));
    var searchResults = localStorage.getItem("searchInputs");
    // var searchFiltersButton = document.getElementsByClassName('searchFilters')

    if (searchResults) { 
        var searchResultsEl = document.getElementById("searchResults")
        let searchFilters = document.createElement('button');
        searchFilters.className = "searchFilters";
        searchFilters.id="searchFilters"
        searchFilters.type="button"
        var searchFilterResults =  searchResults.replace(/"([^"]+(?="))"/g, '$1')
        var searchFilterCaps = searchFilterResults.charAt(0).toUpperCase() + searchFilterResults.slice(1);; 
        searchFilters.innerHTML = searchFilterCaps
        searchResultsEl.append(searchFilters);
       
                for (let i = 0 ; i < searchFiltersButton.length; i++) {
                searchFiltersButton[i].addEventListener("click", function() { 
                    var filterText = this.innerText
                    var filterText2 = localStorage.setItem('searchInputs', filterText);
                    oneCallApi();
                });  
            }
        }
        oneCallApi();
    }

//first URL to pull longitutde and latitude

async function oneCallApi(){
            var searchInputVal = localStorage.getItem('searchInputs');
            var searchInputVal2 = searchInputVal.replace(/"([^"]+(?="))"/g, '$1');
            var searchFilterCaps = searchInputVal2.charAt(0).toUpperCase() + searchInputVal2.slice(1);; 
            searchFilters.innerHTML = searchFilterCaps
            const api_url= 'https://api.openweathermap.org/data/2.5/weather?q='+searchInputVal2+'&appid=09f09e6442f51150cfa05304646caa33&units=imperial';
            const response = await fetch(api_url);
            const data = await response.json();

            var newData = JSON.stringify(data);
            var newData2 = JSON.parse(newData);

            //code for the 5day forecast
            var  latitude1Day = newData2.coord["lat"];
            var longitude1Day = newData2.coord["lon"];

            //resets the 5-day-forecast
            fiveDayForecast.innerHTML = ("")
    
            const api_url2= 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude1Day+'&lon='+longitude1Day+'&exclude=alerts,minutely,hourly&appid=09f09e6442f51150cfa05304646caa33&units=imperial'
            const response2 = await fetch(api_url2);
            const data2 = await response2.json();
            // console.log(data2);

            var newData3 = JSON.stringify(data2);
            var newData4 = JSON.parse(newData3);

            fiveDayForecast.innerHTML = ("")

            //setting up 1day forecast
            singleDayForecast.innerHTML = (("<h1 id='cityName'>") +(searchFilterCaps)+ ("</h1>"));
            for (let h = 0; h <= 0; h++ ){
                let dayData = newData4.daily[h];

                let dailyDateVal = newData4.daily[h];
                let uviVal = dayData.uvi;
                let humidityVal = dayData.humidity;
                let windSpeedVal = dayData.wind_speed;
                let tempVal = dayData.temp.day;
                let weatherStatus = dayData.weather[0].icon;
                
                //time conversion
                let UNIX_timestamp = dailyDateVal.dt;
                let milliseconds = UNIX_timestamp * 1000
                var dailyDate = new Date(milliseconds).toLocaleDateString("en-US")
                
                //Data for cards and data set-up
                let dailyDate1 = document.createElement('div');
                dailyDate1.className = "dateContainerSingle";

                if(uviVal < 5) {
                    dailyDate1.innerHTML =  (
                        "<h3>" + dailyDate +
                        "<h3>" + 'Temps: ' + tempVal + "</h3>" +
                        "<h3>" + 'Humidity: ' + humidityVal + "</h3>" +
                        "<div>" + "<img src='http://openweathermap.org/img/wn/"+weatherStatus+"@2x.png'" + "</div>" +
                        "<h3>" + 'Windspeed: ' + windSpeedVal + "</h3>" +
                        "<div class='uviId' style='background-color:green';> " + 'UVI: ' + uviVal + "</div>" + "</h3>" )
                } else if (5 < uviVal <7) {
                    dailyDate1.innerHTML =  (
                        "<h3>" + dailyDate +
                        "<h3>" + 'Temps: ' + tempVal + "</h3>" +
                        "<h3>" + 'Humidity: ' + humidityVal + "</h3>" +
                        "<div>" + "<img src='http://openweathermap.org/img/wn/"+weatherStatus+"@2x.png'" + "</div>" +
                        "<h3>" + 'Windspeed: ' + windSpeedVal + "</h3>" +
                        "<div class='uviId' style='background-color:yellow';> " + 'UVI: ' + uviVal + "</div>" + "</h3>" )
                } else if (7 < uviVal <10) {
                    dailyDate1.innerHTML =  (
                        "<h3>" + dailyDate +
                        "<h3>" + 'Temps: ' + tempVal + "</h3>" +
                        "<div>" + "<img src='http://openweathermap.org/img/wn/"+weatherStatus+"@2x.png'" + "</h3>" +
                        "<h3>" + 'Humidity: ' + humidityVal + "</h3>" +
                        "<h3>" + 'Windspeed: ' + windSpeedVal + "</h3>" +
                        "<div class='uviId' style='background-color:red';> " + 'UVI: ' + uviVal + "</div>" + "</h3>")
                }
                singleDayForecast.append(dailyDate1) 
                }

            //five-day forecast
            for (let d = 1; d <= 5; d++ ){
                let dayData = newData4.daily[d];

                let dailyDateVal = newData4.daily[d];
                let uviVal = dayData.uvi;
                let humidityVal = dayData.humidity ;
                let windSpeedVal = dayData.wind_speed;
                let tempVal = dayData.temp.day;
                let weatherStatus = dayData.weather[0].icon;

                //time conversion
                let UNIX_timestamp = dailyDateVal.dt;
                let milliseconds = UNIX_timestamp * 1000
                var dailyDate = new Date(milliseconds).toLocaleDateString("en-US")

                //Data for cards and data set-up
                let dailyDate1 = document.createElement('div');
                dailyDate1.className = "dateContainer";
                dailyDate1.innerHTML =  (
                        "<div>" + dailyDate +
                        "<div>" + 'Temps: ' + tempVal + "</div>" +
                        "<div>" + "<img src='http://openweathermap.org/img/wn/"+weatherStatus+"@2x.png'" + "</div>" +
                        "<div>" + 'Humidity: ' + humidityVal + "</div>" +
                        "<div>" + 'Windspeed: ' + windSpeedVal + "</div>" + "</div>")
                fiveDayForecast.append(dailyDate1) 

                };
    }
fetchButton.addEventListener('click', getApi1);