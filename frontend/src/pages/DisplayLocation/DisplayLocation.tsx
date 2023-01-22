import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchLocation, updateLocationPrice, deleteLocation } from '../../helpers/ajax';
import { Location } from '../../helpers/interfaces';
import './DisplayLocation.css';

type DisplayLocationPageProps = {};

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {
  const CurrentLocationObject = useLocation();
  const regex = /\d+/g;
  let id: string;
  let refInput = useRef(document.createElement('input'));
  const navigate = useNavigate();

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

  const handleClickConfirm = () => {
    if (window.confirm('UPDATE PRICE: Do you really want to update the price of this location ?')) {
      updateLocationPrice(id, refInput.current.value).then((res) => {
        setLocation(res);
      });
    }
  };

  const handleClickDelete = () => {
    if (window.confirm('DELETE LOCATION: Are you sure ? This action is irreversible')) {
      deleteLocation(id).then(() => {
        navigate('/');
      });
    }
  };

  return (
    <div className="display-location">
      {location && (
        <>
          <img src={location.picture} />
          <div className="container">
            <div className="display-location__content">
              <p className="title">{location.title}</p>
              <p className="category-name">{location.category.name}</p>
              <p className="category-description">{location.description}</p>
            </div>
            <p className="price">
              <strong>{`€${location.price}`}</strong> night
            </p>
            <div className="display-location__edit">
              <div className="container">
                <p>Modifiy price</p>
                <input placeholder="enter new price" ref={refInput}></input>
                <div className="buttons-container">
                  <button className="delete-button" onClick={handleClickDelete}>
                    Delete
                  </button>
                  <button className="confirm-button" onClick={handleClickConfirm}>
                    Confirm
                  </button>
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
