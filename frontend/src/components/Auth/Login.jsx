import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useForm } from "react-hook-form";
// import { GoogleLogin } from "react-google-login";


const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const {register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' });

  const naviagte = useNavigate();

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const onSubmit = async (data) => {
 
    try {
      const response= await axios.post(
        "http://localhost:8080/api/v1/user/login",
        { email: data.email, password: data.password, role:data.role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("login successful!");
      // setEmail("");
      // setPassword("");
      // setRole("");
      setIsAuthorized(true);
      naviagte('/');
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
  // const onSuccess = (res) => {
  //   console.log("Login Success! Current user: ", res.profileObj);
  // };

  // const onFailure = (res) => {
  //   console.log("Login Failed! res: ", res);
  // };

  // abc@gmail.com pswd:123456789
  // aashigarg777@gmail.com pswd:Aashi@12345
  // user1 xyz@gmail.com User1@12345 Job Seeker 1234567890

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#E1F5FE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "80%",
          maxWidth: "1000px",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Form Section */}
        <div
          style={{
            flex: "1",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: "140px",
              height: "70px",
              marginRight: "15px",
              marginBottom: "20px",
              alignSelf: "center",
              mixBlendMode: "multiply",
            }}
          />
          <h3
            style={{
              fontSize: "1.5rem",
              color: "#444",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Login to your account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#666", fontSize: "0.9rem" }}>
                Login As
              </label>
              <div style={{ position: "relative", marginTop: "10px" }}>
                <select
                  // value={role}
                  // onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#4A9ECF")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                  {...register("role", {
                    required: { value: true, message: "Role selection is required." },
                  })}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                  
                </select>
                {errors.role && (<div  style={{color:"red",fontSize:"15px", marginTop:"0.5rem"}}>{errors.role.message}</div>)}
                <FaRegUser
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#666", fontSize: "0.9rem" }}>
                Email Address
              </label>
              <div style={{ position: "relative", marginTop: "10px" }}>
                <input
                  type="email"
                  placeholder="Enter registered email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#4A9ECF")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                  {...register("email", {
                            required: { "value": true, "message": "Email is required." },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|chitkara\.edu\.in)$/,
                                message: "Invalid Email",
                            }
                  })}
                />
                {errors.email && <div style={{color:"red",fontSize:"15px", marginTop:"0.5rem"}}>{errors.email.message}</div>}
                <MdOutlineMailOutline
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#666", fontSize: "0.9rem" }}>
                Password
              </label>
              <div style={{ position: "relative", marginTop: "10px" }}>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Your Password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#4A9ECF")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                 {...register("password", {
                            required: { "value": true, "message": "Password is required." },
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{7,}$/,
                                message: "Password must contain at least one uppercase letter, one lowercase letter, and one symbol"
                            }
                        })}/>

                        {errors.password && <div  style={{color:"red",fontSize:"15px", marginTop:"0.5rem"}}>{errors.password.message}</div>}
                <div
                  style={{
                    position:"absolute",
                    top:"20%",
                    cursor: "pointer",
                    right:"1em"
                  }}
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? (
                    <FaEyeSlash color="#aaa" />
                  ) : (
                    <FaEye color="#aaa" />
                  )}
                </div>
                {/* <RiLock2Fill
                  style={{
                    position: "absolute",
                    right: "40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                  }}
                /> */}
              </div>
            </div>
            <input
              type="submit"
              // onClick={handleLogin}
              style={{
                padding: "12px",
                background: "#4A9ECF",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                fontSize: "1rem",
              }}
            />
            {/* </button> */}
            {/* <GoogleLogin className="google"
              clientId={clientID}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
             /> */}
             <p style={{fontSize:"15px", color:"#4A9ECF",textAlign:"center"}}>Don't have an account?</p>
            <Link
              to="/register"
              style={{
                display: "block",
                marginTop: "10px",
                color: "#4A9ECF",
                textDecoration: "none",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Register Now
            </Link>
          </form>
        </div>

        {/* Image Section */}
        <div
          style={{
            flex: "1",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/hacker.gif"
            alt="Login Illustration"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
