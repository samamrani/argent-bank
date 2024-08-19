import React from 'react';
import UserProfile from "../components/ProfileForm";
import ProfilePage from "../components/ProfilePage";
import { useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";


function Profile(){
    const {token} = useSelector((state) => state.user);
    if(!token){
        return <Navigate to="/"/>
    }
    return(
        <main className="bg-dark">
            <UserProfile/>
            <ProfilePage/>
         
        </main>
    )
}

export default Profile;