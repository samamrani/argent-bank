import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/';

  // Connecte un utilisateur avec ses identifiants et gère le stockage du token.

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}user/login`, { email, password });
    const token = response.data.body.token;

    if (!token || typeof token !== 'string') {
      throw new Error('token reçu non valide');
    }
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.response?.data || error.message);
    throw error;
  }
};
