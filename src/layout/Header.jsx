import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice'; 
import logo from '../assets/img/argentBankLogo.png';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, userStatus } = useSelector((state) => state.user);
console.log('user')

    const logoutAction = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img src={logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className="main-nav-links">
                {userStatus ? (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>{user.firstName || 'User'}
                        </Link>
                        <button className="main-nav-item out" onClick={logoutAction}>
                            <i className="fa fa-sign-out"></i> Sign Out
                        </button>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Header;
