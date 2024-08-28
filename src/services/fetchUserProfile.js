import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/';


// Récupère le profil utilisateur à l'aide d'un token d'authentification.

export const fetchUserProfile = async (userToken) => {
  try {
    const response = await axios.post(`${API_URL}user/profile`, null, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during fetchUserProfile:', error.response?.data || error.message);
    throw error;
  }
};
