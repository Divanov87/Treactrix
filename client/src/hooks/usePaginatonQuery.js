import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function usePaginationQuery(initialPage) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', initialPage);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [initialPage, navigate, location.pathname]);

  const searchParams = new URLSearchParams(location.search);
  const pageFromQuery = parseInt(searchParams.get('page')) || initialPage;

  return pageFromQuery;
}
