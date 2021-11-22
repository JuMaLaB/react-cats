import React, { useEffect } from 'react';
import '../css/Navigate.css';

const Navigate = function ({  currentPage, setCurrentPage, setFetchUrl, totalPages}) {

  useEffect(() => {
    const elemPrev = document.getElementsByClassName('prev')[0];
    const elemNext = document.getElementsByClassName('next')[0];
    (currentPage >= 1) ? elemPrev.style.visibility = 'visible' : elemPrev.style.visibility = 'hidden';
    (currentPage === totalPages) ? elemNext.style.visibility = 'hidden' : elemNext.style.visibility = 'visible';
    if (currentPage === 0 && totalPages === 0) {
      elemNext.style.visibility = 'hidden';
      elemPrev.style.visibility = 'hidden';
    }
  }, [currentPage, totalPages])

  function navigate(e) {
    e.preventDefault();
    const event = e.currentTarget.innerText;
    const newCurrentPage = (event.toUpperCase() === 'NEXT' ? currentPage + 1 : (event.toUpperCase() === 'PREV' ? currentPage - 1 : currentPage));
    setCurrentPage(newCurrentPage);
    setFetchUrl(`https://api.thecatapi.com/v1/breeds?page=${newCurrentPage}&limit=12`);    
  }

  return (
    <nav aria-label="Page navigation example" className="mt-5">
      <ul className="pagination">
        <li className="page-item prev" style={{ visibility: 'hidden' }}>
          <button className="page-link bg-secondary text-light" onClick={navigate} style={{ width: '60px' }}>Prev</button>
        </li>
        <li className="page-item next" style={{ visibility: 'visible' }}>
          <button className="page-link bg-secondary text-light" onClick={navigate} style={{ width: '60px' }}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigate;
