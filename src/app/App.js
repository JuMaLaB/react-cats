import React, { useState, useEffect, useCallback } from 'react';
import Navigate from './Navigate';
import Search from './Search';
import Cat from './Cat';
import logo from '../assets/logo.svg';
import '../css/App.css';

const searhCats = (value) => {
  return fetch(`https://api.thecatapi.com/v1/breeds/search?q=${value}`, {
    method: 'GET',
    headers: {
      'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
    }
  }).then((response) => {
    return response.json();
  });
};

const App = function () {

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 12;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // console.log(localStorage);

  const fetchCats = (currentPage) => {
    setIsLoaded(false);
    return fetch(`https://api.thecatapi.com/v1/breeds?page=${currentPage}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'x-api-key': '4527d2a2-3e3c-4db8-b7e4-b2712cbb6917'
      }
    }).then((response) => {
      if (!response.ok) {
        throw Error('ERROR in response !');
      }
      const count = response.headers.get('Pagination-Count');
      count !== null ? setTotalPages(Math.ceil(count / limit - 1)) : setTotalPages(0);
      return response.json();
    },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  useEffect(() => {
    fetchCats(currentPage).then((cats) => {
      setItems(cats);
      setIsLoaded(true);
    });

  }, [currentPage])

  const handeleOnSearch = useCallback(async (value) => {
    const cats = await searhCats(value);
    setItems(cats);
    setCurrentPage(0);
    setIsLoaded(true);
  }, []);

  const handleOnNav = useCallback((currentPage) => {
    fetchCats(currentPage).then((cats) => {
      setItems(cats);
      setCurrentPage(currentPage);
      setIsLoaded(true);
    });
  }, []);

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } 
 
  return (
    <div className="row mb-5 justify-content-center">
      <Search onSearch={handeleOnSearch} />
      {!isLoaded 
        ? <img src={logo} className="App-logo" alt="logo" />
        : <div>
            <Cat items={items} />
            <Navigate currentPage={currentPage} totalPages={totalPages} onNav={handleOnNav}/>
          </div>
        }
    </div>
  );

};


export default App;
