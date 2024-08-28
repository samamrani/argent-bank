import React, { useEffect } from "react";
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

function Login() {
    const { token } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(()=>{
       
        if (token) {
            navigate('/');
        }
        
    }, []); // eslint-disable-line

    return (  
    <main className="main bg-dark">
       <LoginForm />
    </main>
    );
}

export default Login;
