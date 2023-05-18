// const weather api keys
// const

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
var apiURL = `${WEATHER_API_BASE_URL}`
fetch(apiURL)
.then(response => response.json())
.then(data => {})

console.log(data);

var lat = data [0].lat;
var lon = data [0].lon;

const myData ={
name:data [0].name,
country: data[0].country,
lat: data [0]. lat,
lon: data [0].lon
}
console.log(myData);
}

var A