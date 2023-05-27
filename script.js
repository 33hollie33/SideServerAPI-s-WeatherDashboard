const recentLocations = JSON.parse(localStorage.getItem('CitySearch')) ||[]
const apiKey = '517027e1c58e057de7aff58616a09fa9';
let cityData = {};


let cityName = '';

const clearLocalStorage = () => {
    if (!localStorage.getItem('firstLoad')) {
        // I'm clearing the localStorage here
        localStorage.clear();

        // Setting a flag indicating it's the first load
        localStorage.setItem('firstLoad', true);
    }
}


let locationInput = document.getElementById("searchbar");

const getCity = () => {

   

    const userLocation = locationInput.value;

    cityName = userLocation;

    locationInput.value = "";

    if (userLocation === '') {
        SetLocationError('Please enter a Location');
    } else {



        displayRecentHistory();

        lookupLocation(userLocation)
            .then(data => {
                cityData = data;
                getWeatherData(cityData.lat, cityData.lon);
            })

    }
}

const SetLocationError = (text) => {
    const errorDisplay = document.getElementById('error');
    errorDisplay.textContent = text;

    setTimeout(clearError, 3000);
}

const clearError = () => {
    const errorDisplay = document.getElementById('error');
    errorDisplay.textContent = '';
}

const lookupLocation = async (cityName) => {
    const apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
        const response = await fetch(apiURL);
    const data = await response.json();
    cityData = {
        name: data[0].name,
        country: data[0].country,
        lat: data[0].lat,
        lon: data[0].lon
    };
    recentLocations.unshift(cityData.name);
    localStorage.setItem('CitySearch', JSON.stringify(recentLocations));
    displayRecentHistory();
    return cityData;
}

const getWeatherData = (lat, lon) => {
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    return fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            let currentDayData = data.list[0];
            let date = convertDate(currentDayData.dt_txt);

            let cityForecast = document.getElementById("city-forecast");

            if (cityForecast.classList.contains("hidden")) {
                cityForecast.classList.remove("hidden");
                cityForecast.style.display = "block";
            }

            let iconCode = currentDayData.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

            document.getElementById("cityname-date").innerHTML = cityName + " (" + date + ")";
            let weatherIcon = document.createElement("img");
            weatherIcon.src = iconURL;
            document.getElementById("cityname-date").appendChild(weatherIcon);

            document.getElementById("temp_value").innerHTML = currentDayData.main.temp + "F";
            document.getElementById("wind_value").innerHTML = currentDayData.wind.speed + "MPH";
            document.getElementById("humid_value").innerHTML = currentDayData.main.humidity + "%";

            document.getElementById("five-day-forecast").innerHTML = "";

            let headingDiv = document.getElementById("weekly-heading");
            headingDiv.style.display = "block";

            for (let i = 7; i < data.list.length; i+=8) {
                let dayData = data.list[i];

                let dayWrap = document.createElement("div");
                dayWrap.classList.add("day-wrap");

                let date = document.createElement("h3");
                date.style.color = "white";
                date.innerHTML = convertDate(dayData.dt_txt);

                let tempValue = document.createElement("div");
                tempValue.innerHTML = "Temp: " + dayData.main.temp + "F";

                let windValue = document.createElement("div");
                windValue.innerHTML = "Wind: " + dayData.wind.speed + " MPH";

                let humidValue = document.createElement("div");
                humidValue.innerHTML = "Humidity: " + dayData.main.humidity + " %";

                let iconData = dayData.weather[0].icon;
                const imageURL = `http://openweathermap.org/img/w/${iconData}.png`;
                let weatherImg = document.createElement("img");
                weatherImg.src = imageURL;

                dayWrap.appendChild(date);
                dayWrap.appendChild(weatherImg);
                dayWrap.appendChild(tempValue);
                dayWrap.appendChild(windValue);
                dayWrap.appendChild(humidValue);


                document.getElementById("five-day-forecast").appendChild(dayWrap);
            }

        })
}

const displayRecentHistory = () => {
    let recentHolactionsDiv = document.getElementById("recent-locations");
    recentHolactionsDiv.innerHTML = "";

    for (let i = 0; i < recentLocations.length; i++) {
        let searchButton = document.createElement("button");
        searchButton.classList.add("search-btn");
        searchButton.classList.add("recent-history-button");
        searchButton.classList.add("row");

        searchButton.onclick = function () {
            lookupLocation(searchButton.innerHTML)
                .then(data => {
                    cityData = data;
                    cityName = searchButton.innerHTML;
                    getWeatherData(cityData.lat, cityData.lon);
                })
        };

        searchButton.innerHTML = recentLocations[i];
        recentHolactionsDiv.appendChild(searchButton);
    }

    console.log(recentLocations);
}

const convertDate = (dateAsString) => {
    const date = new Date(dateAsString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedResult = `${day}/${month}/${year}`;
    return formattedResult;
}

displayRecentHistory()