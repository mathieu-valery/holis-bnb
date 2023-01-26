import React, { createContext, useState } from 'react';
import { fetchLocations, fetchLocationsByName } from '../../helpers/axios';
import { Location } from '../../helpers/interfaces';

interface LocationsContextType {
  locations: Array<Location> | null;
  getLocations(): void;
  getLocationsByName(title: string): void;
}

interface LocationsContextProps {
  children: React.ReactNode;
}
const LocationsContext = createContext<LocationsContextType>({
  locations: [],
  getLocations: () => {},
  getLocationsByName: () => {}
});

const { Provider } = LocationsContext;
const LocationsConsumer = LocationsContext.Consumer;

let LocationsProvider: React.FC<LocationsContextProps> = ({ children }) => {
  const [locations, setLocations] = useState<Array<Location> | null>(null);

  const getLocations = () => {
    fetchLocations()
      .then((response) => {
        setLocations(response);
      })
      .catch((error) => console.error(error.message));
  };

  const getLocationsByName = (title: string) => {
    fetchLocationsByName(title)
      .then((response) => {
        setLocations(response);
      })
      .catch((error) => console.error(error.message));
  };

  const store = {
    locations,
    getLocations,
    getLocationsByName
  };

  return <Provider value={store}>{children}</Provider>;
};

export { LocationsProvider, LocationsConsumer };
export default LocationsContext;
