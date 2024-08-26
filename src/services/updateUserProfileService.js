import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/';

//  Met à jour le profil utilisateur avec de nouvelles informations

export const updateUserProfile = async (token, firstName, lastName) => {
  try {
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
      throw new Error('firstName and lastName must be strings');
    }

    const response = await axios.put(
      `${API_URL}user/profile`,
      { firstName, lastName }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error during updateUserProfile:', error.response?.data || error.message);
    throw error;
  }
};
