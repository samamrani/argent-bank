import React from "react";
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";


function Login() {
    const { token } = useSelector((state) => state.user);
    if (token) {
        return <Navigate to="/" />;
    }

    return (     
        <LoginForm />
    );
}

export default Login;
