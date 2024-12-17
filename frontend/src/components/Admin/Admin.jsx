import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import navigate hook
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./Admin.css";

const LoginForm = ({ setHasVisitedAdmin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Use navigate hook for routing

  useEffect(() => {
    setHasVisitedAdmin(true);
  }, [setHasVisitedAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/admin/login", {
        name,
        password,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        setHasVisitedAdmin(true);
        navigate("/admin/dashboard"); // Use navigate for a soft redirect
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <img src="/logo.png" height="50px" style={{ marginLeft: "38%" }} />
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
