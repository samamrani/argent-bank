import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure, setProfile } from '../redux/userSlice'; 
import AuthService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const { error, success } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(email, password);
      console.log('API Response:', response);
      dispatch(loginSuccess(response));
      
      // Si le profil n'est pas dans la réponse de connexion, appel API séparé pour le récupérer
      const userProfile = await AuthService.fetchUserProfile(response.body.token);
      dispatch(setProfile(userProfile.body));
      
      navigate('/profile');
    } catch (error) {
      dispatch(loginFailure('Login failed'));
    }
  };

  return (
    <main className="bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
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
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </main>
  );
}

export default LoginForm;
