import React, { useState, useEffect } from 'react';
import { addLocation } from '../../services/locationService';

// Component for adding a new location
const AddLocation = () => {
    const [locationName, setLocationName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [locationCode, setLocationCode] = useState('');
    const [message, setMessage] = useState('');
  
    const handleAddLocation = async (e) => {
      e.preventDefault();
      let res;
      try {
        const newLocation = { name: locationName, country: country,
            city: city, locationCode: locationCode };
        res = await addLocation(newLocation);
        setMessage('Location added successfully!');
        setLocationName('');
        setCountry('');
        setCity('');
        setLocationCode('');
      } catch (error) {
        setMessage('Error adding location: '+ error.response.data.message);
      }
    };
  
    return (
      <div>
        <h2>Add Location</h2>
        <form onSubmit={handleAddLocation}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
          <div>
            <label>Name:</label></div></div>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
          <div>
            <label>Country:</label></div></div>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
          <div>
            <label>City:</label></div></div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
          <div>
            <label>Code:</label></div></div>
            <input
              type="text"
              value={locationCode}
              onChange={(e) => setLocationCode(e.target.value)}
              maxLength={5}
              required
            />
          </div>
          <button type="submit">Add Location</button>
        </form>
        {message && <div>{message}</div>}
      </div>
    );
  };

  export default AddLocation;