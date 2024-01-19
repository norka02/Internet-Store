import React from "react";
import './About.css';
import { Link } from "react-router-dom";


function About() {
    return (
        <>
        <div className="store-container">
            <h1>About</h1>
            <h3 className="store-title">Twoja Modowa Przestrzeń</h3>
            <p className="store-text">Witaj w naszym sklepie internetowym! Oferujemy najnowsze trendy modowe, wysokiej jakości ubrania dla każdego.</p>
            <p className="store-text">Znajdziesz u nas szeroki wybór stylów - od casual po elegancję, spełniające oczekiwania każdego klienta.</p>
            <Link to="/products">
                <button className="store-button">Zakupy Teraz</button>    
            </Link>
        </div>
        </>
    );
}

export default About;