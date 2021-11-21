import React from 'react';
import '../css/Cat.css';

const Cat = function ({ items }) {

  return (
    <div className="cats-list row w-100">
      {items.map(({id, name, temperament, image}) => (
        <div key={name} className="col-lg-2 col-md-4 col-6 px-2 mb-2">
          <div className="col-12 border rounded h-100 p-2">
            <img className="w-100 rounded mb-2" src={image?.url} alt="avatar"></img>
            <div className="cat-info">
              <p className="mb-1">Id : {id}</p>
              <p className="mb-1">Name : {name}</p>
              <p className="mb-1">Temperament : {temperament}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cat;