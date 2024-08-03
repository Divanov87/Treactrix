
function fetchEventsByLocation(city) {
    const eventsApiUrl = `/events/user?location=${city}`;

    fetch(eventsApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
}


function getLocationAndFetchEvents() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const api_key = '65ea5e84474fa533385611gqk093371';
            const geocodingApiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${api_key}`;

            fetch(geocodingApiUrl)
                .then(response => response.json())
                .then(data => {
                    const city = data.address.city_district; // Assuming the city is obtained from the geocoding API response
                    fetchEventsByLocation(city);
                    console.log(city)

                })
                .catch(error => {
                    console.error('Error fetching geocoding data:', error);
                });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Call the function to get user's location and fetch events
getLocationAndFetchEvents();