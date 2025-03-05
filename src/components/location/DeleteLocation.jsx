import React, { useState, useEffect } from 'react';
import { deleteLocation } from '../../services/locationService';

// Component for deleting location
const DeleteLocation = () => {
    const [locationId, setLocationId] = useState(1);
    const [message, setMessage] = useState('');
  
    const handleDeleteLocation = async (e) => {
      e.preventDefault();
      try {
        await deleteLocation(locationId);
        setMessage('Location deleted successfully!');
        setLocationId('');
      } catch (error) {
        setMessage('Error deleting location: ' + error.message);
      }
    };
  
    return (
      <div>
        <h2>Delete Location</h2>
        <form onSubmit={handleDeleteLocation}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
          <div>
            <label>Id:</label></div></div>
            <input
              type="number"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              min={1}
              required
            />
          </div>
          <button type="submit">Delete Location</button>
        </form>
        {message && <div>{message}</div>}
      </div>
    );
  };

  export default DeleteLocation;