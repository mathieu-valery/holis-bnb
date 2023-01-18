import React, { useState, useEffect } from 'react';
import './Search.css';
import axios from 'axios';

type SearchPageProps = {};
const url = 'localhost:8000';

const SearchPage: React.FC<SearchPageProps> = () => {
  // Create a function to fetch all locations from database
  const [locations, setLocations] = useState(null);

  async function fetchLocations() {
    const { data } = await axios.get(`http://${url}/locations`);
    return data;
  }

  useEffect(() => {
    fetchLocations().then((res) => {
      setLocations(res);
    });
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);
  // Create a function to sort locations by categories & by number of rooms

  // Create a search function linked to the search input in the header

  return <div className="search">{/* List of sorted locations card */}</div>;
};

export default SearchPage;
