import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-logo">Food<span>App</span></h3>
            <p className="footer-description">
              Discover the best food & drinks in your city. We deliver happiness to your doorstep.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">📘</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">📷</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">🐦</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">📺</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/help">Help & Support</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div className="footer-section">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><Link to="/restaurants">All Restaurants</Link></li>
              <li><Link to="/cuisines">Cuisines</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/offers">Offers</Link></li>
              <li><Link to="/blog">Food Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li>
                <span className="contact-icon">📍</span>
                <span>Vijayawada</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>+91 9182049173</span>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <span>support@foodapp.com</span>
              </li>
              <li>
                <span className="contact-icon">🕐</span>
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} FoodApp. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;