import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { loginExecute, loginSuccess, loginError } from '../redux/loginSlice'; 
import { userLogin } from '../services/loginService';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const login = async () => {
        if (!email || !password) {
            setError('L e-mail et le mot de passe sont requis.');
            setSuccess('');
            return;
        }

        dispatch(loginExecute());
        try {
            const data = await userLogin({ email, password });
            if (data.token) {
                dispatch(loginSuccess({
                    token: data.token,
                    firstName: data.firstName,  
                    lastName: data.lastName,
                    email: data.email,
                }));
                setSuccess('Connexion réussiel!');
                setError('');
                navigate('/profile');
            } else {
                dispatch(loginError(data.message || 'La connexion a échoué'));
                setError(data.message || 'La connexion a échoué');
                setSuccess('');
            }
        } catch (err) {
            dispatch(loginError(err.message));
            setError('Erreur de connexion: ' + err.message);
            setSuccess('');
        }
    };

    return {
        email, password, rememberMe, error, success,
        setEmail, setPassword, setRememberMe, login
    };
};

export default useLogin;
