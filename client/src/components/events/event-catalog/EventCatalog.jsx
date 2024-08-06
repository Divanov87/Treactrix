import EventCard from '../event-card/EventCard';
import Loader from '../../loader/Loader';
import { getAllEvents } from '../../../api/eventAPI';
import { useEvents } from '../../../hooks/useEvents';
import { usePagination } from '../../../hooks/usePagination';
import { usePaginationQuery } from '../../../hooks/usePaginatonQuery';
import Pagination from '../event-pagination/EventPagination';

import styles from '../../home/search/Search.module.css';

export default function EventCatalog() {
  const [events, isLoading] = useEvents(getAllEvents);
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
            Theater & Music <strong>Performances</strong>
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