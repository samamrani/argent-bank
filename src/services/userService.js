import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/';

// Fonction pour se connecter
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}user/login`, { email, password });
    
    // Stockage du token utilisateur dans le localStorage pour une utilisation ultérieure
    localStorage.setItem('userToken', response.data.token);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Fonction pour se déconnecter
const logout = () => {
  localStorage.removeItem('userToken');
  sessionStorage.clear();
  localStorage.clear();
};

// Fonction pour récupérer le profil utilisateur
const fetchUserProfile = async (userToken) => {
  try {
    //Envoirequête POST pour récupérer les données du profil avec le token utilisateur dans l'en-tête
    const response = await axios.post(`${API_URL}user/profile`, null, {
      headers: {
        Authorization: `Bearer ${userToken}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during fetchUserProfile:', error);
    throw error;
  }
};

// Fonction pour mettre à jour le profil utilisateur
const updateUserProfile = async (userToken, firstName, lastName) => {
  try {
    // requête PUT pour mettre à jour les données du profil avec le token utilisateur dans l'en-tête
    const response = await axios.put(
      `${API_URL}user/profile`,
      { firstName, lastName }, 
      {
        headers: {
          Authorization: `Bearer ${userToken}`, 
          'Content-Type': 'application/json', 
        },
      }
    );
  
    return response.data;
  } catch (error) {
    console.error('Error during updateUserProfile:', error);
    throw error; 
  }
};

const AuthService = {
  login,
  logout,
  fetchUserProfile,
  updateUserProfile,
};

export default AuthService;
