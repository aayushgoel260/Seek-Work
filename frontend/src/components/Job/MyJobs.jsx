// Import necessary modules
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import "./MyJobs.css";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs.reverse());
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    const originalJob = await axios.get(
      `http://localhost:8080/api/v1/job/${jobId}`,
      { withCredentials: true }
    ).then(response => response.data.job);

    const isChanged = Object.keys(originalJob).some(
      (key) => updatedJob[key] !== originalJob[key]
    );
  
    if (!isChanged) {
      toast.success("No changes detected.");
      setEditingMode(null);
      return;
    }
  
    // Prevent saving if any field is empty
    const hasEmptyField = Object.values(updatedJob).some(
      (value) => value === "" || value === null || value === undefined
    );
  
    if (hasEmptyField) {
      toast.error("Fields cannot be empty.");
      return;
    }
  
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job._id === jobId) {
          // Validate title for alphabets only
          if (field === "title" && value !== "" && !/^[A-Za-z\s]+$/.test(value)) {
            toast.error("Title must contain alphabets only.");
            return job;
          }
          
          // Validate city for alphabets only
          if (field === "city" && value !== "" && !/^[A-Za-z\s]+$/.test(value)) {
            toast.error("City must contain alphabets only.");
            return job;
          }
  
          // Validate country for valid dropdown options
          if (
            field === "country" &&
            ![
              "",
              "United States",
              "Canada",
              "United Kingdom",
              "Australia",
              "Germany",
              "France",
              "India",
              "China",
              "Japan",
              "Brazil",
              "South Africa",
              "Mexico",
              "Italy",
              "Spain",
            ].includes(value)
          ) {
            toast.error("Please select a valid country.");
            return job;
          }
  
          // Allow field update
          return { ...job, [field]: value };
        }
        return job;
      })
    );
  };
  
  
  

  return (
    <div className="jobs-page">
      <div className="jobs-container">
        <h1 className="jobs-title">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="jobs-list">
            {myJobs.map((job) => (
              <div className="job-card" key={job._id}>
                <div className="job-details">
                  <div className="job-field">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={job.title}
                      disabled={editingMode !== job._id}
                      onChange={(e) =>
                        handleInputChange(job._id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="job-field">
  <label>Country:</label>
  {editingMode === job._id ? (
    <select
      value={job.country}
      onChange={(e) =>
        handleInputChange(job._id, "country", e.target.value)
      }
    >
      <option value="">Select Country</option>
      <option value="United States">United States</option>
      <option value="Canada">Canada</option>
      <option value="United Kingdom">United Kingdom</option>
      <option value="Australia">Australia</option>
      <option value="Germany">Germany</option>
      <option value="France">France</option>
      <option value="India">India</option>
      <option value="China">China</option>
      <option value="Japan">Japan</option>
      <option value="Brazil">Brazil</option>
      <option value="South Africa">South Africa</option>
      <option value="Mexico">Mexico</option>
      <option value="Italy">Italy</option>
      <option value="Spain">Spain</option>
    </select>
  ) : (
    <input
      type="text"
      value={job.country}
      disabled
    />
  )}
</div>

                  <div className="job-field">
                    <label>City:</label>
                    <input
                      type="text"
                      value={job.city}
                      disabled={editingMode !== job._id}
                      onChange={(e) =>
                        handleInputChange(job._id, "city", e.target.value)
                      }
                    />
                  </div>
                  <div className="job-field">
                    <label>Description:</label>
                    <textarea
                      value={job.description}
                      disabled={editingMode !== job._id}
                      onChange={(e) =>
                        handleInputChange(job._id, "description", e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="job-actions">
                    {editingMode === job._id ? (
                      <>
                        <button
                          className="update-button"
                          onClick={() => handleUpdateJob(job._id)}
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="cancel-button"
                          onClick={handleDisableEdit}
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        className="edit-button"
                        onClick={() => handleEnableEdit(job._id)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-jobs-message">
            You haven't posted any jobs yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
