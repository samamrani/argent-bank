import React from 'react';
import UserProfile from "../components/ProfileForm";
import Accounts from '../components/Accounts';

function Profile() {
   
    // Si l'utilisateur est authentifié, affichez la page de profil
    return (
        <main className="bg-dark">
            <UserProfile />
            <Accounts />
        </main>
    );
}

export default Profile;
