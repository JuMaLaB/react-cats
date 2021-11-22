import React, { useState, useCallback } from 'react';

const Search = function ({ onSearch }) {

  const [searchVal, setSearchVal] = useState('');
 
  const handleChange = useCallback((e) => {
    e.preventDefault();
    setSearchVal(e.currentTarget.value);
  }, []);

  const handleSearch = useCallback(() => {
    onSearch && onSearch(searchVal);
  }, [searchVal, onSearch]);
  
  return (
    <div className="search w-100">
        <div className="form-group row d-flex justify-content-start">
            <div className="col-sm-2 col-form-label py-0 text-light">
                <label htmlFor="searchCriteria" className="col-12 h-100 bg-secondary border rounded d-flex align-items-center">Get cat by name</label>
            </div>
            <div className="col-sm-6">
                <input type="text" id="searchCriteria" className="form-control h-100" placeholder="your search..." required onChange={handleChange}/>
            </div>
            <input type="button" className="col-sm-2 btn btn-secondary" value="Submit" onClick={handleSearch}/>
        </div>
    </div>
  );
};

export default Search;
