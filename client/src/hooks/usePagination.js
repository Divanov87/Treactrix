import { useState, useEffect } from 'react';

export function usePagination(events, eventsPerPage, initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const currentEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    totalPages,
    currentEvents,
    handlePageChange
  };
}
