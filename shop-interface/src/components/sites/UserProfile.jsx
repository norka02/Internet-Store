import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(true); // Przykładowy stan zalogowania
  //TODO: zarządzanie sesją react -> zmienna globalna? loggedIn (pobranie sesji z serwera?)

  const handleSignOut = () => {
    // Obsługa wylogowania
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        // Wyświetl zamówienia i przycisk Sign Out, jeśli zalogowany
        <div>
          <h2>Twoje zamówienia</h2>
          {/* Tutaj dodaj kod do wyświetlania zamówień */}
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        // Showing buttons to sign in and sign up if you are not logged
        <div>        
          <Link to="/sign-in">
            <button>Sign In</button>
          </Link>
          <Link to="/register-form">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
