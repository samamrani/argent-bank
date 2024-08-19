import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../services/userService';
import { updateProfileSuccess } from '../redux/userSlice'; 

function ProfileForm() {
  const dispatch = useDispatch();
  const { firstName, lastName, token } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName || '');
  const [newLastName, setNewLastName] = useState(lastName || '');

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setNewFirstName(firstName || '');
    setNewLastName(lastName || '');
    setIsEditing(false);
  };

  const saveChanges = async (e) => {
    e.preventDefault(); 

    try {
      console.log('Saving changes with:', { firstName: newFirstName, lastName: newLastName });
      
      // Validation des valeurs
      if (typeof newFirstName !== 'string' || typeof newLastName !== 'string') {
        throw new Error('firstName and lastName must be strings');
      }
      
      // Mise à jour du profil
      await AuthService.updateUserProfile(token, newFirstName, newLastName);

      // Mise à jour de l'état après une mise à jour réussie
      dispatch(updateProfileSuccess({
        firstName: newFirstName,
        lastName: newLastName
      }));

      setIsEditing(false); // Fermer le mode édition
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <main className="bg-dark">
      <div className="header">
        <h1>Welcome back</h1> 
        {!isEditing ? (
          <>
            <p>{firstName} {lastName}</p>
            <button className="edit-button" onClick={startEditing}>Edit Name</button>
          </>
        ) : (
          <form onSubmit={saveChanges}>
            <div className='form-wrap'>
              <div className="input-wrapper-name">
                <div className="input-wrapper">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className='btn-btn'>
                <button type="submit" className='btn-save'>Save</button>
                <button type="button" onClick={cancelEditing} className='btn-save'>Cancel</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default ProfileForm;
