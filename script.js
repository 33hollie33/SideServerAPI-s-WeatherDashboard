


const userLocation= locationInput.value;

if (userLocation ==='') {
    setLocationError('Please enter a Location');
} else {
    lookupLocation(userLocation)
}