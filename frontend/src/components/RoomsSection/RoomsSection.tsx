import React from 'react';
import './RoomsSection.css';

type RoomsSectionProps = {
  title: string;
  children: React.ReactNode;
  // I tried to use JSX.Element type but doesnt work
};

const RoomsSection: React.FC<RoomsSectionProps> = (props) => {
  return (
    <div className="rooms-section">
      <h2 className="title">{props.title}</h2>
      <div className="cards-section">{props.children}</div>
    </div>
  );
};

export default RoomsSection;
