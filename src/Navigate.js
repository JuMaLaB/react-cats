import React from 'react';

const Navigate = function ({ currentPage, setCurrentPage, totalPages, limit, setError, setIsLoaded, setItems }) {

  function fetchDatas(url) {
    const datas = fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
      }})
    .then((response) => {
      if (!response.ok) {
        throw Error('ERROR in response !');
      }
      return response.json();
    }).then((json) => {
        console.log(json);
        setIsLoaded(true);
        setItems(json);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  function navigate(e) {
    e.preventDefault();
    const event = e.currentTarget.innerText;
    console.log("event = " + event + "/ page = " + currentPage);
    const newCurrentPage = (event.toUpperCase() === 'NEXT' ? currentPage + 1 : (event.toUpperCase() === 'PREV' ? currentPage - 1 : currentPage));
    setCurrentPage(newCurrentPage);
    const fetchUrl = `https://api.thecatapi.com/v1/breeds?page=${newCurrentPage}&limit=${limit}`;
    
    const elemPrev = document.getElementsByClassName('prev')[0];    
    (newCurrentPage >= 1) ? elemPrev.style.visibility = 'visible' : elemPrev.style.visibility = 'hidden';
    const elemNext = document.getElementsByClassName('next')[0];
    (newCurrentPage === totalPages) ? elemNext.style.visibility = 'hidden' : elemNext.style.visibility = 'visible';

    console.log("prev = " + elemPrev + " / next = " + elemNext + " / page = " + newCurrentPage + " / fetchUrl = " + fetchUrl);
    fetchDatas(fetchUrl);
  }

  return (
    <nav aria-label="Page navigation example" className="mt-5">
      <ul className="pagination">
        <li className="page-item prev" style={{ visibility: 'hidden' }}>
          <a className="page-link bg-secondary text-light" href="#" onClick={navigate} style={{ width: '60px'}}>Prev</a>
        </li>
        <li className="page-item next" style={{ visibility: 'visible' }}>
          <a className="page-link bg-secondary text-light" href="#" onClick={navigate} style={{ width: '60px'}}>Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigate;
