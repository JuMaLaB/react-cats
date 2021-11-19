import React from 'react';

const Search = function ({ setError, setIsLoaded, setItems }) {

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

  function search(e) {
    e.preventDefault();
    const searchParam = document.getElementById('searchCriteria').value;
    console.log(searchParam);
    const fetchUrl = `https://api.thecatapi.com/v1/breeds/search?q=${searchParam}`;

    document.getElementsByClassName('prev')[0].style.visibility = 'hidden';
    document.getElementsByClassName('next')[0].style.visibility = 'hidden';

    fetchDatas(fetchUrl);
  }

  return (
    <form id="listCat" className="w-100">
        <div className="form-group row d-flex justify-content-start">
            <div className="col-sm-2 col-form-label py-0 text-light">
                <label htmlFor="searchCriteria" className="col-12 h-100 bg-secondary border rounded d-flex align-items-center">Get cat by name</label>
            </div>
            <div className="col-sm-6">
                <input type="text" id="searchCriteria" className="form-control h-100" placeholder="your search..." required/>
            </div>
            <input type="submit" className="col-sm-2 btn btn-secondary" value="Submit" onClick={search}/>
        </div>
    </form>
  );
};

export default Search;
