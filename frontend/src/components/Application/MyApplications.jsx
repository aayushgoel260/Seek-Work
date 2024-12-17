import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      const endpoint =
        user && user.role === "Employer"
          ? "http://localhost:8080/api/v1/application/employer/getall"
          : "http://localhost:8080/api/v1/application/jobseeker/getall";

      axios
        .get(endpoint, { withCredentials: true })
        .then((res) => setApplications(res.data.applications));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const handleFileClick = (fileUrl) => {
   
    if (!fileUrl) {
      toast.error("File URL is missing");
      return;
    }
    const rawFileUrl = fileUrl.replace("/upload/", "/upload/raw/");
  
    // Derive file type from URL extension
    const fileType = fileUrl.split(".").pop(); // Extracts the file extension
    console.log("File URL:", rawFileUrl);
    console.log("File Type:", fileType);

    if (fileType === "pdf" || fileType === "png" || fileType === "jpg" || fileType === "jpeg" ) {
      // console.log("pdf");
      window.open(fileUrl, "_blank");
    } 
    else if (fileType === "doc" || fileType === "docx") {
      // Provide a download option for Word files
      console.log("doc");
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileUrl.split("/").pop(); // Use the file name
      link.click();
    } else {
      toast.error("Unsupported file format");
    }
  };
  

  const updateApplicationStatus = (id, status) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application._id === id
          ? { ...application, status } // Update the status optimistically
          : application
      )
    );
    try {
      axios
        .patch(
          `http://localhost:8080/api/v1/application/update-status/${id}`,
          { status },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplications) =>
            prevApplications.map((application) =>
              application._id === id
                ? { ...application, status: res.data.updatedStatus }
                : application
            )
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:8080/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplications) =>
            prevApplications.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Styling with transitions and animations
  const sectionStyle = {
    width: "100%",
    minHeight: "100vh",
    padding: "40px 0",
    background: "#f7fafc",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 1s ease-in-out",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Responsive grid
    gap: "30px",
    animation: "fadeInUp 1s ease-out",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "30px",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "15px",
    padding: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    marginBottom: "20px",
    border: "1px solid #e2e8f0",
    transform: "translateY(0)",
    opacity: "1",
  };

  const cardHoverStyle = {
    transform: "translateY(-10px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  };

  const detailStyle = {
    color: "#4a5568",
    lineHeight: "1.6",
    width: "100%",
  };

  const resumeStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "12px",
    cursor: "pointer",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
  };

  const resumeHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  };

  const buttonStyle = {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4C51BF",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    fontSize: "1rem",
    marginTop: "10px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#5A67D8",
    transform: "scale(1.05)",
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>
          {user && user.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        {applications.length <= 0 ? (
          <h4 style={{ textAlign: "center", color: "#718096" }}>
            No Applications Found
          </h4>
        ) : (
          applications.map((element) => (
            <div
              key={element._id}
              style={cardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, cardHoverStyle)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, cardStyle)
              }
            >
              <div style={detailStyle}>
                <p>
                  <strong>Name:</strong> {element.name}
                </p>
                <p>
                  <strong>Email:</strong> {element.email}
                </p>
                <p>
                  <strong>Phone:</strong> {element.phone}
                </p>
                <p>
                  <strong>Address:</strong> {element.address}
                </p>
                <p>
                  <strong>Cover Letter:</strong> {element.coverLetter}
                </p>
                <p>
                  <strong>Status:</strong> {element.status}
                </p>
              </div>
              Resume:
              <img
                src={element.resume.url}
                alt="resume"
                style={resumeStyle}
                onMouseEnter={(e) =>
                  Object.assign(e.target.style, resumeHoverStyle)
                }
                onMouseLeave={(e) => Objexct.assign(e.target.style, resumeStyle)}
                // onClick={() => openModal(element.resume.url)}
                onClick={() => handleFileClick(element.resume.url)}
              />
              {user.role === "Job Seeker" && (
                <button
                  style={buttonStyle}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, buttonHoverStyle)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, buttonStyle)
                  }
                  onClick={() => deleteApplication(element._id)}
                >
                  Delete Application
                </button>
              )}
              {user.role === "Employer" && (
                <>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) =>
                      Object.assign(e.target.style, buttonHoverStyle)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.target.style, buttonStyle)
                    }
                    onClick={() =>
                      updateApplicationStatus(element._id, "Accepted")
                    }
                  >
                    Accept
                  </button>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) =>
                      Object.assign(e.target.style, buttonHoverStyle)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.target.style, buttonStyle)
                    }
                    onClick={() =>
                      updateApplicationStatus(element._id, "Rejected")
                    }
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;