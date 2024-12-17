import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  // Styles
  const navbarStyle = {
    backgroundColor: "#E1F5FE",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
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
    alignItems: "center",
  };

  const menuStyle = {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "20px",
  };

  const linkStyle = {
    color: "#01579B",
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontWeight: "500",
  };

  const buttonStyle = {
    backgroundColor: "#0288D1",
    border: "none",
    color: "white",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#01579B",
  };

  const profileIconStyle = {
    fontSize: "2.1rem", // Adjusted size for alignment
    color: "#01579B",
    cursor: "pointer",
  };

  const hamburgerStyle = {
    display: "none",
    color: "#01579B",
    fontSize: "2rem",
    cursor: "pointer",
  };

  if (show) {
    hamburgerStyle.display = "block";
  }

  return (
    <nav
      className={isAuthorized ? "navbarShow" : "navbarHide"}
      style={isAuthorized ? navbarStyle : {}}
    >
      <div className="container" style={{ width: "100%" }}>
        <div style={logoStyle}>
          <img
            src="/logo.png"
            alt="logo"
            style={{
              height: "40px",
              marginRight: "12px",
              mixBlendMode: "multiply",
            }}
          />
          <span>Seek&Work</span>
        </div>

        <div style={menuContainerStyle}>
          <ul style={menuStyle}>
            <li>
              <Link to={"/"} style={linkStyle}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} style={linkStyle}>
                ALL JOBS
              </Link>
            </li>
            <li>
              <Link to={"/applications/me"} style={linkStyle}>
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li>
                  <Link to={"/job/post"} style={linkStyle}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} style={linkStyle}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            )}
            {/* Profile Icon */}
            <li>
              <Link to="/profile">
                <FaUserCircle style={profileIconStyle} />
              </Link>
            </li>
            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                style={buttonStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
              >
                LOGOUT
              </button>
            </li>
          </ul>
          <div style={hamburgerStyle}>
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
