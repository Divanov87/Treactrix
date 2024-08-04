import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {getUserEvents, getEvent} from '../../../api/eventAPI'
import Loader from '../../loader/Loader';
import { useAuth } from '../../../context/AuthContext';

import styles from './Profile.module.css';

export default function Profile(){

  const [isLoading, setIsLoading] = useState(true);
  const [boughtEvents, setBoughtEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const navigate = useNavigate();
  const { user, isLogged } = useAuth();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;

    console.log('User ID:', userId);

    getUserEvents(userId)
      .then(data => {
        getEventDetails(data.likes, 'liked');
        getEventDetails(data.boughts, 'bought');
      })
      .catch(error => {
        console.error('Error fetching user\'s events:', error);
        setIsLoading(false);
      });
  }, []);

  const getEventDetails = (eventIds, type) => {
    if (!eventIds || eventIds.length === 0) {
      if (type === 'liked') {
        setLikedEvents([]);
      } else {
        setBoughtEvents([]);
      }
      setIsLoading(false);
      return;
    }

    const uniqueEventIds = new Set(eventIds);
    const eventDetailsPromises = Array.from(uniqueEventIds).map(eventId =>
      getEvent(eventId)
        .then(event => event)
        .catch(error => {
          console.error('Error fetching event details:', error);
          return null;
        })
    );

    Promise.all(eventDetailsPromises).then(events => {
      const filteredEvents = events.filter(event => event !== null);
      if (type === 'liked') {
        setLikedEvents(filteredEvents);
      } else {
        setBoughtEvents(filteredEvents);
      }
      setIsLoading(false);
    }).catch(error => {
      console.error('Error fetching event details:', error);
      setIsLoading(false);
    });
  };

  return (
    <article>
      <section className={styles['movie-detail']}>
        <p className={styles['section-subtitle']}>Profile</p>
        <h2 className={`${styles['h2']} ${styles['section-title']}`}>
         <b style={{ textTransform: 'capitalize' }}>{user?.username}'s</b><strong> Likes</strong>
        </h2>
        {isLoading && <Loader />}
        {!isLoading && likedEvents.length > 0 ? (
          likedEvents.map(event => (
            <div key={event._id} className={styles['container']}>
              <div className={styles['image-list']}>
                <div className={styles['image-item']}>
                  <img className={styles['image']} src={event.imageUrl} alt={event.name} />
                  <div className={styles['content']}>
                    <h3 className={styles['movie-title']}>{event.name}</h3>
                    <div className={styles['movie-description']}>{event.description}</div>
                  </div>
                  <div className={styles['button-container']}>
                    {!event?.isLiked ? (
                      <button className={styles['share']}>
                        <i className='bx bx-heart'></i>
                      </button>
                    ) : (
                      <button className={styles['share']}>
                        <i className='bx bxs-heart'></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className={`${styles['h2']} ${styles['section-title']}`}>You didn't like any events, yet!</h2>
        )}
        <p className={styles['section-subtitle']}>Profile</p>
        <h2 className={`${styles['h2']} ${styles['section-title']}`}>
        <b style={{ textTransform: 'capitalize' }}>{user?.username}'s</b><strong> Purchases</strong>
        </h2>
        {isLoading && <Loader />}
        {!isLoading && boughtEvents.length > 0 ? (
          boughtEvents.map(event => (
            <div key={event._id} className={styles['container']}>
              <div className={styles['image-list']}>
                <div className={styles['image-item']}>
                  <img className={styles['image']} src={event.imageUrl} alt="Image" />
                  <div className={styles['content']}>
                    <h3 className={styles['movie-title']}>{event.name}</h3>
                    <div className={styles['movie-description']}>{event.description}</div>
                  </div>
                  {/* Uncomment this section if you want to add purchase button logic */}
                  {/* <div className={styles['button-container']}>
                    {event && event.ticketsLeft > 0 ? (
                      <button className={styles['btn btn-primary']}>
                        <a>Buy</a>
                      </button>
                    ) : (
                      <button className={styles['sold-out']}>
                        Sold out
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className={`${styles['h2']} ${styles['section-title']}`}>You didn't make any purchases, yet!</h2>
        )}
      </section>
    </article>
  );
};;
