import React, { useState, useEffect } from 'react';
import { addTransportation } from '../../services/transportationService';

import { TRANSPORTATION_TYPE } from '../../common/transportationType';

const AddTransportation = () => {
    const [originLocationId, setOriginLocationId] = useState(1);
    const [destLocationId, setDestLocationId] = useState(1);
    const [transportationType, setTransportationType] = useState('');
    const [operatingDays, setOperatingDays] = useState([]);
    const [message, setMessage] = useState('');

    const handleAddTransportation = async (e) => {
        e.preventDefault();
        try {
        const newTransportation = { originLocation: {locationId: originLocationId},
        destinationLocation: {locationId: destLocationId},
        transportationType: transportationType, operatingDays: JSON.parse(operatingDays) };
        await addTransportation(newTransportation);
        setMessage('Transportation added successfully!');
        setOriginLocationId(0);
        setDestLocationId(0);
        setTransportationType('');
        setOperatingDays([]);
        } catch (error) {
        setMessage('Error adding transportation: ' + error);
        }
    };
    
    return (
        <div>
        <h2>Add Transportation</h2>
        <form onSubmit={handleAddTransportation}>
            <div style={{ display: 'inline', alignItems: 'center' }}>
            <div style={{ flex: '0 0 10px' }}>
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
                value={destLocationId}
                onChange={(e) => setDestLocationId(e.target.value)}
                min={1}
                required
            />
            </div>
            <div style={{ display: 'inline', alignItems: 'center' }}>
            <div style={{ flex: '0 0 80px' }}>
            <div>
            <label>Transportation Type:</label></div></div>
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
            <button type="submit">Add Transportation</button>
        </form>
        {message && <div>{message}</div>}
        </div>
    );
}

export default AddTransportation;