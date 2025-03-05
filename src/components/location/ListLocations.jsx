import React, { useState, useEffect } from 'react';
import { fetchLocations } from '../../services/locationService';

const ListLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      setLoading(true);
      try {
        const response = await fetchLocations();
        setLocations(response);
      } catch (err) {
        setError('Error fetching locations');
      } finally {
        setLoading(false);
      }
    };

    getLocations();
  }, []);

  if (loading) return <div>Loading locations...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>All Locations</h2>
      <ul>
        {locations.length > 0 ? (
          locations.map((location) => (
            <section key={location.id}>
              {location.name} - {location.locationCode}
            <hr />
            </section>
          ))
        ) : (
          <p>No locations found.</p>
        )}
      </ul>
    </div>
  );
};

export default ListLocations;