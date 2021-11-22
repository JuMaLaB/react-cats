import React, { useCallback } from 'react';
import '../css/Navigate.css';

const Navigate = function ({  currentPage, totalPages, onNav}) {

  const handlePrev = useCallback((e) => {
    e.preventDefault();
    const newCurrentPage = currentPage - 1;
    onNav && onNav(newCurrentPage);
  }, [currentPage, onNav]);

  const handleNext = useCallback((e) => {
    e.preventDefault();
    const newCurrentPage = currentPage + 1;
    onNav && onNav(newCurrentPage);
  }, [currentPage, onNav]);

  const prev = currentPage >= 1 
    ? <li className="page-item prev">
        <button className="page-link bg-secondary text-light" onClick={handlePrev} style={{ width: '60px' }}>Prev</button>
      </li>
    : null;

  const next = currentPage !== totalPages
    ? <li className="page-item next">
        <button className="page-link bg-secondary text-light" onClick={handleNext} style={{ width: '60px' }}>Next</button>
      </li>
    : null ;

  return (
    <nav aria-label="Page navigation example" className="mt-5">
      <ul className="pagination">
        {prev}
        {next}
      </ul>
    </nav>
  );
};

export default Navigate;
