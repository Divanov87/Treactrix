import { useState, useEffect } from 'react';

import EventCard from '../events/event-card/EventCard';
import Loader from '../loader/Loader.jsx';
import FilterList from '../filter-list/FilterList';

import { useAuth } from '../../context/AuthContext';

import styles from './EventList.module.css';


export default function EventList({ 
    fetchEvents,
    title,
 }){

  const { user, isLogged } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [latestEvents, setLatestEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await fetchEvents();
        setLatestEvents(events);
        setFilteredEvents(events);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchEvents]);

  const handleCityFilter = (city) => {
    setSelectedCity(city);
    if (city) {
      const filtered = latestEvents.filter(event => event.location.toLowerCase() === city.toLowerCase());
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(latestEvents);
    }
  };


  return (
    <section className={styles['upcoming']}>
      <div className={styles['container']}>
        <div className={styles['flex-wrapper']}>
          <div className={styles['title-wrapper']}>
          <p className={styles['section-subtitle']}>Discover latest in {isLogged ? (user?.location) : ('your town')}</p>
          <h2 className={`${styles['h2']} ${styles['section-title']}`}>{title}</h2>
          </div>
          <FilterList handleCityFilter={handleCityFilter} />
        </div>
        {isLoading
        ? <Loader />
        : latestEvents.length === 0 ? (
          <h2 className={`${styles['h2']} ${styles['section-title']}`}>There are no upcoming Theater events!</h2>
        ) : filteredEvents.length === 0 ? (
          <h2 className={`${styles.h2} ${styles['section-title']}`}>There are no upcoming events in {selectedCity}!</h2>
        ) : (
          <ul className={`${styles['movies-list']} ${styles['has-scrollbar']}`}>
          {filteredEvents.map(event => <EventCard key={event._id} {...event} />)}
          </ul>
        )}
      </div>
    </section>
  );
}
