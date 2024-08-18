import React from 'react';
import UserProfile from "../components/ProfileForm";
import ProfilePage from "../components/ProfilePage";

function Profile(){
    return(
        <main className="bg-dark">
            <UserProfile/>
            <ProfilePage/>
         
        </main>
    )
}

export default Profile;