import React from 'react';
import '../css/Navigate.css';

const Navigate = function ({ currentPage, setCurrentPage, totalPages }) {

  function navigate(e) {
    e.preventDefault();
    const event = e.currentTarget.innerText;
    const newCurrentPage = (event.toUpperCase() === 'NEXT' ? currentPage + 1 : (event.toUpperCase() === 'PREV' ? currentPage - 1 : currentPage));
    setCurrentPage(newCurrentPage);

    const elemPrev = document.getElementsByClassName('prev')[0];
    (newCurrentPage >= 1) ? elemPrev.style.visibility = 'visible' : elemPrev.style.visibility = 'hidden';
    const elemNext = document.getElementsByClassName('next')[0];
    (newCurrentPage === totalPages) ? elemNext.style.visibility = 'hidden' : elemNext.style.visibility = 'visible';
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
