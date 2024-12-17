import React from "react";
import mypic from "./abc.jpeg";

const Mean = () => {
  const handleButtonClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        height: "73vh",
        maxWidth: "100%",
        margin: "0",
      }}
    >
      <div
        style={{
          flex: 1,
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3 style={{ color: "red", padding: "5px" }}>MEAN Stack Developer</h3>
        <p style={{ margin: "15px" }}>
          A MEAN Stack Developer is responsible for developing full-stack web
          applications using MongoDB, Express.js, Angular, and Node.js. Their
          core responsibilities encompass:
        </p>
        <ul
          style={{ listStyleType: "none", padding: "5px", marginLeft: "15px" }}
        >
          <li style={{ margin: "10px 0" }}>
            * Building and maintaining web applications using MEAN stack
            technologies
          </li>
          <li style={{ margin: "10px 0" }}>
            * Creating RESTful APIs with Express.js
          </li>
          <li style={{ margin: "10px 0" }}>
            * Developing dynamic single-page applications with Angular
          </li>
          <li style={{ margin: "10px 0" }}>* Managing data with MongoDB</li>
          <li style={{ margin: "10px 0" }}>
            * Collaborating with front-end and back-end developers
          </li>
        </ul>
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          src={mypic}
          alt="Animation Example"
          style={{
            width: "50%",
            height: "auto",
            marginBottom: "10px",
            marginLeft: "220px",
            borderRadius: "20px",
          }}
        />
        <div>
          <button
            onClick={() =>
              handleButtonClick(
                "https://youtu.be/J6mDkcqU_ZE?si=La_hOi5RhfGkY1co"
              )
            }
            style={buttonStyle}
          >
            Learn MongoDB
          </button>
          <button
            onClick={() =>
              handleButtonClick(
                "https://youtu.be/7H_QH9nipNs?si=LhL3EzHrnlG7VFGI"
              )
            }
            style={buttonStyle}
          >
            Learn Express.js
          </button>
          <button
            onClick={() =>
              handleButtonClick(
                "https://youtu.be/0LhBvp8qpro?si=5X_fU_iv0pzZebcA"
              )
            }
            style={buttonStyle}
          >
            Learn Angular
          </button>
          <button
            onClick={() =>
              handleButtonClick(
                "https://youtu.be/TlB_eWDSMt4?si=22mLpet6swmIA7XY"
              )
            }
            style={buttonStyle}
          >
            Learn Node
          </button>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 15px",
  backgroundColor: "pink",
  color: "black",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Mean;
