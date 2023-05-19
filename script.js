// const weather api keys
// const

// 517027e1c58e057de7aff58616a09fa9

const recentLocations = [];
const getLocation = () => {

const userLocation= locationInput.value;

if (userLocation ==='') {
    SetLocationError('Please enter a Location');
} else {
    lookupLocation(userLocation)
}
}

const clearError = () => {
    const errorDisplay = document.getElementById('error');
    errorDisplay.textContent = '';
}

const SetLocationError = (text) => {
const errorDisplay = document.getElementById('error');
errorDisplay.textContent = text;

setTimeout(clearError, 3000);
}

const lookupLocation = (search) => {
const apiURL = `${WEATHER_API_BASE_URL}`
fetch(apiURL)
.then(response => response.json())
.then(data => {})

console.log(data);

let lat = data [0].lat;
let lon = data [0].lon;

const myData ={
name:data [0].name,
country: data[0].country,
lat: data [0]. lat,
lon: data [0].lon
}
console.log(myData);
}

let  apiURL =
console.log(apiUrl)
fetch(apiUrl);
then(response => response.json())
then (data => {
    console.log(data);

    displayCurrentWeather(data);

    displayWeatherForecast(data);

    displayWeather(myData);
})

const displayCurrentWeather =(weatherData) => {

    const dailyData = WeatherData.daily

    document.GetElementByID('forecast').style.display ="block";

    const forecastlist = document.getElementByID('forcast-days');


    for (let i = 0; i < MAX_DAILY_FORECAST;i++)  {
        const dailyForecast =dailyData[i];
        const day = new Date (dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
        const temp = `${dailyForecast.temp.day}'`;
        const humdity = `${dailyForecast.humidity}%`;
        const wind = `${dailyForecast.wind_speed}MPH`;

    }
}

const recentLocations = JSON.parse(localStorage.getItem('recentLocations')) || [];

const getLocation = () => {
    const userLocation = locationInput.value;

    if (userLocation === '') {
        setLocationError('Please enter a location');
    } else {
        lookupLocation(userLocation);
    }
};

const clearError = () => {
    const errorDisplay = document.getElementById('error');
    errorDisplay.textContent = '';
};

const setLocationError = (text) => {
    const errorDisplay = document.getElementById('error');
    errorDisplay.textContent = text;

    setTimeout(clearError, 3000);
};

const lookupLocation = (search) => {
    const apiURL = `${WEATHER_API_BASE_URL}${search}`;
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let lat = data[0].lat;
            let lon = data[0].lon;

            const myData = {
                name: data[0].name,
                country: data[0].country,
                lat: lat,
                lon: lon
            };
            console.log(myData);

        
            recentLocations.push(myData);

           
            localStorage.setItem('recentLocations', JSON.stringify(recentLocations));

            displayWeather(myData);
        })
        .catch(error => {
            console.error('Error:', error);
            setLocationError('Failed to fetch location data');
        });
};

    const displayCurrentWeather = (weatherData) => {
    const dailyData = weatherData.daily;

    document.getElementById('forecast').style.display = 'block';

    const forecastList = document.getElementById('forecast-days');

    for (let i = 0; i < MAX_DAILY_FORECAST; i++) {
        const dailyForecast = dailyData[i];
        const day = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' });
        const temp = `${dailyForecast.temp.day}`;
        const humidity = `${dailyForecast.humidity}%`;
        const wind = `${dailyForecast.wind_speed} MPH`;

        
    }
};
