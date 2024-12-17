import './Dashboard.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTag } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome, FaUsers, FaBriefcase } from "react-icons/fa";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const UsersList = () => {
  const [employers, setEmployers] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews,setReviews]=useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [heroDetails, setHeroDetails] = useState({ liveJobs: 0 });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/all");
        const allUsers = response.data.users;
        const employers = allUsers.filter(user => user.role === "Employer");
        const jobSeekers = allUsers.filter(user => user.role === "Job Seeker");

        setEmployers(employers);
        setJobSeekers(jobSeekers);
      } catch (error) {
        toast.error("Failed to fetch users!");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/job/categories");
        setCategories(response.data.categories);
      } catch (error) {
        toast.error("Failed to fetch job categories!");
      }
    };
    
    const fetchReviews=async()=>{
      try{
        const response=await axios.get("http://localhost:8080/api/v1/review/getreviews");
        setReviews(response.data.data);

      }catch(e)
      {
        toast.error("Failed to fetch reviews");
      }
    }

    fetchUsers();
    fetchCategories();
    fetchReviews();
    const storedDetails = JSON.parse(localStorage.getItem("heroDetails")) || { liveJobs: 0 };
    setHeroDetails(storedDetails);
  }, []);

  
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/admin/logout");
      if (response.status === 200) {
        toast.success("Logged out successfully!");
        // Redirect to login page or clear session storage
        localStorage.clear();
        window.location.href = "/admin";
      }
    } catch (error) {
      toast.error("Logout failed. Please try again!");
    }
  };
  
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/review/deletereview/${reviewId}`);
      if (response.status === 200) {
        toast.success("Review deleted successfully!");
        // Remove the review from the local state
        setReviews(reviews.filter(review => review._id !== reviewId));
      }
    } catch (error) {
      toast.error("Failed to delete review!");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/user/delete/${selectedUser}`);
      if (response.status === 200) {
        toast.success("User deleted successfully!");
        if (selectedRole === "Employer") {
          setEmployers(employers.filter(user => user._id !== selectedUser));
        } else if (selectedRole === "Job Seeker") {
          setJobSeekers(jobSeekers.filter(user => user._id !== selectedUser));
        }
        closeDialog();
      }
    } catch (error) {
      toast.error("Failed to delete user!");
    }
  };

  const openDeleteDialog = (userId, role) => {
    setSelectedUser(userId);
    setSelectedRole(role);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setSelectedRole("");
  };

  const pieChartData = {
    labels: ['Job Seekers', 'Employers'],
    datasets: [
      {
        label: 'Users Comparison',
        data: [jobSeekers.length, employers.length],
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: categories.map(category => category.category),
    datasets: [
      {
        label: 'Jobs Available',
        data: categories.map(category => category.count),
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: { title: { display: true, text: 'Job Categories' } },
      y: { title: { display: true, text: 'Jobs Available' } },
    },
  };

  const renderContent = () => {

    //
    const topCategories = categories
    .sort((a, b) => b.count - a.count) // Sorting in descending order
    .slice(0, 3); 
    //
    switch (activeSection) {
      case "Dashboard":
        return (
          <div className="dashboard-content">
            <div className="stats-container">
              <div className="stats-card employer-card" onClick={() => setActiveSection("Employers")}>
                <h3>Total Employers</h3>
                <p>{employers.length}</p>
              </div>
              <img
                src="/logo.png"
                width="100px"
              />
              <div className="stats-card jobseeker-card" onClick={() => setActiveSection("Job Seekers")}>
                <h3>Total Job Seekers</h3>
                <p>{jobSeekers.length}</p>
              </div>
              {/* <div className="stats-card live-jobs-card" onClick={() => setActiveSection("Live Jobs")}>
                <h3>Live Jobs</h3>
                <p>{heroDetails.liveJobs}</p>
              </div> */}
             
            </div>
            <div className="charts-wrapper">
              <div className="chart-item">
                <Pie data={pieChartData} options={chartOptions} style={{marginLeft:"140px"}} />
              </div>
              <div className="chart-item">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>
            <div className="top-categories">
              <h3 style={{marginLeft:"40%"}}>Top 3 Trending Job Categories</h3>
              <ul>
                {topCategories.map((category, index) => (
                  <li key={index} className="category-item">
                    <h4>{index+1}. {category.category}</h4>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "Employers":
        return (
          <div className="users-section">
            <h2 className="section-title">Employers</h2>
            {loading ? (
              <div className="loading-text">Loading...</div>
            ) : employers.length > 0 ? (
              <ul className="user-list">
                {employers.map((employer) => (
                  <li key={employer._id} className="user-item">
                    <h3>{employer.name}</h3>
                    <p>{employer.email}</p>
                    <button onClick={() => openDeleteDialog(employer._id, "Employer")}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-users-message">No Employers Found</div>
            )}
          </div>
        );
      case "Job Seekers":
        return (
          <div className="users-section">
            <h2 className="section-title">Job Seekers</h2>
            {loading ? (
              <div className="loading-text">Loading...</div>
            ) : jobSeekers.length > 0 ? (
              <ul className="user-list">
                {jobSeekers.map((jobSeeker) => (
                  <li key={jobSeeker._id} className="user-item">
                    <h3>{jobSeeker.name}</h3>
                    <p>{jobSeeker.email}</p>
                    <button onClick={() => openDeleteDialog(jobSeeker._id, "Job Seeker")}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-users-message">No Job Seekers Found</div>
            )}
          </div>
        );
      case "Live Jobs":
        return (
          <div className="users-section">
            <h2 className="section-title">Live Jobs</h2>
            <p>{heroDetails.liveJobs} live jobs available!</p>
          </div>
        );
        case "Job Categories":
          return (
            <div className="categories-section">
              <h2 className="section-title">Job Categories</h2>
              {loading ? (
                <div className="loading-text">Loading...</div>
              ) : categories.length > 0 ? (
                <ul className="category-list">
                  {categories.map((categoryObj, index) => (
                    <li key={index} className="category-item">
                      <h3 style={{fontSize:"16px"}}>{categoryObj.category}</h3>  {/* Access the category field */}
                      <p>Jobs Available: {categoryObj.count}</p> 
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-categories-message">No Categories Found</div>
              )}
            </div>
          );
          
        
          case "Reviews":
            return (
              <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
                <h1 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>User Reviews</h1>
                {reviews.length > 0 ? (
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {reviews.map((review) => (
                      <li
                        key={review._id}
                        style={{
                          marginBottom: "20px",
                          padding: "15px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <h3 style={{ fontSize: "18px", marginBottom: "10px", color: "#333" }}>{review.name}</h3>
                        <p style={{ fontSize: "14px", margin: "5px 0" }}>
                          <strong>Email:</strong> {review.email}
                        </p>
                        <p style={{ fontSize: "14px", margin: "5px 0" }}>
                          <strong>Phone:</strong> {review.phone}
                        </p>
                        <p style={{ fontSize: "14px", margin: "5px 0" }}>
                          <strong>Rating:</strong> {review.rating} / 5
                        </p>
                        <p style={{ fontSize: "14px", margin: "5px 0" }}>
                          <strong>Suggestion:</strong> {review.suggestion}
                        </p>
                        <button
                onClick={() => handleDeleteReview(review._id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete Review
              </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "16px", color: "#555" }}>No reviews found.</p>
                )}
              </div>
            );
           default:
        return <div>Invalid Section</div>;
    }
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <ul>
          <li
            className={activeSection === "Dashboard" ? "active" : ""}
            onClick={() => setActiveSection("Dashboard")}
          >
            <FaHome /> Dashboard
          </li>
          <li
            className={activeSection === "Employers" ? "active" : ""}
            onClick={() => setActiveSection("Employers")}
          >
            <FaUsers /> Employers
          </li>
          <li
            className={activeSection === "Job Seekers" ? "active" : ""}
            onClick={() => setActiveSection("Job Seekers")}
          >
            <FaBriefcase /> Job Seekers
          </li>
          <li
            className={activeSection === "Job Categories" ? "active" : ""}
            onClick={() => setActiveSection("Job Categories")}
          >
         <FaTag/> Categories
          </li>
          <li
          className={activeSection === "Reviews" ? "active" : ""}
          onClick={() => setActiveSection("Reviews")}
          >
  <FaTag /> Reviews
</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {selectedRole}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default UsersList; 