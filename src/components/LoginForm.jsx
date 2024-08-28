import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure, loginLoading } from '../redux/userSlice'; 
import {fetchUserProfile} from '../services/fetchUserProfile';
import {fetchUserLogin} from '../services/fetchUserLogin';
import { useNavigate } from 'react-router-dom';

/**
 * Le composant LoginForm gère la fonctionnalité de connexion des utilisateurs.
 * 
 * Ce composant affiche un formulaire de connexion où les utilisateurs 
 * peuvent saisir leur email et leur mot de passe.
 * Il gère l'état du formulaire et traite la soumission pour authentifier l'utilisateur.
 * En cas de succès, il récupère le profil de l'utilisateur,
 *  met à jour l'état dans Redux, et navigue vers la page du profil.
 * **/
const LoginForm = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const { error, success, status } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    dispatch(loginLoading());
    try {
      const response = await fetchUserLogin(email, password);
      console.log('API Response:', response);
      
      // Appel pour récupérer le profil utilisateur
      const userProfile = await fetchUserProfile(response.body.token);
      
      dispatch(loginSuccess({token:response.body.token, profile: userProfile.body}));
      navigate('/profile');
    } catch (error) {
      console.error('Login Error:', error.message);
      dispatch(loginFailure('Login failed'));
    }
  };
  

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </main>
  );
}

export default LoginForm;
