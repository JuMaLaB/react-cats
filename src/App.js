import React, { useState, useEffect } from 'react';
import Navigate from './Navigate';
import Search from './Search';
import './App.css';

const App = function () {
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const limit = 12;  
  const fetchUrl = `https://api.thecatapi.com/v1/breeds?page=${currentPage}&limit=${limit}`;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  console.log(localStorage);

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
  }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className="row mb-5 justify-content-center">
        <Search
          setError={setError}
          setIsLoaded={setIsLoaded}
          setItems={setItems}
          />
        <div className="cats-list row w-100">
          {items.map((cat) => (
            <div key={cat.name} className="col-lg-2 col-md-4 col-6 px-2 mb-2">
              <div className="col-12 border rounded h-100 p-2">
                <img className="w-100 rounded mb-2" src={cat.image?.url} alt="avatar"></img>
                <div className="cat-info">
                  <p className="mb-1">Id : {cat.id}</p>
                  <p className="mb-1">Name : {cat.name}</p>
                  <p className="mb-1">Temperament : {cat.temperament}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Navigate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          limit={limit}
          setError={setError}
          setIsLoaded={setIsLoaded}
          setItems={setItems}
          />
      </div>
    );
  }
  
};


export default App;
