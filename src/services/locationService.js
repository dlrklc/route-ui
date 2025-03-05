import axios from 'axios';

const BASE_URL = 'http://localhost:8080/locations';

// fetch locations from the API
export const fetchLocations = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations: ', error);
    throw error;
  }
};

// fetch location by id from the API
export const fetchLocationById = async (locationId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${locationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching location: ', error);
      throw error;
    }
  };

// add a new location
export const addLocation = async (newLocation) => {
  try {
    const response = await axios.post(BASE_URL, newLocation);
    return response.data;
  } catch (error) {
    console.error('Error adding location: ', error.response?.data?.message);
    throw error;
  }
};

// edit a location via API
export const editLocation = async (updatedLocation) => {
  try {
    const response = await axios.put(BASE_URL, updatedLocation);
    return response.data;
  } catch (error) {
    console.error('Error editing location: ', error.message);
    throw error;
  }
};

// delete a location via API
export const deleteLocation = async (locationId) => {
  try {
    await axios.delete(`${BASE_URL}/${locationId}`);
  } catch (error) {
    console.error('Error deleting location: ', error.message);
    throw error;
  }
};
