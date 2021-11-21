import React, { useState, useEffect } from 'react';
import Navigate from './Navigate';
import Search from './Search';
import Cat from './Cat';
import '../css/App.css';

const App = function () {
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const limit = 12;
  const [fetchUrl, setFetchUrl] = useState(`https://api.thecatapi.com/v1/breeds?page=${currentPage}&limit=${limit}`);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // console.log(localStorage);
  // console.log("fetchUrl = " + fetchUrl + " / page = " + currentPage);

  useEffect(() => {
    fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
      }})
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response !');
        }
        setTotalPages(Math.ceil(response.headers.get('Pagination-Count') / limit - 1));
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
  }, [fetchUrl])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className="row mb-5 justify-content-center">
        <Search setFetchUrl={setFetchUrl} />
        <Cat items={items} />
        <Navigate currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    );
  }
  
};


export default App;
