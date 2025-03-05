import React, { useState, useEffect } from 'react';
import { editLocation } from '../../services/locationService';

// Component for updating location
const UpdateLocation = () => {
    const [locationId, setLocationId] = useState(1);
    const [locationName, setLocationName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [locationCode, setLocationCode] = useState('');
    const [message, setMessage] = useState('');
  
    const handleUpdateLocation = async (e) => {
      e.preventDefault();
      try {
        const updatedLocation = { locationId: locationId,name: locationName, country: country,
            city: city, locationCode: locationCode };
        await editLocation(updatedLocation);
        setMessage('Location updated successfully!');
        setLocationName('');
        setCountry('');
        setCity('');
        setLocationCode('');
      } catch (error) {
        setMessage('Error updating location: '+ error.message);
      }
    };
  
    return (
      <div>
        <h2>Update Location</h2>
        <form onSubmit={handleUpdateLocation}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
          <div>
            <label>Id: </label></div></div>
            <input
              type="number"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              maxLength={100}
              min={1}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
          <div>
            <label>Name: </label></div></div>
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
            <label>Country: </label></div></div>
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
            <label>City: </label></div></div>
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
            <label>Code: </label></div></div>
            <input
              type="text"
              value={locationCode}
              onChange={(e) => setLocationCode(e.target.value)}
              maxLength={5}
              required
            />
          </div>
          <button type="submit">Update Location</button>
        </form>
        {message && <div>{message}</div>}
      </div>

    );
  };

  export default UpdateLocation;