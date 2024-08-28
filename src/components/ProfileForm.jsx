import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../services/updateUserProfile';
import { updateProfileFailure, updateProfileLoading, updateProfileSuccess } from '../redux/userSlice'; 

/**
 * Composant pour le formulaire de mise à jour du profil utilisateur.
 * Permet à l'utilisateur de modifier son prénom et son nom de famille.
 * 
 * @component
 */
function ProfileForm() {
  const dispatch = useDispatch();
  const { profile:{firstName, lastName}, token } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName || '');
  const [newLastName, setNewLastName] = useState(lastName || '');

  
   //Active le mode édition pour permettre à l'utilisateur de modifier son profil.
  const startEditing = () => {
    setIsEditing(true);
  };

  
   // Annule le mode édition et réinitialise les champs aux valeurs précédentes.
   
  const cancelEditing = () => {
    setNewFirstName(firstName || '');
    setNewLastName(lastName || '');
    setIsEditing(false);
  };

  const saveChanges = async (e) => {
    e.preventDefault(); 

    dispatch(updateProfileLoading());
    try {
      console.log('Saving changes with:', { firstName: newFirstName, lastName: newLastName });
      
      // Mise à jour du profil
      await updateUserProfile(token, newFirstName, newLastName);

      // Mise à jour de l'état après une mise à jour réussie
      dispatch(updateProfileSuccess({
        firstName: newFirstName,
        lastName: newLastName
      }));


      setIsEditing(false); // Fermer le mode édition
    } catch (error) {
      console.error('Error updating profile:', error);
      dispatch(updateProfileFailure('Error updating profile'))
    }
  };

  console.log('Rendering ProfileForm with:', { newFirstName, newLastName });
  
  return (
 
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
   
  );
}

export default ProfileForm;
