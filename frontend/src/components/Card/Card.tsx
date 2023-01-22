import React from 'react';
import './Card.css';
import { Location } from '../../helpers/interfaces';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  location: Location;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/locations/${props.location.id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={props.location.picture} />
      <p className="card-title">
        <strong>{props.location.title}</strong>
      </p>
      <p className="card-location">{props.location.location}</p>
      <p className="card-price">
        <strong>{`€${props.location.price}`}</strong> night
      </p>
    </div>
  );
};

export default Card;
