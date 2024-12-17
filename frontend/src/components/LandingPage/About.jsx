import React from "react";
import "./About.css";
import abc from "./undraw.png"; // Add an image to the 'assets' folder
import def from "./heroS.jpg"
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState} from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const AboutPage = () => {
  const [show, setShow] = useState(false);
  const navbarStyle = {
    backgroundColor: "#E1F5FE", // Light blue shade
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Ensures vertical alignment for all items
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    fontFamily: "'Roboto', sans-serif", // Clean font
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    color: "#01579B",
    fontSize: "1.6rem",
    fontWeight: "600",
  };

  const menuContainerStyle = {
    display: "flex",
    alignItems: "center", // Ensures vertical alignment
    gap: "20px", // Moderate spacing between menu items
    marginLeft:"auto",
  };

  const menuStyle = {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "20px", // Moderate spacing
  };

  const showMenuStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    margin: 0,
    padding: 0,
    backgroundColor: "#E1F5FE",
    position: "absolute",
    top: "50px",
    left: "0",
    width: "100%",
    // padding: "25px",
    zIndex: 99,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const linkStyle = {
    color: "#01579B", // Dark blue for links
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontWeight: "500", // Regular font weight
  };

  const linkHoverStyle = {
    color: "#FF7043", // Soft coral for hover
  };

  const buttonStyle = {
    backgroundColor: "#0288D1", // Blue button background
    border: "none",
    color: "white",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "6px", // Rounded corners
    fontSize: "1rem", // Regular button text size
    fontWeight: "500", // Regular font weight
    transition: "background-color 0.3s",
    marginLeft: "20px", // Added margin to align the button with the menu
    display: "flex", // Ensures button is aligned in flexbox layout
    alignItems: "center", // Vertically aligns button text
  };

  const buttonHoverStyle = {
    backgroundColor: "#01579B", // Darker blue on hover
  };

  const hamburgerStyle = {
    display: "none", // Hidden by default
    color: "#01579B", // Dark blue color
    fontSize: "2rem", // Larger font size for visibility
    cursor: "pointer",
  };
  if (show) {
    hamburgerStyle.display = "block";
  }
  return (
    <>
    <header style={navbarStyle}>
    <div className="container" style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={logoStyle}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ height: "40px", marginRight: "12px" ,mixBlendMode:"multiply"}}
          />
          <span>Seek&Work</span>
        </div>

        <div style={menuContainerStyle}>
          <ul style={show ? showMenuStyle : menuStyle}>
            <li>
              <Link
                to={"/"}
                onClick={() => setShow(false)}
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                onClick={() => setShow(false)}
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                ADD REVIEWS
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                onClick={() => setShow(false)}
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                to={"/clientTestimonials"}
                onClick={() => setShow(false)}
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                TESTIMONIALS
              </Link>
            </li>
            
          </ul>

          <div style={{ display: "none" }}>
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </div>
    </header>
      <div className="about-container">
        <div className="about-content">
          <h1>Seek&Work</h1>
          <p>
            Welcome to <strong>Seek&Work</strong>, the platform where
            opportunities meet talent. Our goal is to simplify the job-seeking
            and recruitment process for job seekers and employers alike.
          </p>

          <h2>For Job Seekers</h2>
          <p>
            Finding your dream job has never been easier. At Seek&Work, we
            provide:
            <ul>
              <ul>
                Comprehensive job listings tailored to your skills and
                preferences.
              </ul>
              <ul>A seamless application process to help you stand out.</ul>
              <ul>
                Personalized recommendations to keep you ahead in your career
                journey.
              </ul>
            </ul>
          </p>

          <h2>For Employers</h2>
          <p>
            We understand that finding the right talent is crucial for success.
            Seek&Work offers:
            <ul>
              <ul>An easy-to-use interface for posting job opportunities.</ul>
              <ul>Efficient tools to manage and review applications.</ul>
              <ul>
                Access to a pool of talented professionals from diverse
                industries.
              </ul>
            </ul>
          </p>

          <h2>Our Vision</h2>
          <p>
            We believe in creating a community where everyone thrives. Whether
            you're building your career or your team, Seek&Work is here to help.
            Our mission is to connect the right people to the right
            opportunities with simplicity and efficiency.
          </p>

          <h2>Why Choose Seek&Work?</h2>
          <p>
            <strong>User-Friendly Design:</strong> Navigate effortlessly through our
            platform.<br></br> <strong>Secure and Reliable: </strong>We prioritize your privacy and
            data security.<br></br> <strong>Inclusive Opportunities:</strong> Jobs and candidates
            for every industry.
          </p>

          <p>
            Join Seek&Work today, and let’s shape a future full of
            opportunities. Whether you're looking for a job or seeking the
            perfect candidate, we’re your partner every step of the way.
          </p>
        </div>
        <div className="about-image">
          <img src={abc} alt="About Seek&Work" className="image-spacing" />
          <img  src={def} alt="About Seek&Work" />
        </div>
      </div>
      <footer>
        <div className="footer-content">
          <div className="footer-text">
            <p>
              &copy; {new Date().getFullYear()} All Rights Reserved By
              Seek&Work.
            </p>
          </div>
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaYoutube />{" "}
            </a>
            <a
              href="https://linkedin.com/in/aayush-goel-206b29252/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
            <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/aayushgoel260/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <RiInstagramFill />
            </a>
          </div>
          <div className="footer-links">
            <Link to="/terms" className="footer-link">
              Terms and Conditions
            </Link>
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutPage;
