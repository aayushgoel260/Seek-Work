import { Link } from "react-router-dom";
import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      icon: <MdOutlineDesignServices />,
      path: "/learning-content/graphics-and-design",
    },
    {
      id: 2,
      title: "Mobile App Development",
      icon: <TbAppsFilled />,
      path: "/learning-content/mobile-app-development",
    },
    {
      id: 3,
      title: "Frontend Web Development",
      icon: <MdOutlineWebhook />,
      path: "/learning-content/frontend-web-development",
    },
    {
      id: 4,
      title: "MERN STACK Development",
      icon: <FaReact />,
      path: "/learning-content/mern-stack-development",
    },
    {
      id: 5,
      title: "Account & Finance",
      icon: <MdAccountBalance />,
      path: "/learning-content/account-and-finance",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      icon: <GiArtificialIntelligence />,
      path: "/learning-content/artificial-intelligence",
    },
    {
      id: 7,
      title: "Video Animation",
      icon: <MdOutlineAnimation />,
      path: "/learning-content/video-animation",
    },
    {
      id: 8,
      title: "Data Entry Oprator",
      icon: <IoGameController />,
      path: "/learning-content/data-entry",
    },
  ];

  const styles = {
    container: {
      backgroundColor: "#f7faff",
      padding: "50px 0",
      fontFamily: "roboto",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#333",
      textAlign: "center",
      marginBottom: "30px",
    },
    banner: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      padding: "0 20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      textAlign: "center",
      width: "250px",
      height: "300px", // Fixed height for uniform size
      display: "flex", // Flexbox for centering
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
    },
    icon: {
      fontSize: "3rem",
      color: "#0288d1",
      marginBottom: "15px",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "10px",
    },
    cardSubTitle: {
      fontSize: "1rem",
      color: "#888",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Learning Resources</h3>
      <div style={styles.banner}>
        {categories.map((element) => (
          <Link to={element.path} key={element.id} style={{ textDecoration: "none" }}>
            <div
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={styles.icon}>{element.icon}</div>
              <div>
                <p style={styles.cardTitle}>{element.title}</p>
                <p style={styles.cardSubTitle}>{element.subTitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
