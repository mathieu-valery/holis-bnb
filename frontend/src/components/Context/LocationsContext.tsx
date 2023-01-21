import React, { createContext, useState } from 'react';
import axios from 'axios';

const LocationsContext = createContext({});
const { Provider } = LocationsContext;
const LocationsConsumer = LocationsContext.Consumer;
const url = 'localhost:8000';

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

  async function fetchLocations() {
    const { data } = await axios.get(`http://${url}/locations`);
    return data;
  }

  async function fetchLocationsByName(title: string) {
    const { data } = await axios.get(`http://${url}/locations?title=${title}`);
    return data;
  }

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
