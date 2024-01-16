import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faXmark,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
      setClick(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", showButton);

    return () => window.removeEventListener("resize", showButton);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            DŻANGO
          </Link>
          <ul className={click ? "dropdown-menu" : "nav-menu"}>
            <li className="nav-litem">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-litem">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li className="nav-litem">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className="nav-litem">
              <Link
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>

            {click ? (
              <>
                <li className="nav-litem">
                  <Link
                    to="/basket"
                    className="nav-links-ico"
                    onClick={closeMobileMenu}
                  >
                    {click ? (
                      "Basket"
                    ) : (
                      <FontAwesomeIcon icon={faBasketShopping} />
                    )}
                  </Link>
                </li>
                <li className="nav-litem">
                  <Link
                    to="/user-profile"
                    className="nav-links-ico"
                    onClick={closeMobileMenu}
                  >
                    {click ? "User Profile" : <FontAwesomeIcon icon={faUser} />}
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>

          {click ? (
            <></>
          ) : (
            <ul className={click ? "dropdown-menu" : "nav-menu"}>
              <li className="nav-litem">
                <Link
                  to="/basket"
                  className="nav-links-ico"
                  onClick={closeMobileMenu}
                >
                  {click ? (
                    "Basket"
                  ) : (
                    <FontAwesomeIcon icon={faBasketShopping} />
                  )}
                </Link>
              </li>
              <li className="nav-litem">
                <Link
                  to="/user-profile"
                  className="nav-links-ico"
                  onClick={closeMobileMenu}
                >
                  {click ? "User Profile" : <FontAwesomeIcon icon={faUser} />}
                </Link>
              </li>
            </ul>
          )}

          <div className="menu-icon" onClick={handleClick}>
            <FontAwesomeIcon
              className="fa-icon"
              icon={click ? faXmark : faBars}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
