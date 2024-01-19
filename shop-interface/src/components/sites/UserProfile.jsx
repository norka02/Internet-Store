import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';
import './UserProfile.css'


const NavBar = () => {
  const [isLoggedIn, setLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const username = sessionStorage.getItem('email');

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Czyszczenie danych w sessionStorage po wylogowaniu.
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('email');
    setLoggedIn(false);
  };


  return (
    <div className='user-profile-container'>
      {isLoggedIn != '' ? (   //isLoggedIn
        // Wyświetl zamówienia i przycisk Sign Out, jeśli zalogowany
        <div className='user-profile-container'>
          <h2 className='user-profile-title'>Twoje zamówienia</h2>
          {/* Tutaj dodaj kod do wyświetlania zamówień */}
          <button className='user-profile-button user-profile-sign-out-button' onClick={handleLogout}>Sign Out</button>
          <Link to='/update-customer-info'>
            <button className='user-profile-button'>Update Customer Info</button>
          </Link>
        </div>
      ) : (
        // Showing buttons to sign in and sign up if you are not logged
        <div className='user-profile-container'>
            <h2 className='user-profile-title'>Profil Klienta</h2>
          <Link to="/sign-in" className='user-profile-link'>
            <button className='user-profile-button user-profile-action-button'>Sign In</button>
          </Link>
          <Link to="/register-form" className='user-profile-link'>
            <button className='user-profile-button user-profile-action-button' onClick={handleLogin}>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
