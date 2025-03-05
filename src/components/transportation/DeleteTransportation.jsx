import React, { useState, useEffect } from 'react';
import { deleteTransportation } from '../../services/transportationService';

const DeleteTransportations = () => {
    const [transportationId, setTransportationId] = useState(1);
        const [message, setMessage] = useState('');
      
        const handleDeleteTransportation = async (e) => {
          e.preventDefault();
          try {
            await deleteTransportation(transportationId);
            setMessage('Transportation deleted successfully!');
            setTransportationId(1);
          } catch (error) {
            setMessage('Error deleting transportation: ' + error.message);
          }
        };
      
        return (
          <div>
            <h2>Delete Transportation</h2>
            <form onSubmit={handleDeleteTransportation}>
              <div>
                <label>Id: </label>
                <input
                  type="number"
                  value={transportationId}
                  onChange={(e) => setTransportationId(e.target.value)}
                  min={1}
                  required
                />
              </div>
              <button type="submit">Delete Transportation</button>
            </form>
            {message && <div>{message}</div>}
          </div>
        );
}

export default DeleteTransportations;