import { useState, useEffect } from 'react';

import FilterList from '../filter-list/FilterList'; 
import { useAuth } from '../../context/AuthContext.jsx';
import EventCard from '../events/event-card/EventCard.jsx';
import useLocation from '../../hooks/useLocation';

import styles from './EventList.module.css';

export default function EventList({ events, title }) {
  const { user, isLogged } = useAuth();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedCity, setSelectedCity] = useState('');
  const city = !isLogged ? useLocation()?.city : null;
  

  useEffect(() => {
    if (city && !selectedCity) {
      setSelectedCity(city);
      const filtered = events.filter(event => event.location.toLowerCase() === city.toLowerCase());
      setFilteredEvents(filtered);
    }
  }, [city, events, selectedCity]);

  const handleCityFilter = (city) => {
    setSelectedCity(city);
    if (city) {
      const filtered = events.filter(event => event.location.toLowerCase() === city.toLowerCase());
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <section className={styles['upcoming']}>
      <div className={styles['container']}>
        <div className={styles['flex-wrapper']}>
          <div className={styles['title-wrapper']}>
            <p className={styles['section-subtitle']}>Discover latest in {isLogged ? (user?.location) : (selectedCity || 'your town')}</p>
            <h2 className={`${styles['h2']} ${styles['section-title']}`}>Latest <strong>{title}</strong></h2>
          </div>
          {!isLogged && !city && <FilterList handleCityFilter={handleCityFilter} />}
        </div>
        {filteredEvents.length === 0 ? (
          //<h2 className={`${styles.h2} ${styles['section-title']}`}>There are no upcoming events!</h2>
          <h2 className={`${styles.h2} ${styles['section-title']}`}>There are no upcoming events in {isLogged ? (<b style={{ textTransform: 'capitalize' }}>{user?.location}</b> ) : (<b style={{ textTransform: 'capitalize' }}>{selectedCity}</b> || 'your town')}!</h2>
        ) : (
          <ul className={`${styles['movies-list']} ${styles['has-scrollbar']}`}>
            {filteredEvents.map(event => <EventCard key={event._id} {...event} />)}
          </ul>
        )}
      </div>
    </section>
  );
}



// import { useState } from 'react';

// import FilterList from '../filter-list/FilterList'; 
// import { useAuth } from '../../context/AuthContext.jsx';
// import EventCard from '../events/event-card/EventCard.jsx';

// import styles from './EventList.module.css';

// export default function EventList({ events, title }) {
//   const [filteredEvents, setFilteredEvents] = useState(events);
//   const [selectedCity, setSelectedCity] = useState('');
//   const { user, isLogged } = useAuth();

//   const handleCityFilter = (city) => {
//     setSelectedCity(city);
//     if (city) {
//       const filtered = events.filter(event => event.location.toLowerCase() === city.toLowerCase());
//       setFilteredEvents(filtered);
//     } else {
//       setFilteredEvents(events);
//     }
//   };

//   return (
//     <section className={styles['upcoming']}>
//       <div className={styles['container']}>
//         <div className={styles['flex-wrapper']}>
//           <div className={styles['title-wrapper']}>
//           <p className={styles['section-subtitle']}>Discover latest in {isLogged ? (user?.location) : ('your town')}</p>
//             <h2 className={`${styles['h2']} ${styles['section-title']}`}>Latest <strong>{title}</strong></h2>
//           </div>
//           {!isLogged && <FilterList handleCityFilter={handleCityFilter} />}
//         </div>
//         {filteredEvents.length === 0 ? (
//           <h2 className={`${styles.h2} ${styles['section-title']}`}>There are no upcoming events in {selectedCity}!</h2>
//         ) : (
//           <ul className={`${styles['movies-list']} ${styles['has-scrollbar']}`}>
//           {filteredEvents.map(event => <EventCard key={event._id} {...event} />)}
//           </ul>
//         )}
//       </div>
//     </section>
//   );
// }
