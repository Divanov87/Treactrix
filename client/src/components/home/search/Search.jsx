import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getAllEvents, getAllCities, searchEvents } from '../../../api/eventAPI';
import { useSearch } from '../../../context/SearchContext';
import EventCard from '../../events/event-card/EventCard';
import Loader from '../../loader/Loader';

import styles from './Search.module.css';

export default function Search() {
    const [events, setEvents] = useState([]);
    const [years, setYears] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const { searchParams, setSearchParams } = useSearch();
    const { name = '', category = 'all', location = 'all', year = 'all' } = searchParams;
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const { search } = useLocation();

    useEffect(() => {
        generateYears();
        fetchInitialData();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const name = queryParams.get('name') || '';
        const category = queryParams.get('category') || 'all';
        const location = queryParams.get('location') || 'all';
        const year = queryParams.get('year') || 'all';

        const searchParams = {
            name: name.trim() || undefined,
            category: category === 'all' ? undefined : category,
            location: location === 'all' ? undefined : location,
            date: year === 'all' ? undefined : year
        };

        setSearchParams(searchParams);
        searchForEvents(searchParams);
    }, [search]);

    const generateYears = () => {
        const startYear = 2024;
        const currentYear = new Date().getFullYear();
        const endYear = currentYear + 2;
        const yearsArray = [];

        for (let year = startYear; year <= endYear; year++) {
            yearsArray.push(year);
        }

        setYears(yearsArray);
    };

    const fetchInitialData = async () => {
        try {
            const eventsData = await getAllEvents();
            if (eventsData && Array.isArray(eventsData)) {
                setEvents(eventsData);
            } else {
                console.error('Invalid events data:', eventsData);
            }

            const citiesData = await getAllCities();
            if (citiesData && Array.isArray(citiesData)) {
                setCities(citiesData);
            } else {
                console.error('Invalid cities data:', citiesData);
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching initial data:', error);
            setIsLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const queryParams = {
            name: searchParams.name?.trim() || undefined,
            category: searchParams.category === 'all' ? undefined : searchParams.category,
            location: searchParams.location === 'all' ? undefined : searchParams.location,
            date: searchParams.year === 'all' ? undefined : searchParams.year
        };

        Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);

        console.log('Search query parameters:', queryParams);

        setSearchParams(queryParams);

        searchForEvents(queryParams);

        updateURLWithQueryParams(queryParams);
    };

    const searchForEvents = async (queryParams) => {
        try {
            const response = await searchEvents(queryParams);
            console.log('API response:', response);

            if (response && response.events) {
                setSearchResults(response.events);
                setDisplaySearchResults(true);
            } else {
                console.error('Response does not contain events property:', response);
                setSearchResults([]);
                setDisplaySearchResults(true);
            }
        } catch (error) {
            console.error('Error searching for events:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const updateURLWithQueryParams = (params) => {
        const queryParamsWithYear = { ...params };
        if (queryParamsWithYear.date) {
            queryParamsWithYear.year = queryParamsWithYear.date;
            delete queryParamsWithYear.date;
        }

        const queryParamsForURL = { ...queryParamsWithYear };
        if (!queryParamsForURL.category) queryParamsForURL.category = 'all';
        if (!queryParamsForURL.location) queryParamsForURL.location = 'all';
        if (!queryParamsForURL.year) queryParamsForURL.year = 'all';

        if (!queryParamsForURL.name) {
            delete queryParamsForURL.name;
        }

        const queryString = new URLSearchParams(queryParamsForURL).toString();
        navigate(`/search?${queryString}`);
    };

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    return (
        <article>
            <section className={styles['top-rated']}>
                <div className={styles['container']}>
                    <p className={styles['section-subtitle']}>Search</p>
                    <h2 className={`${styles['h2']} ${styles['section-title']}`}>
                        What Are You Looking For <strong>Today</strong>?
                    </h2>
                    <form onSubmit={handleSearch}>
                        <div className={styles['src']}>
                            <input
                                type="search"
                                id={styles['search-input']}
                                name="name"
                                value={searchParams.name || ''}
                                onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
                                placeholder="Search..."
                                ref={searchInputRef}
                            />
                            <button
                                type="submit"
                                className={`${styles['search-btn']} ${styles['vertical']}`}
                            >
                                &nbsp;&nbsp;<i className='bx bx-search'></i>
                            </button>
                        </div>
                        <div className={styles['filter-container']}>
                            <select
                                id="category"
                                name="category"
                                value={searchParams.category || 'all'}
                                onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                            >
                                <option value="all">Event</option>
                                <option value="theater">Theater</option>
                                <option value="concert">Concert</option>
                            </select>
                            <select
                                id="location"
                                name="location"
                                value={searchParams.location || 'all'}
                                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                            >
                                <option value="all">Location</option>
                                {cities.map((city) => (
                                    <option key={city} value={city} style={{ textTransform: 'capitalize' }}>
                                        {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
                                    </option>
                                ))}
                            </select>
                            <select
                                id="year"
                                name="year"
                                value={searchParams.year || 'all'}
                                onChange={(e) => setSearchParams({ ...searchParams, year: e.target.value })}
                            >
                                <option value="all">Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>

                <div className={styles['container']}>
                    <p className={styles['section-subtitle']}>Latest</p>
                    <h2 className={`${styles['h2']} ${styles['section-title']}`}>
                        Theater & Music <strong>Performances</strong>
                    </h2>
                    {isLoading
                        ? <Loader />
                        : (
                            <ul className={styles['movies-list']}> 
                                {displaySearchResults
                                    ? (searchResults.length > 0
                                        ? searchResults.map((event) => (
                                            <EventCard key={event._id} {...event} />))
                                        : <h2 className={`${styles['h2']} ${styles['section-title']}`}>No search results found!</h2>)
                                    : (events.length > 0 
                                        ? events.map((event) => (
                                            <EventCard key={event._id} {...event} />)) 
                                        : <h2 className={`${styles['h2']} ${styles['section-title']}`}>No events found!</h2>)
                                }
                            </ul>
                        )}
                </div>
            </section>
        </article>
    );
}

// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { getAllEvents, getAllCities, searchEvents } from '../../../api/eventAPI';
// import { useSearch } from '../../../context/SearchContext';
// import EventCard from '../../events/event-card/EventCard';
// import Loader from '../../loader/Loader';

// import styles from './Search.module.css';

// export default function Search() {
//     const [events, setEvents] = useState([]);
//     const [years, setYears] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [cities, setCities] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const [displaySearchResults, setDisplaySearchResults] = useState(false);
//     const { searchParams, setSearchParams } = useSearch();
//     const { name = '', category = 'all', location = 'all', year = 'all' } = searchParams;
//     const navigate = useNavigate();
//     const searchInputRef = useRef(null);

//     useEffect(() => {
//         generateYears();
//         fetchInitialData();
//     }, []);

//     const generateYears = () => {
//         const startYear = 2024;
//         const currentYear = new Date().getFullYear();
//         const endYear = currentYear + 2;
//         const yearsArray = [];

//         for (let year = startYear; year <= endYear; year++) {
//             yearsArray.push(year);
//         }

//         setYears(yearsArray);
//     };

//     const fetchInitialData = async () => {
//         try {
//             const eventsData = await getAllEvents();
//             if (eventsData && Array.isArray(eventsData)) {
//                 setEvents(eventsData);
//             } else {
//                 console.error('Invalid events data:', eventsData);
//             }

//             const citiesData = await getAllCities();
//             if (citiesData && Array.isArray(citiesData)) {
//                 setCities(citiesData);
//             } else {
//                 console.error('Invalid cities data:', citiesData);
//             }

//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching initial data:', error);
//             setIsLoading(false);
//         }
//     };

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const queryParams = {
//             name: name.trim() || undefined,
//             category: category === 'all' ? undefined : category,
//             location: location === 'all' ? undefined : location,
//             date: year === 'all' ? undefined : year
//         };

//         Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);

//         console.log('Search query parameters:', queryParams);

//         setSearchParams({ name, category, location, year });

//         searchForEvents(queryParams);

//         updateURLWithQueryParams({ name, category, location, year });
//     };

//     const searchForEvents = async (queryParams) => {
//         try {
//             const response = await searchEvents(queryParams);
//             console.log('API response:', response);

//             if (response && response.events) {
//                 setSearchResults(response.events);
//                 setDisplaySearchResults(true);
//             } else {
//                 console.error('Response does not contain events property:', response);
//                 setSearchResults([]);
//                 setDisplaySearchResults(true);
//             }
//         } catch (error) {
//             console.error('Error searching for events:', error);
//             setSearchResults([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const updateURLWithQueryParams = (params) => {
//         const queryParamsWithYear = { ...params };
//         if (queryParamsWithYear.date) {
//             queryParamsWithYear.year = queryParamsWithYear.date;
//             delete queryParamsWithYear.date;
//         }

//         const queryParamsForURL = { ...queryParamsWithYear };
//         if (!queryParamsForURL.category) queryParamsForURL.category = 'all';
//         if (!queryParamsForURL.location) queryParamsForURL.location = 'all';
//         if (!queryParamsForURL.year) queryParamsForURL.year = 'all';

//         if (!queryParamsForURL.name) {
//             delete queryParamsForURL.name;
//         }

//         const queryString = new URLSearchParams(queryParamsForURL).toString();
//         navigate(`/search?${queryString}`);
//     };

//     useEffect(() => {
//         if (searchInputRef.current) {
//             searchInputRef.current.focus();
//         }
//     }, []);

//     return (
//         <article>
//             <section className={styles['top-rated']}>
//                 <div className={styles['container']}>
//                     <p className={styles['section-subtitle']}>Search</p>
//                     <h2 className={`${styles['h2']} ${styles['section-title']}`}>
//                         What Are You Looking For <strong>Today</strong>?
//                     </h2>
//                     <form onSubmit={handleSearch}>
//                         <div className={styles['src']}>
//                             <input
//                                 type="search"
//                                 id={styles['search-input']}
//                                 name="name"
//                                 value={name}
//                                 onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
//                                 placeholder="Search..."
//                                 ref={searchInputRef}
//                             />
//                             <button
//                                 type="submit"
//                                 className={`${styles['search-btn']} ${styles['vertical']}`}
//                             >
//                                 &nbsp;&nbsp;<i className='bx bx-search'></i>
//                             </button>
//                         </div>
//                         <div className={styles['filter-container']}>
//                             <select
//                                 id="category"
//                                 name="category"
//                                 value={category}
//                                 onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
//                             >
//                                 <option value="all">Event</option>
//                                 <option value="theater">Theater</option>
//                                 <option value="concert">Concert</option>
//                             </select>
//                             <select
//                                 id="location"
//                                 name="location"
//                                 value={location}
//                                 onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
//                             >
//                                 <option value="all">Location</option>
//                                 {cities.map((city) => (
//                                     <option key={city} value={city} style={{ textTransform: 'capitalize' }}>
//                                         {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
//                                     </option>
//                                 ))}
//                             </select>
//                             <select
//                                 id="year"
//                                 name="year"
//                                 value={year}
//                                 onChange={(e) => setSearchParams({ ...searchParams, year: e.target.value })}
//                             >
//                                 <option value="all">Year</option>
//                                 {years.map((year) => (
//                                     <option key={year} value={year}>{year}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </form>
//                 </div>

//                 <div className={styles['container']}>
//                     <p className={styles['section-subtitle']}>Latest</p>
//                     <h2 className={`${styles['h2']} ${styles['section-title']}`}>
//                         Theater & Music <strong>Performances</strong>
//                     </h2>
//                     {isLoading
//                         ? <Loader />
//                         : (
//                             <ul className={styles['movies-list']}> {displaySearchResults
//                                 ? (searchResults.length > 0
//                                     ? (searchResults.map((event) => (
//                                         <EventCard key={event._id} {...event} />)))
//                                     : (
//                                         <h2 className={`${styles['h2']} ${styles['section-title']}`}>
//                                             No search results found!
//                                         </h2>
//                                     )) 
//                                     : (events.length > 0 
//                                         ? (events.map((event) => (<EventCard key={event._id} {...event} />))) 
//                                         : (
//                                         <h2 className={`${styles['h2']} ${styles['section-title']}`}>
//                                             No events found!
//                                         </h2>
//                                     )
//                                 )}
//                             </ul>
//                         )}
//                 </div>
//             </section>
//         </article>
//     );
// }