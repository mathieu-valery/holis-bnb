import axios from 'axios';

const url = 'localhost:8000';

const fetchLocations = async () => {
  const { data } = await axios.get(`http://${url}/locations`);
  return data;
};

const fetchLocationsByName = async (title: string) => {
  const { data } = await axios.get(`http://${url}/locations?title=${title}`);
  return data;
};

const fetchLocation = async (id: string) => {
  const { data } = await axios.get(`http://${url}/locations/${id}`);
  return data;
};

export { fetchLocations, fetchLocationsByName, fetchLocation };
