import React from 'react';
import { useNavigate } from 'react-router-dom';
import mypic from './abc.jpeg';

const MobileAppDev = () => {
  const navigate = useNavigate();
  const handleButtonClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
      <strong>←</strong>
        </button>
      <div style={contentStyle}>
        <h3 style={headerStyle}>Learning Content for Mobile App Development Job Profile</h3>
        <p style={descriptionStyle}>
        A Mobile App Developer is responsible for designing and building applications for mobile devices. Their core responsibilities encompass:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>• Developing applications for iOS and Android platforms</li>
          <li style={listItemStyle}>• Collaborating with UI/UX designers to create user-friendly interfaces</li>
          <li style={listItemStyle}>• Integrating APIs and third-party libraries</li>
          <li style={listItemStyle}>• Testing and debugging mobile applications</li>
          
        </ul>
      </div>
      <div style={imageContainerStyle}>
        <img src={mypic} alt="Animation Example" style={imageStyle} />
        <div>
          <button onClick={() => handleButtonClick("https://www.youtube.com/results?search_query=React+Native+tutorial")} style={buttonStyle}>
          Watch React Native Tutorials
          </button>
          <button onClick={() => handleButtonClick("https://www.youtube.com/results?search_query=Flutter+tutorial")} style={buttonStyle}>
          Watch Flutter Tutorials
          </button>
          <button onClick={() => handleButtonClick("https://www.youtube.com/results?search_query=Swift+tutorial")} style={buttonStyle}>
          Watch Swift Tutorials
          </button>
          <button onClick={() => handleButtonClick("https://www.youtube.com/results?search_query=Kotlin+tutorial")} style={buttonStyle}>
          Watch Kotlin Tutorials
          </button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  padding: "20px",
  height: "100vh", 
  maxWidth: "100%",
  margin: "0 auto",
  backgroundColor: "#f0f8ff", 
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  alignItems: "center",
  justifyContent: "space-between",
};

const contentStyle = {
  flex: 1,
  paddingRight: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const headerStyle = {
  color: "#004080", 
  padding: "3px",
  fontSize: "54px",
  textAlign: "center",
  marginBottom:"35px",
};

const descriptionStyle = {
  margin: "15px",
  fontSize: "22px",
  color: "#333333",
  textAlign: "justify",
  lineHeight: "1.4",
};

const listStyle = {
  listStyleType: "none",
  padding: "0",
  marginLeft: "15px",
};

const listItemStyle = {
  margin: "10px 0",
  fontSize: "20px",
  color: "#004080",
};

const imageContainerStyle = {
  flex: 1,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const imageStyle = {
  width: "60%",
  height: "auto",
  margin: "0 auto 20px",
  borderRadius: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const buttonStyle = {
  margin: "10px",
  padding: "12px 20px",
  backgroundColor: "#004080", 
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "background-color 0.3s ease, transform 0.2s ease",
};

const backButtonStyle = {
  // marginTop: "20px",
  marginBottom:"600px",
  padding: "10px 15px",
  backgroundColor: "#f0f8ff",
  color: "black",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "36px",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
};

export default MobileAppDev;
