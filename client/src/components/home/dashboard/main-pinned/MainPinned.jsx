import Loader from '../../../loader/Loader';
import EventCard from '../../../events/event-card/EventCard';

import styles from './MainPinned.module.css';

export default function MainPinned({ latestPins = [], isLoading }) {
  
  return (
    <section className={styles['top-rated']}>
      <div className={styles['container']}>
        <p className={styles['section-subtitle']}>latest</p>
        <h2 className={`h2 ${styles['section-title']}`}>Pinned <strong>Events</strong></h2>
        {isLoading ? (
          <div className={styles['css-loader']}>
            <Loader />
          </div>
        ) : (
          <ul className={styles['movies-list']}>
            {latestPins.length > 0 ? (
              latestPins.map(event => (
                <EventCard key={event._id} {...event} />
              ))
            ) : (
              <h2 className={`${styles['h2']} ${styles['section-title']}`}>There are no pinned events!</h2>
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
