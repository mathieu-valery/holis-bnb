import React, { useEffect, useContext } from 'react';
import './Search.css';
// import axios from 'axios';
import CategorySection from '../../components/CategorySection/CategorySection';
import RoomsSection from '../../components/RoomsSection/RoomsSection';
import Card from '../../components/Card/Card';
import LocationsContext from '../../components/Context/LocationsContext';

type SearchPageProps = {};
// const url = 'localhost:8000';

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

const SearchPage: React.FC<SearchPageProps> = () => {
  let locationsByCategory: any = {};
  const locationsContext: any = useContext(LocationsContext);
  const locations = locationsContext.locations;

  useEffect(() => {
    locationsContext.getLocations();
  }, []);

  const groupBy = (array: Array<Location>, key: keyof Location): object => {
    return array.reduce((result: any, currentValue: any) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  if (locations) {
    locationsByCategory = groupBy(locations, 'categoryId');
    Object.entries<any>(locationsByCategory).forEach(([key, value]: [string, Array<Location>]) => {
      locationsByCategory[key] = groupBy(value, 'numberOfRooms');
    });
  }

  // Create a search function linked to the search input in the header

  return (
    <div className="search">
      {Object.entries<any>(locationsByCategory).map(([key, LocationsByRooms]) => (
        <CategorySection
          key={key}
          title={LocationsByRooms[Object.keys(LocationsByRooms)[0]][0]['category']['name']}>
          {Object.entries<any>(LocationsByRooms).map(([key, locationArray]) => (
            <RoomsSection key={key} title={`number of rooms: ${locationArray[0]['numberOfRooms']}`}>
              {locationArray.map((location: Location) => (
                <Card key={location.id} location={location}></Card>
              ))}
            </RoomsSection>
          ))}
        </CategorySection>
      ))}
    </div>
  );
};

export default SearchPage;
