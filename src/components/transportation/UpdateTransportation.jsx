import React, { useState, useEffect } from 'react';
import { editTransportation } from '../../services/transportationService';

import { TRANSPORTATION_TYPE } from '../../common/transportationType';

const UpdateTransportation = () => {
    const [transportationId, setTransportationId] = useState(1);
    const [originLocationId, setOriginLocationId] = useState(1);
    const [destinationLocationId, setDestLocationId] = useState(1);
    const [transportationType, setTransportationType] = useState('');
    const [operatingDays, setOperatingDays] = useState([]);
    const [message, setMessage] = useState('');
  
    const handleUpdateTransportation = async (e) => {
      e.preventDefault();
      try {
        const updatedTransportation = { transportationId: transportationId ,originLocation: {locationId: originLocationId}, 
        destinationLocation: {locationId: destinationLocationId}, transportationType, operatingDays: JSON.parse(operatingDays) };
        await editTransportation(updatedTransportation);
        setMessage('Transportation updated successfully!');
        setTransportationId(1);
        setOriginLocationId(1);
        setDestLocationId(1);
        setOperatingDays([]);
        setTransportationType('');
      } catch (error) {
        setMessage('Error updating transportation: ' + error.message);
      }
    };
  
    return (
      <div>
        <h2>Update Transportation</h2>
        <form onSubmit={handleUpdateTransportation}>
          <div style={{ display: 'inline', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
            <label>Transportation Id:</label></div></div>
          <div>
            <input
              type="number"
              value={transportationId}
              onChange={(e) => setTransportationId(e.target.value)}
              min={1}
              required
            />
          </div>
          <div style={{ display: 'inline', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
            <label>Origin Location Id:</label></div></div>
          <div>
            <input
              type="number"
              value={originLocationId}
              onChange={(e) => setOriginLocationId(e.target.value)}
              min={1}
              required
            />
          </div>
          <div style={{ display: 'inline', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
            <label>Destination Location Id:</label></div></div>
          <div>
            <input
              type="number"
              value={destinationLocationId}
              onChange={(e) => setDestLocationId(e.target.value)}
              min={1}
              required
            />
          </div>
          <div style={{ display: 'inline', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
            <label>Transportation Type:</label></div></div>
          <div>
          <select
                value={transportationType}
                onChange={(e) => setTransportationType(e.target.value)}
                >
                <option value="">Select a type</option>
                {Object.keys(TRANSPORTATION_TYPE).map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                    </option>
                ))}
            </select>
          </div>
          <div style={{ display: 'inline', alignItems: 'center' }}>
          <div style={{ flex: '0 0 80px' }}>
            <label>Operating Days:</label></div></div>
          <div>
            <input
              type="text"
              value={operatingDays}
              onChange={(e) => setOperatingDays(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Transportation</button>
        </form>
        {message && <div>{message}</div>}
      </div>
    );
}

export default UpdateTransportation;