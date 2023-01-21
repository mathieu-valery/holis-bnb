import React from 'react';
import SearchPage from './pages/Search/Search';
import DisplayLocation from './pages/DisplayLocation/DisplayLocation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import { LocationsProvider } from './components/Context/LocationsContext';

function App() {
  return (
    <Router>
      <LocationsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<SearchPage />} />
            <Route path="/locations/:id" element={<DisplayLocation />} />
          </Route>
        </Routes>
      </LocationsProvider>
    </Router>
  );
}

export default App;
