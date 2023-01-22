import React, { useEffect, useContext } from 'react';
import './Search.css';
import { Location } from '../../helpers/interfaces';
import Card from '../../components/Card/Card';
import LocationsContext from '../../components/Context/LocationsContext';

type SearchPageProps = {};

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

  const filterByCategoriesAndNumberOfRooms = () => {
    locationsByCategory = groupBy(locations, 'categoryId');
    Object.entries<any>(locationsByCategory).forEach(([key, value]: [string, Array<Location>]) => {
      locationsByCategory[key] = groupBy(value, 'numberOfRooms');
    });
  };

  if (locations) {
    filterByCategoriesAndNumberOfRooms();
  }

  return (
    <div className="search">
      {Object.entries<any>(locationsByCategory).map(([key, LocationsByRooms]) => (
        <React.Fragment key={key}>
          <h1 key={key} className="category-title">
            {LocationsByRooms[Object.keys(LocationsByRooms)[0]][0].category.name}
          </h1>
          {Object.entries<any>(LocationsByRooms).map(([key, locationArray]) => (
            <div key={key} className="rooms-section">
              <h2 className="rooms-title">
                {`${locationArray[0]['numberOfRooms']} room
                ${locationArray[0]['numberOfRooms'] > 1 ? 's' : ''}`}
              </h2>
              <div className="cards-section">
                {locationArray.map((location: Location) => (
                  <Card key={location.id} location={location}></Card>
                ))}
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SearchPage;
