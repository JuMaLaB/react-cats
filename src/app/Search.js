import React from 'react';

const Search = function ({ setFetchUrl, setCurrentPage, setTotalPages }) {

  function search(e) {
    e.preventDefault();
    const searchParam = document.getElementById('searchCriteria').value;
    setCurrentPage(0);
    setTotalPages(0);
    setFetchUrl(`https://api.thecatapi.com/v1/breeds/search?q=${searchParam}`);
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
