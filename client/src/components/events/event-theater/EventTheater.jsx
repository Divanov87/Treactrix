
import EventCard from '../event-card/EventCard';
import Loader from '../../loader/Loader';
import { getTheaterEvents } from '../../../api/eventAPI';
import { useEvents } from '../../../hooks/useEvents';
import { usePagination } from '../../../hooks/usePagination';
import { usePaginationQuery } from '../../../hooks/usePaginatonQuery';
import Pagination from '../../../utils/Pagination';

import styles from '../../home/search/Search.module.css';

export default function EventCatalog() {
  const [events, isLoading] = useEvents(getTheaterEvents);
  const eventsPerPage = 8;

  const initialPage = usePaginationQuery(1);
  const {
    currentPage,
    totalPages,
    currentEvents,
    handlePageChange
  } = usePagination(events, eventsPerPage, initialPage);

  return (
    <article>
      <section className={styles['top-rated']}>
        <div className={styles['container']}>
          <p className={styles['section-subtitle']}>Latest</p>
          <h2 className={`${styles['h2']} ${styles['section-title']}`}>
            Theater <strong>Performances</strong>
          </h2>
          {isLoading
        ? <Loader />
        : (
            <>
              <ul className={styles['movies-list']}>
                {currentEvents.length > 0 ? (
                  currentEvents.map((event) => (
                    <EventCard key={event._id} {...event} />
                  ))
                ) : (
                  <h2 className={`${styles['h2']} ${styles['section-title']}`}>
                    No events found!
                  </h2>
                )}
              </ul>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>
    </article>
  );
}


// import { useState, useEffect } from 'react';

// import EventCard from '../event-card/EventCard';
// import Loader from '../../loader/Loader';

// import { getAllEvents } from '../../../api/eventAPI';


// import styles from '../../home/search/Search.module.css';

// export default function EventCatalog() {
//   const [events, setEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const eventsData = await getAllEvents();
//       if (eventsData && Array.isArray(eventsData)) {
//         setEvents(eventsData);
//       } else {
//         console.error('Invalid events data:', eventsData);
//       }
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
// <article>
// <section className={styles['top-rated']}>
//     <div className={styles['container']}>
//       <p className={styles['section-subtitle']}>Latest</p>
//       <h2 className={`${styles['h2']} ${styles['section-title']}`}>
//         Theater & Music <strong>Performances</strong>
//       </h2>
//       {isLoading ? (
//         <div className={styles['css-loader']}>
//           <Loader />
//         </div>
//       ) : (
//         <ul className={styles['movies-list']}>
//           {events.length > 0 ? (
//             events.map((event) => (
//               <EventCard key={event._id} {...event} />
//             ))
//           ) : (
//             <h2 className={`${styles['h2']} ${styles['section-title']}`}>
//               No events found!
//             </h2>
//           )}
//         </ul>
//       )}
//     </div>
//     </section>
//     </article>
//   );
// }
