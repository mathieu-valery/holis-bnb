import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchLocation } from '../../helpers/ajax';
import { Location } from '../../helpers/interfaces';
import './DisplayLocation.css';

type DisplayLocationPageProps = {};

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {
  const CurrentLocationObject = useLocation();
  const regex = /\d/g;
  let id: string;

  const matched: RegExpMatchArray | null = CurrentLocationObject.pathname.match(regex);
  if (matched) {
    id = matched[0];
  }

  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    fetchLocation(id).then((res) => {
      setLocation(res);
    });
  }, []);

  return (
    <div className="display-location">
      {location && (
        <>
          <img src={location.picture} />
          <div className="container">
            <div className="display-location__content">
              <p className="title">{location.title}</p>
              <p className="category-name">{location.category.name}</p>
              <p className="category-description">{location.category.description}</p>
            </div>
            <p className="price">
              <strong>{`€${location.price}`}</strong> night
            </p>
            <div className="display-location__edit">
              <div className="container">
                <p>Modifiy price</p>
                <input placeholder="enter new price"></input>
                <div className="buttons-container">
                  <button className="delete-button">Delete</button>
                  <button className="confirm-button">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayLocationPage;
