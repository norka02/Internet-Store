import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./Button";
import './Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join the Dżango_Shop newsletter to receive our hot deals
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input type="email" name="email" placeholder="Your Email" className="footer-input" />
                        <Button>
                            Subscribe
                        </Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <Link to='/'>How it works</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;