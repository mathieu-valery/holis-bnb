import React from 'react';
import './Card.css';

interface Category {
  id: number;
  name: string;
  description: string;
}
interface Location {
  id: number;
  title: string;
  description: string;
  location: string;
  picture: string;
  stars: number;
  numberOfRooms: number;
  price: number;
  categoryId: number;
  category: Category;
}

interface CardProps {
  location: Location;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="card">
      <img src={props.location.picture} />
      <p className="card-title">
        <strong>{props.location.title}</strong>
      </p>
      <p className="card-location">{props.location.location}</p>
      <p className="card-price">{`${props.location.price}€ /night`}</p>
    </div>
  );
};

export default Card;
