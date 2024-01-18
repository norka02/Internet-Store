import React from "react";
import './Contact.css';
import { Link } from "react-router-dom";

function Contact() {
    return(
        <>
        <div className="contact-container">
            <h1>
                Contact
            </h1>
            <h3 className="contact-title">Skontaktuj się z nami</h3>
            <p className="contact-text">Mamy nadzieję, że Twoje doświadczenie z naszym sklepem jest satysfakcjonujące. Jeśli masz pytania, uwagi lub sugestie, jesteśmy do Twojej dyspozycji.</p>
            <div className="contact-info">
                <p className="contact-text">Email: info@twojasklep.com</p>
                <p className="contact-text">Telefon: +48 123 456 789</p>
                <p className="contact-text">Adres: ul. Modowa 15, 00-000 Warszawa</p>
            </div>
            <Link to='https://mail.google.com/'>
                <button className="contact-button">Napisz do nas</button>
            </Link>
        </div>
        </>
    );
}

export default Contact;