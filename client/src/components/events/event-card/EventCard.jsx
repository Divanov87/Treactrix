import { Link } from 'react-router-dom';

import { formatDate } from '../../../libs/dateFormatter';

import styles from './EventCard.module.css';

export default function EventCard({_id, imageUrl, name, location, date, duration, rating }) {
  return (
    <li>
      <div className={styles['movie-card']}>
        <Link to={`/events/${_id}/details`}>
          <figure className={styles['card-banner']}>
            <img src={imageUrl} alt={name} />
          </figure>
        </Link>
        <div className={styles['title-wrapper']}>
          <Link to={`/events/${_id}/details`}>
            <h3 className={styles['card-title']}>{name.toUpperCase()}</h3>
          </Link>
          <div className={styles['location-badge']} style={{ textTransform: 'capitalize' }}>
            <i className="bx bxs-map"></i>&nbsp;{location}
          </div>
        </div>
        <div className={`${styles['badge']} ${styles['badge-outline']}`}>
          <div className={styles['date-time']}>
            <div>
              <i className="bx bx-calendar"></i>
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
            <div className={styles['duration']}>
              <i className="bx bx-time"></i>
              <time dateTime={duration}>{duration} min</time>
            </div>
            <div className={styles['rating']}>
              <i className="bx bxs-star"></i>
              <data>{rating}</data>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
