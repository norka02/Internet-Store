import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';
import './UserProfile.css'

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Przykładowy stan zalogowania
  //TODO: zarządzanie sesją react -> zmienna globalna? loggedIn (pobranie sesji z serwera?)

  const handleSignOut = () => {
    // Obsługa wylogowania
    setLoggedIn(false);
  };

  return (
    <div className='user-profile-container'>
      {loggedIn ? (
        // Wyświetl zamówienia i przycisk Sign Out, jeśli zalogowany
        <div className='user-profile-container'>
          <h2 className='user-profile-title'>Twoje zamówienia</h2>
          {/* Tutaj dodaj kod do wyświetlania zamówień */}
          <button className='user-profile-button user-profile-sign-out-button' onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        // Showing buttons to sign in and sign up if you are not logged
        <div className='user-profile-container'>
            <h2 className='user-profile-title'>Profil Klienta</h2>
          <Link to="/sign-in" className='user-profile-link'>
            <button className='user-profile-button user-profile-action-button'>Sign In</button>
          </Link>
          <Link to="/register-form" className='user-profile-link'>
            <button className='user-profile-button user-profile-action-button'>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
