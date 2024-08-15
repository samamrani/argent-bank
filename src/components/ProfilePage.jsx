import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSuccess } from '../redux/userSlice'; 

function Profile() {
    const dispatch = useDispatch();
    const { firstName, lastName } = useSelector((state) => state.user);

    const [isEditing, setIsEditing] = useState(false);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);

    const startEditing = () => {
        setIsEditing(true);
    };

    const cancelEditing = () => {   
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setIsEditing(false);
    };

    const saveChanges = (e) => {
        e.preventDefault(); 
        dispatch(userSuccess({ firstName: newFirstName, lastName: newLastName })); 
        setIsEditing(false);
    };

    return (
        <main className="bg-dark">
         <div className="header">
             <h1>Welcome back</h1> 
             {!isEditing ? (
                 <>
                <p>  {firstName}   </p>
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

            <h2 className="sr-only">Accounts</h2>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>   
    );
}

export default Profile;
