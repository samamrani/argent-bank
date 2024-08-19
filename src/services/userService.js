import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/';

// Fonction pour se connecter
const login = async (email, password, rememberMe) => {
  try {
    const response = await axios.post(`${API_URL}user/login`, { email, password });
    const token = response.data.body.token;

    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token received');
    }

    // Stockage du token
    if (rememberMe) {
      localStorage.setItem('userToken', token);
    } else {
      sessionStorage.setItem('userToken', token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
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
    console.error('Error during fetchUserProfile:', error.response?.data || error.message);
    throw error;
  }
};

// Fonction pour mettre à jour le profil utilisateur
const updateUserProfile = async (userToken, firstName, lastName) => {
  try {

    console.log('Updating profile with:', { firstName, lastName });
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
      throw new Error('firstName and lastName must be strings');
    }

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
    console.error('Error during updateUserProfile:', error.response?.data || error.message);
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
