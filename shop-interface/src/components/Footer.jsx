import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Footer.css";

function Footer({ formRef }) {
  return (
    <>
      <div className="footer-container">
        <section className="footer-subscription" ref={formRef}>
          <p className="footer-subscription-heading">
            Join to the newsletter to get the newewst informations about our
            products!
          </p>
          <p className="footer-subscription-text">
            You can unsubscribe any time.
          </p>
          <div className="input-area">
            <form>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="footer-input"
              />
              <Button className="btn--outline">Subscribe</Button>
            </form>
          </div>
        </section>
        <div className="footer-links">
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h2>About</h2>
              <Link to="/user-profile">Join us</Link>
              <Link to="/">Home</Link>
              <Link to="/history">History</Link>
              <Link to="/terms-of-service">Terms of Sevice</Link>
            </div>
            <div className="footer-link-items">
              <h2>Contact us</h2>
              <Link to="/">Foo</Link>
              <Link to="/">Foo</Link>
              <Link to="/">Foo</Link>
              <Link to="/">Foo</Link>
            </div>
          </div>
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h2>Socials</h2>
              <Link to="https://www.instagram.com" target="_blank">
                Instagram
              </Link>
              <Link to="https://www.facebook.com" target="_blank">
                Facebook
              </Link>
              <Link to="https://www.youtube.com" target="_blank">
                Youtube
              </Link>
              <Link to="https://www.twitter.com" target="_blank">
                Twitter
              </Link>
            </div>
            <div className="footer-link-items">
              <h2>Foo</h2>
              <Link to="/">Foo</Link>
              <Link to="/">Foo</Link>
              <Link to="/">Foo</Link>
              <Link to="/">Foo</Link>
            </div>
          </div>
        </div>
        <section className="social-media">
          <div className="social-media-wrap">
            <div className="footer-logo">
              <Link className="social-logo">SKLEP</Link>
            </div>
            <small className="webside-rights">SKLEP © 2023</small>
            <div className="social-icons">
              <Link className="social-icons-link facebook"></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Footer;
