import React, { createContext, useState } from 'react';
import { fetchLocations, fetchLocationsByName } from '../../helpers/ajax';

const LocationsContext = createContext({});
const { Provider } = LocationsContext;
const LocationsConsumer = LocationsContext.Consumer;
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

let LocationsProvider = (props: any) => {
  // TODO : find to right type to provide to children
  const [locations, setLocations] = useState<Array<Location> | null>(null);

  const getLocations = () => {
    fetchLocations().then((res) => {
      setLocations(res);
    });
  };

  const getLocationsByName = (title: string) => {
    fetchLocationsByName(title).then((res) => {
      setLocations(res);
    });
  };

  const store = {
    locations,
    getLocations,
    getLocationsByName
  };

  return <Provider value={store}>{props.children}</Provider>;
};

export { LocationsProvider, LocationsConsumer };
export default LocationsContext;
