import React, { useState, useEffect } from 'react';
import Navigate from './Navigate';
import Search from './Search';
import Cat from './Cat';
import logo from '../assets/logo.svg';
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

  useEffect(() => {
    setIsLoaded(false);
    fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
      }})      
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR in response !');
        }
        const count = response.headers.get('Pagination-Count');
        count !== null ? setTotalPages(Math.ceil(count / limit - 1)) : setTotalPages(0);
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
    return (
      <div className="row mb-5 justify-content-center">
        <Search setCurrentPage={setCurrentPage} setFetchUrl={setFetchUrl} setTotalPages={setTotalPages} />
        <img src={logo} className="App-logo" alt="logo"/>
      </div>
    );
  } else {
    return (
      <div className="row mb-5 justify-content-center">
        <Search setCurrentPage={setCurrentPage} setFetchUrl={setFetchUrl} setTotalPages={setTotalPages} />
        <Cat items={items} />
        <Navigate currentPage={currentPage} setCurrentPage={setCurrentPage} setFetchUrl={setFetchUrl} totalPages={totalPages} />
      </div>
    );
  }
  
};


export default App;
