import React, { useContext, useEffect, useState } from "react";
import { FaRegUser, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../../main";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "", phone: "" });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false); // State for delete confirmation dialog
  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/user/getuser", {
          withCredentials: true,
        });
        setUser(data.user);
        setUpdatedUser({ name: data.user.name, email: data.user.email, phone: data.user.phone });
      } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch profile data";
        toast.error(message);
      }
    };

    fetchProfile();
  }, [isAuthorized]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) {
      toast.error("Phone number must be up to 10 digits and only numeric");
      return;
    }
    setUpdatedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedData = {};
    if (updatedUser.name !== user.name) updatedData.name = updatedUser.name;
    if (updatedUser.email !== user.email) updatedData.email = updatedUser.email;
    if (updatedUser.phone !== user.phone) updatedData.phone = updatedUser.phone;
  
    if (Object.keys(updatedData).length === 0) {
      setEditMode(false);
      toast.success("No changes detected");
      return;
    }
  
    const nameRegex =  /^[a-zA-Z][a-zA-Z0-9\s]*$/;
    if (updatedData.name && (!nameRegex.test(updatedData.name) || /^[0-9]+$/.test(updatedData.name))) {
      toast.error("Name can be alphanumeric but must start with a letter and cannot contain special characters.");
      return;
    }
  
    if (
      updatedData.phone && 
      (updatedData.phone.length !== 10 || isNaN(updatedData.phone))
    ) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }
  
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/user/updateuser",
        updatedData,
        { withCredentials: true }
      );
      setUser(data.user);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update profile";
      toast.error(message);
    }
  };
  

  const handleDelete = async () => {
    try {
      // Delete user profile
      await axios.delete(`http://localhost:8080/api/v1/user/delete/${user._id}`, {
        withCredentials: true,
      });
  
      // Logout the user
      await axios.get("http://localhost:8080/api/v1/user/logout", { withCredentials: true });
  
      toast.success("Profile deleted successfully");
  
      // Redirect to register page and prevent back navigation
      window.location.replace("/register");
  
      // Optional: Refresh the page to ensure it's loaded fresh
      setTimeout(() => window.location.reload(), 100); // Refresh after redirection
  
      // Clear the user state
      setUser(null);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete profile";
      toast.error(message);
    }
  };
  

  const openDeleteConfirmDialog = () => {
    setDeleteConfirmDialog(true); // Open the delete confirmation dialog
  };

  const closeDeleteConfirmDialog = () => {
    setDeleteConfirmDialog(false); // Close the delete confirmation dialog
  };

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5">Loading profile...</Typography>
      </div>
    );
  }

  return (
    <section
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f7fafc", 
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1200px",
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Left side with Image */}
        <div
          style={{
            flex: 1,
            background: `url('https://media.istockphoto.com/id/1305286031/vector/job-seekers-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=1RowA231qvBIF8gsFHkiL-yaUWvvGhRgOymfl7f0ujg=') no-repeat center center`,
            backgroundSize: "cover",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        />
        {/* Right side with Profile Details */}
        <div
          style={{
            flex: 1,
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <FaRegUser size={80} color="#007bff" /> {/* Changed icon color to #007bff */}
            <Typography variant="h5" style={{ margin: "10px 0", color: "#444" }}>
              {user.name}
            </Typography>
            <Typography variant="body1" style={{ color: "#666" }}>
              {user.role}
            </Typography>
          </div>

          <div style={{ marginBottom: "15px" }}>
  <Typography variant="subtitle2" style={{ color: "#666", marginBottom: "5px" }}>
    User Details
  </Typography>
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <MdOutlineMail style={{ color: "#007bff", fontSize: "20px" }} />
      <Typography variant="body1" style={{ color: "#444" }}>
        {user.email}
      </Typography>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <FaPhoneAlt style={{ color: "#007bff", fontSize: "20px" }} />
      <Typography variant="body1" style={{ color: "#444" }}>
        {user.phone}
      </Typography>
    </div>
  </div>
</div>


          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditMode(true)}
              style={{ marginRight: "10px" }}
            >
              Update Profile
            </Button>
            <Button
              variant="contained"
              color="error" // Changed to 'error' for a red delete button
              onClick={openDeleteConfirmDialog} // Open the delete confirmation dialog
            >
              Delete Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Update Profile Dialog */}
      <Dialog open={editMode} onClose={() => setEditMode(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Update Profile
          <IconButton
            onClick={() => setEditMode(false)}
            style={{ position: "absolute", right: "10px", top: "10px" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="body2" style={{ marginBottom: "5px", fontWeight: "bold" }}>
              Name
            </Typography>
            <TextField
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="body2" style={{ marginBottom: "5px", fontWeight: "bold" }}>
              Email
            </Typography>
            <TextField
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="body2" style={{ marginBottom: "5px", fontWeight: "bold" }}>
              Phone
            </Typography>
            <TextField
              name="phone"
              value={updatedUser.phone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: "10px" }}>
            Save Changes
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Profile Confirmation Dialog */}
      <Dialog open={deleteConfirmDialog} onClose={closeDeleteConfirmDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete your profile?
          <IconButton
            onClick={closeDeleteConfirmDialog}
            style={{ position: "absolute", right: "10px", top: "10px" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Confirm
          </Button>
          <Button variant="outlined" color="primary" onClick={closeDeleteConfirmDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Profile;
