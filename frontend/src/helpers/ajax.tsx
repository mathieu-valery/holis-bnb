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

const updateLocationPrice = async (id: string, price: string) => {
  const { data } = await axios.patch(`http://${url}/locations/${id}`, { price: parseInt(price) });
  return data;
};

const deleteLocation = async (id: string) => {
  const { data } = await axios.delete(`http://${url}/locations/${id}`);
  return data;
};

export { fetchLocations, fetchLocationsByName, fetchLocation, updateLocationPrice, deleteLocation };
