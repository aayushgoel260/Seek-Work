import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { useForm } from "react-hook-form";

const Application = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [coverLetter, setCoverLetter] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  // const [resumeType, setResumeType] = useState("");
  const {register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' });

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setResume(file);
    // Extract file extension and set type
    const fileType = file.name.split(".").pop(); // Extracts 'pdf', 'doc', etc.
    // setResumeType(fileType);
  };

  const { id } = useParams();

  const onSubmit = async (data) => {
    const formDataObj = new FormData();

    formDataObj.append("name", data.name);
    formDataObj.append("email", data.email);
    formDataObj.append("phone", data.phone);
    formDataObj.append("address", data.address);
    formDataObj.append("coverLetter", data.coverLetter);
    formDataObj.append("resume", resume);
    // formDataObj.append("type", resumeType);
    formDataObj.append("jobId", id);

    // console.log(data.name);
    // console.log(data.email);
    // console.log(data.phone);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/application/post",
        formDataObj,
        {
          withCredentials: true,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );
      console.log(data.name);
    console.log(data.email);
    console.log(data.phone);
      // setName("");
      // setEmail("");
      // setCoverLetter("");
      // setPhone("");
      // setAddress("");
      // setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "900px",
          width: "100%",
          gap: "30px",
        }}
      >
        {/* Left Section: Application Form */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              marginBottom: "20px",
              color: "#333",
              fontSize: "24px",
              textAlign: "left",
            }}
          >
            Application Form
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              placeholder="Your Name"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
              }}
              {...register("name", { required: {"value":true, "message":"Name is required." }, maxLength: {
                value: 20,
                message: "Name must be at most 20 characters long.",
              },
              minLength: {
                value: 3,
                message: "Name must be at least of 3 characters ",
              },
                pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9 ]*$/,
                  message: "Name should not start with numbers or spaces and can only contain alphanumeric characters.",
                } })} 
                />
                        
                {errors.name && <div style={{color:"red",fontSize:"15px", marginTop:"0.5rem"}}>{errors.name.message}</div>}
          
            <input
              type="text"
              placeholder="Your Email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
              }}
              {...register("email", {
                            required: { "value": true, "message": "Email is required." },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|chitkara\.edu\.in)$/,
                                message: "Invalid Email",
                            }
                })}
                />
                {errors.email && <div style={{color:"red",fontSize:"15px", marginTop:"0.5rem"}}>{errors.email.message}</div>}
            <input
              type="number"
              placeholder="Your Phone Number"
              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
              }}
              {...register("phone", {
                    required: { value: true, message: "Phone number is required." },
                    pattern: {
                      value:/^(?!.*-)\d{10}$/,
                      message: "Phone number is invalid.",
                    },
                    
                  })} />

                  {errors.phone && (<div style={{ color: "red", fontSize: "15px", marginTop: "0.5rem" }}>{errors.phone.message}</div>)}
            
            <input
              type="text"
              placeholder="Your Address"
              // value={address}
              // onChange={(e) => setAddress(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
              }}
              {...register("address", {
                required: { 
                  value: true, 
                  message: "Address is required." 
                },
                minLength: { 
                  value: 3, 
                  message: "Address must be at least 3 characters long." 
                },
                maxLength: { 
                  value: 50, 
                  message: "Address must be at most 50 characters long." 
                },
                pattern: {
                  value:  /^(?!\d+$)[a-zA-Z0-9\s#\/;.-]*$/,
                  message: "Address should only include alphanumeric characters, spaces, and certain punctuation marks (, . - / # ;)."
                }
              })}
            />
             {errors.address && (<div style={{ color: "red", fontSize: "15px", marginTop: "0.5rem" }}>{errors.address.message}</div>)}
            <textarea
              placeholder="Cover Letter..."
              // value={coverLetter}
              // onChange={(e) => setCoverLetter(e.target.value)}
              rows="4"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
                resize: "none",
              }}
              {...register("coverLetter", {
                required: { 
                  value: true, 
                  message: "coverLetter is required." 
                },
                minLength: { 
                  value: 10, 
                  message: "cover letter must be at least 10 characters long." 
                },
                
              })}
            />
            {errors.coverLetter && (<div style={{ color: "red", fontSize: "15px", marginTop: "0.5rem" }}>{errors.coverLetter.message}</div>)}
            <div>
              <label
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#555",
                  marginBottom: "10px",
                  display: "block",
                }}
              >
                Upload Resume
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf, .jpg, ,png, .jpeg"
                onChange={handleFileChange}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  outline: "none",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "12px",
                backgroundColor: "#007bff",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="/undraw.png"
            alt="Application Illustration"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Application;
