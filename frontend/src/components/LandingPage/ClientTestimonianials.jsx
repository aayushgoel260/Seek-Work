import React, { useState } from "react";
import "./ClientTestimonials.css";
import abcd from './meri.jpg';
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link,useNavigate } from "react-router-dom";
import {useContext } from "react";
import { Context } from "../../main";
import { GiHamburgerMenu } from "react-icons/gi";

const testimonials = [
  {
    id: 1,
    name: "Jake Heads",
    role: "Software Engineer at TechCorp",
    image: "https://images.pexels.com/photos/16771675/pexels-photo-16771675/free-photo-of-itay-verchik-smiles-and-points-to-you.jpeg?auto=compress&cs=tinysrgb&w=600",
    testimonial:
      "Seek and Work helped me land my dream job! The process was seamless, and the team was incredibly supportive throughout.",
  },
  {
    id: 2,
    name: "Isha Fernandez",
    role: "Product Manager at InnovateX",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600",
    testimonial:
      "Amazing experience! The platform connected me with fantastic opportunities. Highly recommend Seek and Work.",
  },
  {
    id: 3,
    name: "Jackie Ema",
    role: "UX Designer at Creative Solutions",
    image: "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=600",
    testimonial:
      "A game-changer for job seekers. Their tailored recommendations saved me so much time and effort!",
  },
  {
    id: 4,
    name: "Buttler",
    role: "Data Scientist at DataHub",
    image: "https://images.pexels.com/photos/8382048/pexels-photo-8382048.jpeg?auto=compress&cs=tinysrgb&w=600",
    testimonial:
      "The platform is intuitive and easy to use. It helped me find the perfect job match in no time.",
  },
  {
    id: 5,
    name: "Himanshu",
    role: "HR Manager at GlobalCorp",
    image: "https://images.pexels.com/photos/7129666/pexels-photo-7129666.jpeg?auto=compress&cs=tinysrgb&w=600",
    testimonial:
      "Seek and Work made recruiting top talent effortless. It’s my go-to tool for finding the right candidates.",
  },
  {
    id: 6,
    name: "Saksham",
    role: "Marketing Director at BrandX",
    image: "data:image/jpeg;base64,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",
    testimonial:
      "I had a great experience with Seek and Work. They matched me with amazing career opportunities.",
  },
  {
    id: 7,
    name: "Abhay Chauhan",
    role: "Web Developer at CodeFactory",
    image: "https://images.pexels.com/photos/9623791/pexels-photo-9623791.jpeg?auto=compress&cs=tinysrgb&w=600",
    testimonial:
      "This platform helped me secure a job faster than I ever expected. Highly recommend!",
  },
  {
    id: 8,
    name: "Sakshi",
    role: "Project Manager at InnovateTech",
    image: "https://images.pexels.com/photos/7580821/pexels-photo-7580821.jpeg?auto=compress&cs=tinysrgb&w=600",
    testimonial:
      "Fantastic platform! It connected me with multiple opportunities that fit my skillset perfectly.",
  },
  {
    id: 9,
    name: "Ankush",
    role: "Business Analyst at StrategyCo",
    image: "https://images.pexels.com/photos/7581004/pexels-photo-7581004.jpeg?auto=compress&cs=tinysrgb&w=600",
    testimonial:
      "I loved how easy it was to use the platform. It made my job search experience smooth and efficient.",
  },
];

function ClientTestimonials() {
  // State to keep track of how many testimonials to display
  const [showCount, setShowCount] = useState(4);
  const [show, setShow] = useState(false);


    // Inline styles for navbar layout
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

  // Function to handle showing more testimonials
  const handleShowMore = () => {
    setShowCount(testimonials.length); // Show all testimonials
  };

  // Function to handle showing fewer testimonials
  const handleShowLess = () => {
    setShowCount(4); // Reset to showing the initial 5 testimonials
  };

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
    <div className="app">
      {/* <header className="header">
        <h1>What Our Clients Say</h1>
        <p>
          Your success is our mission! Here's what our clients have to say
          about Seek and Work.
        </p>
      </header> */}
      <h1 className="h11">What our Clients say about us😊</h1>
      <main className="testimonials">
        {testimonials.slice(0, showCount).map((client) => (
          <div className="card" key={client.id}>
            <img
              src={client.image}
              alt={`${client.name}'s Profile`}
              className="client-img"
            />
            <h3 className="client-name">{client.name}</h3>
            <p className="client-role">{client.role}</p>
            <p className="testimonial">"{client.testimonial}"</p>
          </div>
        ))}
      </main>
      <div className="show-more">
        {showCount < testimonials.length ? (
          <button onClick={handleShowMore}>Show More</button>
        ) : (
          <button onClick={handleShowLess}>Show Less</button>
        )}
      </div>
    </div>
    <footer>
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
}

export default ClientTestimonials;
