import { useState, useEffect } from 'react';

export const API_KEY = process.env.REACT_APP_GEO_LOCATION_API_KEY;

export default function useLocation() {
    const [city, setCity] = useState(null);

    useEffect(() => {
        const isSecureConnection = window.location.protocol === 'https:';

        if (!isSecureConnection) {
            console.log('Geo-location not used because the connection is not secure!');
            setCity(null);
            return;
        }

        const getLocationAndFetchCity = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        try {
                            const { latitude, longitude } = position.coords;
                            console.log(`Geolocation obtained: lat=${latitude}, lon=${longitude}`);
                            const geocodingApiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}`;
                            const response = await fetch(geocodingApiUrl);
                            const data = await response.json();
                            const city = data.address.city;
                            console.log(`City obtained from geocoding: ${city}`);
                            setCity(city);
                        } catch (error) {
                            console.error('Error fetching geocoding data:', error);
                            setCity(null);
                        }
                    },
                    (error) => {
                        console.log('User denied geolocation prompt!');
                        setCity(null);
                    }
                );
            } else {
                console.error('Geo-location is not supported by this browser.');
                setCity(null);
            }
        };

        getLocationAndFetchCity();
    }, []);

    return { city };
}


// import { useState, useEffect } from 'react';

// export default function useLocation() {
    
//     const [events, setEvents] = useState([]);
//     const [city, setCity] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const BASE_URL = process.env.REACT_APP_API_URL;

//     useEffect(() => {
//         const fetchEventsByLocation = async (city) => {
//             try {
//                 const eventsApiUrl = `${BASE_URL}/events/user?location=${city}`;
//                 const response = await fetch(eventsApiUrl);
//                 const data = await response.json();
//                 setEvents(data);
//             } catch (error) {
//                 setError('Error fetching events: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const getLocationAndFetchEvents = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     async (position) => {
//                         try {
//                             const { latitude, longitude } = position.coords;
//                             const api_key = '65ea5e84474fa533385611gqk093371';
//                             const geocodingApiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${api_key}`;
//                             const response = await fetch(geocodingApiUrl);
//                             const data = await response.json();
//                             const city = data.address.city;
//                             setCity(city);
//                             fetchEventsByLocation(city);
//                         } catch (error) {
//                             setError('Error fetching geocoding data: ' + error.message);
//                             setLoading(false);
//                         }
//                     },
//                     (error) => {
//                         setError('Geolocation permission denied: ' + error.message);
//                         setLoading(false);
//                     }
//                 );
//             } else {
//                 setError('Geolocation is not supported by this browser.');
//                 setLoading(false);
//             }
//         };

//         getLocationAndFetchEvents();
//     }, [BASE_URL]);

//     return { events, city, error, loading };
// }