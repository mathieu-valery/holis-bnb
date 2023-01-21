import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchLocation } from '../../helpers/ajax';
type DisplayLocationPageProps = {};

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

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {
  // Create a function to handle price change and persist it to database
  // Create a function to delete the location and persist it to database
  // Confusing because the state is named 'location
  const CurrentLocationObject = useLocation();
  const regex = /\d/g;
  let id: string;
  console.log(CurrentLocationObject.pathname.match(regex));
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
          <h1>{location.title}</h1>
          {/* image */}
          <div className="display-location__content">
            {/* title */}
            {/* property type */}
            {/* category description */}
            {/* price */}
          </div>
          <div className="display-location__edit">
            {/* price input */}
            {/* price button */}
            {/* delete button */}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayLocationPage;
