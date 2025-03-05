import React, { useState, useEffect } from 'react';
import { fetchTransportations } from '../../services/transportationService';

const ListTransportations = () => {
  const [transportations, setTransportations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransportations = async () => {
      setLoading(true);
      try {
        const response = await fetchTransportations();
        setTransportations(response);
      } catch (err) {
        setError('Error fetching Transportations');
      } finally {
        setLoading(false);
      }
    };

    getTransportations();
  }, []);

  if (loading) return <div>Loading Transportations...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>All Transportations</h2>
      <ul>
        {transportations.length > 0 ? (
          transportations.map((transportation) => (
            <section key={transportation.id}>
              <b>From: </b>{transportation?.originLocation.name} <br />
              <b>To: </b>{transportation?.destinationLocation.name} <br />
              <b>By: </b>{transportation?.transportationType} <br />
              <hr />
            </section>
          ))
        ) : (
          <p>No transportations found.</p>
        )}
      </ul>
    </div>
  );
};

export default ListTransportations;