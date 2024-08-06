

import { useLocation, useNavigate} from 'react-router-dom';

import './EventPagination.css';

export default function Pagination ({ totalPages, currentPage, onPageChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', pageNumber);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };
  return (
    <div className="pagination">
      <button
        className="page-item"
        onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="page-item"
        onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
};