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
      const userInfos = { firstName: newFirstName, lastName: newLastName };
      const response = await AuthService.updateUserProfile(token, userInfos);
      dispatch(updateProfileSuccess(response));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setIsEditing(false);
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
                             <label htmlFor="first-name"></label>
                             <input
                                 type="text"
                                 id="first-name"
                                 value={newFirstName}
                                 onChange={(e) => setNewFirstName(e.target.value)}
                             />
                         </div>
                         <div className="input-wrapper">
                             <label htmlFor="last-name"></label>
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
