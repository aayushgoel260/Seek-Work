import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const containerStyle = {
    padding: "50px 0", // Full padding like HeroSection
    textAlign: "center",
    backgroundColor: "#f7faff", // Match the light background color from HeroSection
    fontFamily: "roboto", // Apply monospace font family
  };

  const headerStyle = {
    fontSize: "2rem",
    marginBottom: "30px",
    color: "#333",
    fontFamily: "roboto", // Monospace font for header
  };

  const bannerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  };

  const cardStyle = {
    perspective: "1000px", // For 3D effect
    flex: "1",
    minWidth: "250px",
    height:"300px"
  };

  const cardInnerStyle = {
    position: "relative",
    width: "100%",
    height: "300px",
    textAlign: "center",
    transformStyle: "preserve-3d",
    transition: "transform 0.8s ease-in-out",
  };

  const cardHoverStyle = {
    transform: "scale(1.10)",
    // transform: "rotateY(180deg)", // Flip the card on hover
  };

  const cardFaceStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden", // Hide the back face when not flipped
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardFrontStyle = {
    ...cardFaceStyle,
    backgroundColor: "#ffffff", // Light color for the card front
  };

  const cardBackStyle = {
    ...cardFaceStyle,
    backgroundColor: "#007bff", // Blue color for the back face
    color: "#fff",
    transform: "rotateY(180deg)", // Back face is rotated
  };

  const iconStyle = {
    fontSize: "3rem",
    marginBottom: "15px",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "1.25rem",
    marginBottom: "10px",
    fontFamily: "roboto" // Monospace font for title
  };

  const descriptionStyle = {
    fontSize: "1rem",
    color: "#555",
    fontFamily: "roboto" // Monospace font for description
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.firstChild.style, cardHoverStyle);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.firstChild.style.transform = "rotateY(0deg)";
  };

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>How Seek&Work Works</h3>
      <div style={bannerStyle}>
        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={cardInnerStyle}>
            <div style={cardFrontStyle}>
              <FaUserPlus style={{ ...iconStyle, color: "#007bff" }} />
              <p style={titleStyle}>Create Account</p>
              <p style={descriptionStyle}>
                More info about creating an account.
              </p>
            </div>
            <div style={cardBackStyle}>
              <p>More Info About Creating an Account</p>
            </div>
          </div>
        </div>

        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={cardInnerStyle}>
            <div style={cardFrontStyle}>
              <MdFindInPage style={{ ...iconStyle, color: "#28a745" }} />
              <p style={titleStyle}>Find a Job/Post a Job</p>
              <p style={descriptionStyle}>
                More info about finding or posting job.
              </p>
            </div>
            <div style={cardBackStyle}>
              <p>More Info About Finding or Posting Jobs</p>
            </div>
          </div>
        </div>

        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={cardInnerStyle}>
            <div style={cardFrontStyle}>
              <IoMdSend style={{ ...iconStyle, color: "#ffc107" }} />
              <p style={titleStyle}>Apply For Job/Recruit Candidates</p>
              <p style={descriptionStyle}>
                More info about recruiting and applying
              </p>
            </div>
            <div style={cardBackStyle}>
              <p>More Info About Applying or Recruiting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
