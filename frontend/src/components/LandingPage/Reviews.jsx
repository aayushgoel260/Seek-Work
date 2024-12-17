import React, { useState, useEffect } from "react";
import "./Reviews.css";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const ReviewsPage = () => {
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rating: 1,
    suggestion: "",
  });
  const [message, setMessage] = useState("");
  const [currentReviewCount, setCurrentReviewCount] = useState(3);

  // Fetch all reviews
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/review/getreviews")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReviews(data.data);
        }
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    const namePattern = /^[A-Za-z\s]+$/; // Allows only letters and spaces
  if (!namePattern.test(name)) {
    setMessage("Name must contain only alphabets.");
    return;
  } else if (name.length < 3) {
    setMessage("Name must be at least 3 characters.");
    return;
  } else if (name.length > 20) {
    setMessage("Name must be at most 20 characters.");
    return;
  }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|chitkara\.edu\.in)$/;
    if (!emailPattern.test(email)) {
      setMessage("Invalid Email ");
      return;
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      setMessage("Phone number is invalid");
      return;
    }
    fetch("http://localhost:8080/api/v1/review/addreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage("Thank you for your feedback!");
          setReviews([data.data, ...reviews]); // Add new review to the list
          setFormData({
            name: "",
            email: "",
            phone: "",
            rating: 1,
            suggestion: "",
          });
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  // Handle deleting a review
//   const deleteReview = (id) => {
//     fetch(`http://localhost:8080/api/v1/review/deletereview/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           // Update the state to remove the deleted review
//           setReviews(reviews.filter((review) => review._id !== id));
//         } else {
//           console.error("Failed to delete review:", data.message);
//         }
//       })
//       .catch((error) => console.error("Error deleting review:", error));
//   };

  const handleShowMore = () => {
    setCurrentReviewCount((prevCount) =>
      Math.min(prevCount + 3, reviews.length)
    );
  };

  // Show less reviews
  const handleShowLess = () => {
    setCurrentReviewCount((prevCount) => Math.max(prevCount - 3, 3));
  };

  const navbarStyle = {
    backgroundColor: "#E1F5FE", // Light blue shade
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Ensures vertical alignment for all items
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    fontFamily: "'Roboto', sans-serif", // Clean font
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
    alignItems: "center", // Ensures vertical alignment
    gap: "20px", // Moderate spacing between menu items
    marginLeft: "auto",
  };

  const menuStyle = {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "20px", // Moderate spacing
  };

  const showMenuStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    margin: 0,
    padding: 0,
    backgroundColor: "#E1F5FE",
    position: "absolute",
    top: "50px",
    left: "0",
    width: "100%",
    // padding: "25px",
    zIndex: 99,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const linkStyle = {
    color: "#01579B", // Dark blue for links
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontWeight: "500", // Regular font weight
  };

  const linkHoverStyle = {
    color: "#FF7043", // Soft coral for hover
  };

  const hamburgerStyle = {
    display: "none", // Hidden by default
    color: "#01579B", // Dark blue color
    fontSize: "2rem", // Larger font size for visibility
    cursor: "pointer",
  };
  if (show) {
    hamburgerStyle.display = "block";
  }

  return (
    <>
      <header style={navbarStyle}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
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
            <ul style={show ? showMenuStyle : menuStyle}>
              <li>
                <Link
                  to={"/"}
                  onClick={() => setShow(false)}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.color = linkHoverStyle.color)
                  }
                  onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  onClick={() => setShow(false)}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.color = linkHoverStyle.color)
                  }
                  onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                >
                  ADD REVIEWS
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  onClick={() => setShow(false)}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.color = linkHoverStyle.color)
                  }
                  onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link
                  to={"/clientTestimonials"}
                  onClick={() => setShow(false)}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.color = linkHoverStyle.color)
                  }
                  onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                >
                  TESTIMONIALS
                </Link>
              </li>
             
            </ul>

            <div style={{ display: "none" }}>
              <GiHamburgerMenu onClick={() => setShow(!show)} />
            </div>
          </div>
        </div>
      </header>

      <div className="reviews-container">
        <h1>Seek & Work - Reviews</h1>
        <form className="review-form" onSubmit={handleSubmit}>
          <h2>Add Review</h2>
          Enter Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          Enter Email
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          Enter Contact Number
          <input
            type="text"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          Rating
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          Add Feedback/Suggestions
          <textarea
            name="suggestion"
            placeholder="Your Suggestions/Feedback"
            value={formData.suggestion}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
          {message && <p className="message">{message}</p>}
        </form>

        <div className="reviews-list">
          <h2>All Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet!</p>
          ) : (
            reviews.slice(0, currentReviewCount).map((review) => (
              <div key={review._id} className="review-card">
                <h3>{review.name}</h3>
                <p>Email: {review.email}</p>
                <p>Phone: {review.phone}</p>
                <p>Rating: {review.rating}/5</p>
                <p>Suggestion: {review.suggestion}</p>
                {/* <button
                  onClick={() => deleteReview(review._id)}
                  className="delete-button"
                >
                  Delete
                </button> */}
              </div>
            ))
          )}
        </div>
        {currentReviewCount < reviews.length && (
          <button className="show-more-button" onClick={handleShowMore}>
            Show More
          </button>
        )}
        {currentReviewCount > 3 && (
          <button className="show-more-button" onClick={handleShowLess}>
            Show Less
          </button>
        )}
      </div>
      <footer>
        <div className="footer-content">
          <div className="footer-text">
            <p>
              &copy; {new Date().getFullYear()} All Rights Reserved By
              Seek&Work.
            </p>
          </div>
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaYoutube />
            </a>
            <a
              href="https://linkedin.com/in/aayush-goel-206b29252/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/aayushgoel260/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <RiInstagramFill />
            </a>
          </div>
          <div className="footer-links">
            <Link to="/terms" className="footer-link">
              Terms and Conditions
            </Link>
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ReviewsPage;
