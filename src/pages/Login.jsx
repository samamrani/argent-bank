import React, { useEffect } from "react";
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

function Login() {
    const { token } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        // Si le token est présent, rediriger vers la page d'accueil
        if (token) {
            navigate('/');
        }
        
    },[])
    return <LoginForm />;
}

export default Login;
