import React, { useEffect, useContext, useMemo } from 'react';
import './Search.css';
import { Location } from '../../helpers/interfaces';
import Card from '../../components/Card/Card';
import LocationsContext from '../../components/Context/LocationsContext';

interface preSortedCategory {
  id: number;
  name: string;
  description: string;
  locations: Array<Location>;
}

interface sortedCategory {
  id: number;
  name: string;
  description: string;
  locations: Array<sortedLocation>;
}

interface sortedLocation {
  numberOfRooms: number;
  locations: Array<Location>;
}

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
  const locationsContext = useContext(LocationsContext);
  const locations = locationsContext.locations;

  useEffect(() => {
    locationsContext.getLocations();
  }, []);

  const groupLocationsByCategories = (array: Array<Location>) => {
    return array.reduce((acc: Array<preSortedCategory>, currentLocation: Location) => {
      const findedCategoryIndex = acc.findIndex(
        (category) => category.id === currentLocation.category.id
      );
      if (findedCategoryIndex > -1) {
        acc[findedCategoryIndex].locations.push(currentLocation);
      } else {
        acc.push({ ...currentLocation.category, locations: [currentLocation] });
      }
      return acc;
    }, []);
  };

  const groupLocationsByNbrOfRooms = (array: Array<Location>) => {
    return array.reduce((acc: Array<sortedLocation>, currentLocation: Location) => {
      const findedNumberOfRoomsIndex = acc.findIndex(
        (el) => el.numberOfRooms === currentLocation.numberOfRooms
      );
      if (findedNumberOfRoomsIndex > -1) {
        acc[findedNumberOfRoomsIndex].locations.push(currentLocation);
      } else {
        acc.push({ numberOfRooms: currentLocation.numberOfRooms, locations: [currentLocation] });
      }
      return acc;
    }, []);
  };

  const groupCategoriesByRooms = (categories: Array<preSortedCategory>): Array<sortedCategory> => {
    const groupedCategories = categories.map((category) => {
      return { ...category, locations: groupLocationsByNbrOfRooms(category.locations) };
    });

    groupedCategories.map((category) =>
      category.locations.sort(
        (a: sortedLocation, b: sortedLocation) => a.numberOfRooms - b.numberOfRooms
      )
    );

    return groupedCategories;
  };

  const filterByCategorieAndNumberOfRooms = (locations: Array<Location> | null) => {
    if (locations) {
      const categoriesByLocations = groupLocationsByCategories(locations);
      const categories = groupCategoriesByRooms(categoriesByLocations);
      return categories;
    }
  };

  const categoriesByLocationsAndNumberOfRooms = useMemo(
    () => filterByCategorieAndNumberOfRooms(locations),
    [locations]
  );

  return (
    <div className="search">
      {categoriesByLocationsAndNumberOfRooms &&
        categoriesByLocationsAndNumberOfRooms.map((category) => (
          <React.Fragment key={category.id}>
            <h1 key={category.id} className="category-title">
              {category.name}
            </h1>
            {category.locations.map((obj: sortedLocation, index: number) => (
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
