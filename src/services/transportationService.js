import axios from 'axios';

const BASE_URL = 'http://localhost:8080/transportations';

// fetch transportations from the API
export const fetchTransportations = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching transportations: ', error);
    throw error;
  }
};

// fetch routes from the API
export const fetchRoutes = async (originId, destId, date) => {
  try {
    const response = await axios.get(`${BASE_URL}/origin/${originId}/dest/${destId}/date/${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transportations: ', error);
    throw error;
  }
};

// add a new transportation 
export const addTransportation = async (newTransportation) => {
  try {
    const response = await axios.post(BASE_URL, newTransportation);
    return response.data;
  } catch (error) {
    console.error('Error adding transportation: ', error.message);
    throw error;
  }
};

// edit a transportation via API
export const editTransportation = async (updatedTransportation) => {
  try {
    const response = await axios.put(BASE_URL, updatedTransportation);
    return response.data;
  } catch (error) {
    console.error('Error editing transportation: ', error.message);
    throw error;
  }
};

// delete a transportation via API
export const deleteTransportation = async (transportationId) => {
  try {
    await axios.delete(`${BASE_URL}/${transportationId}`);
  } catch (error) {
    console.error('Error deleting transportation: ', error.message);
    throw error;
  }
};
