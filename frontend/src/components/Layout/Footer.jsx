import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import './Footer.css'; // External CSS file for styling
import { useState } from "react";
const Footer = () => {
  const [hover, setHover] = useState(false);
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div className="footer-content">
        <div className="footer-text">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved By Seek&Work.</p>
        </div>
        <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaFacebookF />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaYoutube />
          </a>
          <a href="https://linkedin.com/in/aayush-goel-206b29252/" target="_blank" rel="noopener noreferrer" className="icon">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/aayushgoel260/" target="_blank" rel="noopener noreferrer" className="icon">
            <RiInstagramFill />
          </a>
        </div>
        <div className="footer-links">
        <Link
      to="/terms"
      style={{
        color: "white",
        transform: hover ? "none" : undefined,
        transition: hover ? "none" : undefined,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Terms and Conditions
    </Link>
          <Link
      to="/privacy"
      style={{
        color: "white",
        transform: hover ? "none" : undefined,
        transition: hover ? "none" : undefined,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
            Privacy Policy
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
