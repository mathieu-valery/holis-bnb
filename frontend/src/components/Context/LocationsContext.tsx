import React, { createContext, useState } from 'react';
import { fetchLocations, fetchLocationsByName } from '../../helpers/ajax';
import { Location } from '../../helpers/interfaces';

const LocationsContext = createContext({});
const { Provider } = LocationsContext;
const LocationsConsumer = LocationsContext.Consumer;

let LocationsProvider = (props: any) => {
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
