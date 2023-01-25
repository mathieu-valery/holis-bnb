import React, { useEffect, useContext } from 'react';
import './Search.css';
import { Location } from '../../helpers/interfaces';
import Card from '../../components/Card/Card';
import LocationsContext from '../../components/Context/LocationsContext';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
  let locationsByCategoriesAndNbrOfRooms: any = [];
  const locationsContext: any = useContext(LocationsContext);
  const locations = locationsContext.locations;

  useEffect(() => {
    locationsContext.getLocations();
  }, []);

  let groupByCategories = (array: any) => {
    return array.reduce((acc: any, currentLocation: Location) => {
      const findedCategoryIndex = acc.findIndex(
        (category: any) => category.id === currentLocation.category.id
      );
      if (findedCategoryIndex > 0) {
        acc[findedCategoryIndex].locations.push(currentLocation);
      } else {
        acc.push({ ...currentLocation.category, locations: [currentLocation] });
      }
      return acc;
    }, []);
  };

  let groupByNbrOfRooms = (array: any) => {
    return array.reduce((acc: any, currentLocation: any) => {
      const findedNumberOfRoomsIndex = acc.findIndex(
        (el: any) => el.numberOfRooms === currentLocation.numberOfRooms
      );
      if (findedNumberOfRoomsIndex > -1) {
        acc[findedNumberOfRoomsIndex].locations.push(currentLocation);
      } else {
        acc.push({ numberOfRooms: currentLocation.numberOfRooms, locations: [currentLocation] });
      }
      return acc;
    }, []);
  };

  if (locations) {
    locationsByCategoriesAndNbrOfRooms = groupByCategories(locations);
    locationsByCategoriesAndNbrOfRooms.forEach(
      (el: any) => (el.locations = groupByNbrOfRooms(el.locations))
    );
    locationsByCategoriesAndNbrOfRooms.map((category: any) =>
      category.locations.sort((a: any, b: any) => a.numberOfRooms - b.numberOfRooms)
    );
  }

  return (
    <div className="search">
      {locationsByCategoriesAndNbrOfRooms.map((category: any) => (
        <React.Fragment key={category.id}>
          <h1 key={category.id} className="category-title">
            {category.name}
          </h1>
          {category.locations.map((obj: any, index: string) => (
            <div key={index} className="rooms-section">
              <h2 className="rooms-title">
                {`${obj.numberOfRooms} room${obj.numberOfRooms > 1 ? 's' : ''}`}
              </h2>
              <div className="cards-section">
                {obj.locations.map((location: Location) => (
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
