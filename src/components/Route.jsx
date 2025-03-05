import React, { useState, useEffect } from 'react';
import { fetchLocations } from '../services/locationService';
import { fetchRoutes } from '../services/transportationService';

const Route = () => {
  const [locations, setLocations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [date, setDate] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTransportationTypes, setSelectedTransportationTypes] = useState([]);
  const [transportationTypes, setTransportationTypes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOriginData, setDropdownOriginData] = useState([]);
  const [dropdownDestData, setDropdownDestData] = useState([]);
  const [selectedOriginData, setSelectedOriginData] = useState('');
  const [selectedDestData, setSelectedDestData] = useState('');
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [destId, setTriggerForGetLocations] = useState('');

  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isNewContentVisible, setNewContentVisible] = useState(false);

  useEffect(() => {

    const getLocations = async () => {
        setLoading(true);
        try {
          const response = await fetchLocations();
          setLocations(response);
        } catch (err) {
          setError('Error fetching locations: ' + err.status);
        } finally {
          setLoading(false);
        }
      };
  
    getLocations(); 
  }, [destId]);  //will run every time search button clicked

  useEffect(() => {
    const locationNames = locations.map(location => location.name)   //set drop down data
    setDropdownOriginData(locationNames);
    setDropdownDestData(locationNames);
  }, [locations]);  //will run every time locations state changes

    
  useEffect(() => {
    if (routes.length > 0) {
        const filteredLists = routes.map(route =>
            route.find(item => item.name.toLowerCase().includes('airport')) 
          );
        setAirports(filteredLists);    //set data to show airports
    }
  }, [routes]);  //will run the effect every time routes changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

    const getRoutes = async (originId, destId) => {
      setLoading(true);
        try {
          const response = await fetchRoutes(originId, destId, date);
          setRoutes(response.routes);
          setTransportationTypes(response.transportationTypes);
        } catch (err) {
          setError('Error fetching routes: ' + err.status);
        } finally {
          setLoading(false);
        }
    };

  const handleSearchButtonClick = async () => {
    setRoutes([]);
    setTransportationTypes([]);
    //Get ids from selected locations
    const indexOriginData = locations.findIndex(obj => obj.name === selectedOriginData);
    const indexDestData = locations.findIndex(obj => obj.name === selectedDestData);
    const originId = locations[indexOriginData].locationId;
    const destId = locations[indexDestData].locationId;

    getRoutes(originId, destId);

    setIsDivVisible(true);
    setTriggerForGetLocations(destId);  //trigger for get location

  };

  const handleAirportButtonClick = (item, index) => {

    setOverlayVisible(true); //show the overlay
    setNewContentVisible(true); //show the new content

    setSelectedLocations(routes[index]);
    setSelectedTransportationTypes(transportationTypes[index]);
    
  };

  const handleClose = () => {
    setNewContentVisible(false); //hide the new content
    setOverlayVisible(false); //hide the overlay
    
  };

  return (
    <div style={{...styles.container, width: '500px'}}>
      <div style={styles.dropdownContainer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>Origin:</label></div>
        <select
          value={selectedOriginData}
          onChange={(e) => setSelectedOriginData(e.target.value)}
          style={{...styles.dropdown, width: '100px'}}
        >
          <option value="">Select an origin</option>
          {dropdownOriginData.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>Destination:</label></div>
        <select
          value={selectedDestData}
          onChange={(e) => setSelectedDestData(e.target.value)}
          style={{...styles.dropdown, width: '100px'}}
        >
          <option value="">Select a destination</option>
          {dropdownDestData.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div style={{ display: 'flex', alignItems: 'center' }}>
      <label>Date:</label>
      <input style={{...styles.dropdown}}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
      />
      </div>
      
      <button onClick={handleSearchButtonClick} style={styles.button}>
        Search
      </button>
      </div>

      {/* show airports */}
      {isDivVisible && (
        <div>
        <h2>Available Routes</h2>
        <ul>
          {airports.length > 0 ? (
            airports.map((item, index) => (
                <section className="clickable-section" onClick={() => handleAirportButtonClick(item, index)} 
              style={{ padding: '20px', cursor: 'pointer' }} key={item.index}>
                    Via {item.name} ({item?.locationCode})
                <hr />
                </section>
            ))
          ) : (
            <p>No routes found.</p>
          )}
        </ul>
      </div>
      )}

      {/* transparent grey overlay */}
      {isOverlayVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // transparent grey background
            zIndex: 9999, // overlay on top of other content
          }}
        />
      )}

      {/* new content that appears when the button is clicked */}
      {isNewContentVisible && (
        <div
          style={{
            position: 'absolute',
            top: '20%', 
            left: '10%',
            width: '80%',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
            zIndex: 10000, 
          }}
        >
          <h3>Route Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Loop through the airports and transport types */}
            {selectedLocations.map((selectedLocation, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                {/* Render the arrow before airport */}
                {index > 0 && <div style={{ fontSize: '24px', marginBottom: '10px' }}>↓</div>}
                {/* Render airport name */}
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#f4f4f4',
                    marginRight: '10px',
                  }}
                >
                  {selectedLocation.name} ({selectedLocation?.locationCode})
                </div>

                {/* Show the arrow only if it's not the last airport */}
                {index < selectedLocations.length - 1 && (
                  <div style={{ fontSize: '24px' }}>↓</div> // Down arrow
                )}

                {/* Show the transport type after the arrow */}
                {index < selectedTransportationTypes.length && (
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      padding: '10px',
                      borderRadius: '5px',
                      backgroundColor: '#f4f4f4',
                    }}
                  >
                    {selectedTransportationTypes[index]}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'inline',
    justifyContent: 'space-between',
    width: '80%',
    margin: '20px auto',
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%', 
  },
  dropdown: {
    padding: '8px',
    margin: '0 10px',
    width: '45%', 
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Route;