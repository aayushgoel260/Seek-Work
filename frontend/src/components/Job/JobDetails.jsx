import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const handleApply = () => {
    const heroDetails = JSON.parse(localStorage.getItem("heroDetails")) || {
      liveJobs: 3,
      jobSeekers: 15,
      employers: 6,
    };

    heroDetails.liveJobs += 1;
    localStorage.setItem("heroDetails", JSON.stringify(heroDetails));
    navigateTo(`/application/${job._id}`);
  };

  // Inline styles
  const sectionStyle = {
    backgroundColor: "#f7faff",
    padding: "50px 20px",
    fontFamily: "cursive",
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "left",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  };

  const jobDetailStyle = {
    fontSize: "1.1rem",
    color: "#555",
    lineHeight: "1.8",
    marginBottom: "10px",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#0288d1",
  };

  const buttonStyle = {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0288d1",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s ease, background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#026aa7",
    transform: "scale(1.05)",
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h3 style={titleStyle}>Job Details</h3>
        <p style={jobDetailStyle}>
          <span style={labelStyle}>Title:</span> {job.title || "N/A"}
        </p>
        <p style={jobDetailStyle}>
          <span style={labelStyle}>Category:</span> {job.category || "N/A"}
        </p>
        <p style={jobDetailStyle}>
          <span style={labelStyle}>Country:</span> {job.country || "N/A"}
        </p>
        <p style={jobDetailStyle}>
          <span style={labelStyle}>City:</span> {job.city || "N/A"}
        </p>
        {/* <p style={jobDetailStyle}>
          <span style={labelStyle}>Location:</span> {job.location || "N/A"}
        </p> */}
        <p style={jobDetailStyle}>
          <span style={labelStyle}>Description:</span> {job.description || "N/A"}
        </p>
        <p style={jobDetailStyle}>
          <span style={labelStyle}>Job Posted On:</span> {job.jobPostedOn || "N/A"}
        </p>
        <p style={jobDetailStyle}>
          <span style={labelStyle}>Salary:</span>{" "}
          {job.fixedSalary
            ? job.fixedSalary
            : `${job.salaryFrom || 0} - ${job.salaryTo || 0}`}
        </p>
        {user && user.role !== "Employer" && (
          <button
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = buttonHoverStyle.transform;
              e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = buttonStyle.backgroundColor;
            }}
            onClick={handleApply}
          >
            Apply Now
          </button>
        )}
      </div>
    </section>
  );
};

export default JobDetails;
