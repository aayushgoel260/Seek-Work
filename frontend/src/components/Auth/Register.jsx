import React, { useContext, useState } from "react";
import { FaRegUser , FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { Navigate } from "react-router-dom";

// import { RiLock2Fill } from "react-icons/ri";



// import { RiLock2Fill } from "react-icons/ri";



// import { Navigate } from "react-router-dom";

import { RiLock2Fill } from "react-icons/ri";
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useForm } from "react-hook-form";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const name=formData.name;
      const email=formData.email;
      const password=formData.password;
      const role=formData.role;
      const phone=formData.phone;
      console.log(name, email, password, role, phone);

      const response = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        { name:name, phone:phone, email:email, password:password, role:role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("register successful:", response.data);
      // Update local storage
      const currentData = JSON.parse(localStorage.getItem("heroDetails")) || {
        jobSeekers: 15,
        employers: 6,
      };

      if (role === "Job Seeker") {
        currentData.jobSeekers += 1;
      } else if (role === "Employer") {
        currentData.employers += 1;
      }

      localStorage.setItem("heroDetails", JSON.stringify(currentData));

      // toast.success(message);
      // setName("");
      // setEmail("");
      // setPassword("");
      // setPhone("");
      // setRole("");
      setIsAuthorized(true);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("register fail: ",error);
    }
  };
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }


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
              marginBottom: "20px",
              alignSelf: "center",
              mixBlendMode: "multiply"
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
            Create a new account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#666", fontSize: "0.9rem" }}>Register As</label>
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
                  onFocus={(e) => e.target.style.borderColor = "#4A9ECF"} 
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
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
              <label style={{ color: "#666", fontSize: "0.9rem" }}>Name</label>
              <div style={{ position: "relative", marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter your name"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4A9ECF"} 
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
                  {...register("name", { 
                    required: { "value": true, "message": "Name is required." }, 
                    minLength: { value: 3, message: "Name must be at least 3 characters long" },
                    maxLength: { value: 20, message: "Name must be at most 20 characters long" },
                    pattern: {
                      value: /^[a-zA-Z][a-zA-Z0-9 ]*$/,
                      message: "Name should not start with numbers or spaces and can only contain alphanumeric characters.",
                    } 
                  })} />
                        
                        {errors.name && <div style={{color:"red",fontSize:"15px", marginTop:"0.5rem"}}>{errors.name.message}</div>}
                <FaPencilAlt
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
              <label style={{ color: "#666", fontSize: "0.9rem" }}>Email Address</label>
              <div style={{ position: "relative", marginTop: "10px" }}>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4A9ECF"} 
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
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
              <label style={{ color: "#666", fontSize: "0.9rem" }}>Phone Number</label>
              <div style={{ position: "relative", marginTop: "10px" }}>
                <input
                  type="number"
                  placeholder="Enter your Phone number"
                  // value={phone}
                  // onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4A9ECF"} 
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
                  {...register("phone", {
                    required: { value: true, message: "Phone number is required." },
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Phone number must be exactly 10 digits long.",
                    },
                  })} />

                  {errors.phone && (<div style={{ color: "red", fontSize: "15px", marginTop: "0.5rem" }}>{errors.phone.message}</div>)}
              
                <FaPhoneFlip
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
              <label style={{ color: "#666", fontSize: "0.9rem" }}>Password</label>
              <div style={{ position: "relative", marginTop: "10px" }}>
                <input
                  type={showPassword ? "text" : "password"}
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
                  onFocus={(e) => e.target.style.borderColor = "#4A9ECF"} 
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
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
                  onClick={() => setShowPassword(!showPassword)} 
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash color="#aaa" /> : <FaEye color="#aaa" />}
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
              // onClick={handleRegister}
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
          
            <p style={{fontSize:"15px", color:"#4A9ECF",textAlign:"center"}}>Already have an account?</p>
            <Link
              to="/login"
              style={{
                display: "block",
                marginTop: "10px",
                color: "#4A9ECF",
                textDecoration: "none",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Login Now
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
            src="/user.gif"
            alt="Register Illustration"
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

export default Register;