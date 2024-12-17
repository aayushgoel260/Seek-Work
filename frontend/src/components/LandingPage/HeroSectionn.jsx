import React, { useState, useEffect } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  // const [heroDetails, setHeroDetails] = useState({
  //   liveJobs: 3,
  //   jobSeekers: 15,
  //   employers: 6,
  // });

  // useEffect(() => {
  //   const storedDetails = JSON.parse(localStorage.getItem("heroDetails"));
  //   if (storedDetails) {
  //     // Ensure that the values are valid numbers, otherwise use default values
  //     setHeroDetails({
  //       liveJobs: storedDetails.liveJobs || 0,
  //       jobSeekers: storedDetails.jobSeekers || 0,
  //       employers: storedDetails.employers || 0,
  //     });
  //   }
  // }, []);

  // const details = [
  //   {
  //     id: 1,
  //     title: heroDetails.liveJobs.toLocaleString(),
  //     subTitle: "Live Job",
  //     icon: <FaSuitcase />,
  //   },
  //   {
  //     id: 3,
  //     title: heroDetails.jobSeekers.toLocaleString(),
  //     subTitle: "Job Seekers",
  //     icon: <FaUsers />,
  //   },
  //   {
  //     id: 4,
  //     title: heroDetails.employers.toLocaleString(),
  //     subTitle: "Employers",
  //     icon: <FaUserPlus />,
  //   },
  // ];

  // Inline styles for the HeroSection
  const heroSectionStyle = {
    backgroundColor: "#f7faff", // Light background color for the section
    padding: "50px 0", // Padding around the section
    fontFamily: "roboto", // Modern font family
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    padding: "0 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const titleStyle = {
    flex: 1,
    fontSize: "2.5rem", // Larger title text
    fontWeight: "700", // Bold title
    color: "#333", // Dark text color
    lineHeight: "1.3",
    marginBottom: "20px",
  };

  const discoverAndHireStyle = {
    fontFamily: "Garamond", // Apply Garamond font family for these titles
  };

  const descriptionStyle = {
    fontSize: "1.1rem",
    color: "#555", // Lighter text color for the description
    lineHeight: "1.8",
    maxWidth: "500px", // Limit width of the description text
  };

  const imageStyle = {
    flex: 1,
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: "#0288d1", // Primary color for the button
    color: "#ffffff", // Text color
    padding: "10px 20px", // Padding around the text
    fontSize: "1rem", // Font size
    fontWeight: "600", // Bold text
    border: "none", // No border
    borderRadius: "5px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
    transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transition for background color and scale
    outline: "none", // Remove outline
  };

  const buttonHoverStyle = {
    backgroundColor: "#0277bd", // Darker shade for hover
    transform: "scale(1.05)", // Slightly increase size on hover
  };

  const image = {
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    objectFit: "cover",
    // mixBlendMode: "screen"
  };

  const detailsSectionStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginTop: "40px",
  };

  const cardStyle = {
    backgroundColor: "#ffffff", // White card background
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    padding: "20px 30px",
    textAlign: "center",
    width: "250px",
    transition: "transform 0.3s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.105)",
  };

  const iconStyle = {
    fontSize: "2.5rem", // Icon size
    color: "#0288d1", // Accent color for icons
    marginBottom: "15px",
  };

  const cardTitleStyle = {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  };

  const cardSubTitleStyle = {
    fontSize: "1rem",
    color: "#888", // Lighter color for subtitles
  };

  return (
    <div style={heroSectionStyle}>
      <div style={containerStyle}>
        <div style={titleStyle}>
          <h1 style={discoverAndHireStyle}>
            {" "}
            Discover <span style={{ color: "blue" }}> Jobs</span>
          </h1>
          <h1 style={discoverAndHireStyle}>
            {" "}
            Hire <span style={{ color: "blue" }}> Talent</span>
          </h1>
          <p style={descriptionStyle}>
            Whether you're a job seeker or an employer, Seek&Work is here to
            help you find the perfect match. Explore a world of opportunities,
            enhance your skills, and connect with top employers.
          </p>
          <button
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = buttonStyle.backgroundColor)
            }
            onClick={() => (window.location.href = "/login")}
          >
            Get Started
          </button>
        </div>
        <div style={imageStyle}>
          {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnznRQcPhH8STWB9GmFwFflAsHxakVOXEpA&s" alt="hero" style={image} />*/}
          {/* <video
            src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/income-incentives-animation-download-in-lottie-json-gif-static-svg-file-formats--call-logo-analytics-job-opportunity-employment-and-opportunities-pack-e-commerce-shopping-animations-8286946.mp4"
            style={image}
            // controls // Allows video controls like play, pause, etc.
            autoPlay // Optionally start video automatically
            loop // Optionally loop the video
            muted // Optionally mute the video by default
          >
            Your browser does not support the video tag.
          </video>{" "} */}
          <img
            src="https://1951043.fs1.hubspotusercontent-na1.net/hubfs/1951043/Job_Search_Burnout.gif"
            alt="hero"
            style={image}
          />
        </div>
      </div>

      {/* <div style={detailsSectionStyle}>
        {details.map((element) => (
          <div
            className="card"
            key={element.id}
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.target.style.transform = cardHoverStyle.transform)
            }
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <div className="icon" style={iconStyle}>
              {element.icon}
            </div>
            <div className="content">
              <p style={cardTitleStyle}>{element.title}</p>
              <p style={cardSubTitleStyle}>{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default HeroSection;
