import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useForm } from "react-hook-form";

const PostJob = () => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [country, setCountry] = useState("");
  // const [city, setCity] = useState("");
  // const [location, setLocation] = useState("");
  // const [salaryFrom, setSalaryFrom] = useState("");
  // const [salaryTo, setSalaryTo] = useState("");
  // const [fixedSalary, setFixedSalary] = useState("");
  // const [salaryType, setSalaryType] = useState("default");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    setError,
    reset,
  } = useForm({ mode: "onChange" });

  const { isAuthorized, user } = useContext(Context);

  const navigate = useNavigate();

  const salaryType = watch("salaryType");
  const fixedSalary = watch("fixedSalary");
  const salaryFrom = watch("salaryFrom");
  const salaryTo = watch("salaryTo");

  // const onSubmit = async (data) => {
  //   if (salaryType === "Fixed Salary") {
  //     // setSalaryFrom("");
  //     // setSalaryFrom("");
  //   } else if (salaryType === "Ranged Salary") {
  //     // setFixedSalary("");
  //   } else {
  //     // setSalaryFrom("");
  //     // setSalaryTo("");
  //     // setFixedSalary("");
  //   }
  //   await axios
  //     .post(
  //       "http://localhost:8080/api/v1/job/post",{ title:data.title, country:data.country, city:data.city, description:data.description, category:data.category,   },
  //       fixedSalary.length >= 4
  //         ? {
  //             title,
  //             description,
  //             category,
  //             country,
  //             city,
  //             // location,
  //             // fixedSalary,
  //           }
  //         : {
  //             title,
  //             description,
  //             category,
  //             country,
  //             city,
  //             // location,
  //             // salaryFrom,
  //             // salaryTo,
  //           },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       toast.success(res.data.message);
  //     // setTitle("");
  //     setDescription("");
  //     // setCategory("");
  //     // setCountry("");
  //     // setCity("");
  //     // setLocation("");
  //     // setSalaryFrom("");
  //     // setSalaryTo("");
  //     // setFixedSalary("");
  //     setSalaryType("default");
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.message);
  //     });
  // };

  // const navigateTo = useNavigate();
  // if (!isAuthorized || (user && user.role !== "Employer")) {
  //   navigateTo("/");
  // }

  const onSubmit = async (data) => {
    try {
      // Ensure salary logic consistency
      let salaryData = {};
      // console.log(salaryType);

      if (salaryType === "Fixed Salary") {
        salaryData = { fixedSalary };
        console.log(salaryData);
      } 
      else if (salaryType === "Ranged Salary") {

        console.log(salaryFrom, salaryTo);
       
        if (salaryFrom >= salaryTo) {
          toast.error("Please enter a valid salary range.");
          return;
        }
        salaryData = { salaryFrom, salaryTo };
        // console.log(salaryData);
      } else {
        toast.error("Please select a valid salary type.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/v1/job/post",
        {
          ...data,
          ...salaryData,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      reset();
      // Reset form or navigate to another page
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigate("/");
  }



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "50px 0",
        backgroundColor: "#f7fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <img
            src="https://media.istockphoto.com/id/508258230/vector/business-men-cartoon-holding-board-with-sign-we-are-hiring.jpg?s=612x612&w=0&k=20&c=t_5hyUjX_F01MzpfhUzNsIZB_D5pNrgAB1_-wCZnDtU="
            alt="Job Posting"
            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          />
        </div>
        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#2d3748",
              marginBottom: "30px",
            }}
          >
            POST NEW JOB
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              <input
                type="text"
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
                {...register("title", {
                  required: {
                    value: true,
                    message: "Job title is required.",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]*$/, // Allows only alphabets and spaces
                    message:
                      "Job title should only contain alphabetical characters.",
                  },
                  maxLength: {
                    value: 25,
                    message: "Job title must be at most 25 characters long.",
                  },
                  minLength: {
                    value: 5,
                    message: "Job title must be at least of 5 characters",
                  },
                })}
              />

              {errors.title && (
                <div style={{ color: "red", fontSize: "16px" }}>
                  {errors.title.message}
                </div>
              )}

              <select
                // value={category}
                // onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
                {...register("category", {
                  required: {
                    value: true,
                    message: "category selection is required.",
                  },
                })}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
              {errors.category && (
                <div
                  style={{
                    color: "red",
                    fontSize: "15px",
                    marginTop: "0.5rem",
                  }}
                >
                  {errors.category.message}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <select
    {...register("country", {
      required: {
        value: true,
        message: "Country is required.",
      },
    })}
    style={{
      width: "100%",
      padding: "12px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "1rem",
    }}
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

              {errors.country && (
                <div
                  style={{
                    color: "red",
                    fontSize: "15px",
                    marginTop: "0.5rem",
                  }}
                >
                  {errors.country.message}
                </div>
              )}

              <input
                type="text"
                // value={city}
                // onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
                {...register("city", {
                  required: {
                    value: true,
                    message: "City is required.",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]*$/, // Allows only alphabets and spaces
                    message:
                      "City should only contain alphabetical characters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "City must be at most 20 characters long.",
                  },
                  minLength: {
                    value: 3,
                    message: "City must be at least of 3 characters ",
                  },
                })}
              />

              {errors.city && (
                <div
                  style={{
                    color: "red",
                    fontSize: "15px",
                    marginTop: "0.5rem",
                  }}
                >
                  {errors.city.message}
                </div>
              )}
            </div>
            {/* <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "1rem", marginBottom: "20px" }}
            /> */}
            {/* <div style={{ marginBottom: "20px" }}>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "1rem" }}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p style={{ color: "#e53e3e", fontSize: "0.9rem" }}>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Fixed Salary"
                    // value={fixedSalary}
                    // onChange={(e) => setFixedSalary(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      marginBottom: "20px",
                    }}
                    {...register("fixedSalary", { 
                      required: { 
                          value: true, 
                          message: "Salary is required." 
                      },
                      pattern: {
                          value: /^[0-9]*$/, // Allows only numerical characters (0-9)
                          message: "Salary should only contain numerical characters."
                      },
                      validate: {
                        notNegative: value => value >= 0 || "Salary cannot be negative.", // Ensures non-negative numbers
                        noLeadingZero: value => !/^0/.test(value) || "Salary cannot start with 0." // Ensures salary does not start with 0
                      }
                  })}
                  />
                  
                  {errors.fixedSalary && (
                      <div style={{ color: "red", fontSize: "15px", marginTop: "0.5rem" }}>
                          {errors.fixedSalary.message}
                      </div>
                  )}
                </div>

                ) : (
                  <div style={{ display: "flex", flexDirection:"column" ,gap: "15px" }}>
                    <div>
                      <input
                        type="text"
                        placeholder="Salary From"
                        // value={salaryFrom}
                        // onChange={(e) => setSalaryFrom(e.target.value)}
                        style={{
                          width: "48%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          fontSize: "1rem",
                        }}
                        {...register("salaryFrom", { 
                          required: { 
                            value: true, 
                            message: "Initial salary is required." 
                          },
                          pattern: {
                            value: /^[0-9]*$/, 
                            message: "Initial salary should only contain numerical characters."
                          },
                          validate: {
                            notNegative: value => value >= 0 || "Initial salary cannot be negative.", 
                            noLeadingZero: value => !/^0/.test(value) || "Initial salary cannot start with 0.",
                            lessThanTo: (value) =>
                            !watch("salaryTo") || Number(value) <= Number(watch("salaryTo")) ||
                            "Initial salary cannot be higher than final salary.",
                          }
                        })}
                        />
                        {errors.salaryFrom && (
                          <div style={{ color: "red", fontSize: "15px", marginTop: "0.5rem" }}>
                              {errors.salaryFrom.message}
                          </div>
                        )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Salary To"
                        // value={salaryTo}
                        // onChange={(e) => setSalaryTo(e.target.value)}
                        style={{
                          width: "48%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          fontSize: "1rem",
                        }}
                        {...register("salaryTo", { 
                          required: { 
                            value: true, 
                            message: "Final salary is required." 
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Final salary should only contain numerical characters."
                          },
                          validate: {
                            notNegative: value => value >= 0 || "Final salary cannot be negative.",
                            noLeadingZero: value => !/^0/.test(value) || "Final salary cannot start with 0.",
                            greaterThanFrom: (value) =>
                              !watch("salaryFrom") || Number(value) >= Number(watch("salaryFrom")) ||
                              "Final salary cannot be lower than initial salary.",
                          }
                        })}
                      />
                        {errors.salaryTo && (
                            <div style={{ color: "red", fontSize: "15px", marginTop: "0.5rem" }}>
                                {errors.salaryTo.message}
                            </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div> */}

            <select
              {...register("salaryType", {
                required: "Salary type is required.",
              })}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            >
              <option value="">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            {errors.salaryType && (
              <div style={{ color: "red", fontSize: "16px" }}>
                {errors.salaryType.message}
              </div>
            )}

            {salaryType === "Fixed Salary" && (
              <div>
                <input
                  type="text" // Keep as text to allow for custom validation
                  placeholder="Fixed Salary"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  {...register("fixedSalary", {
                    required: {
                      value: true,
                      message: "Salary is required.",
                    },
                    pattern: {
                      value: /^(?!-)(?!.*-$)(?!0)\d+$/, // Disallow leading and trailing hyphen, and leading zero
                      message: "Salary is invalid.",
                    },
                    validate: {
                      notNegative: (value) =>
                        value >= 1000 || "Salary must be at least 1000.", // Minimum salary
                      notExceed: (value) =>
                        value <= 9999999 || "Salary cannot exceed 9999999.", // Maximum salary
                      noLeadingZero: (value) =>
                        !/^0/.test(value) || "Salary cannot start with 0.", // En
                    },
                  })}
                />
                {errors.fixedSalary && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginTop: "0.5rem",
                    }}
                  >
                    {errors.fixedSalary.message}
                  </div>
                )}
              </div>
            )}

            {salaryType === "Ranged Salary" && (
              <>
                <input
                  type="text"
                  placeholder="Salary From"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  {...register("salaryFrom", {
                    required: {
                      value: true,
                      message: "Salary is required.",
                    },
                    pattern: {
                      value: /^(?!-)(?!.*-$)(?!0)\d+$/, // Disallow leading and trailing hyphen, and leading zero
                      message: "Salary is invalid.",
                    },
                    validate: {
                      notNegative: (value) =>
                        value >= 1000 || "Salary must be at least 1000.", // Minimum salary
                      notExceed: (value) =>
                        value <= 9999999 || "Salary cannot exceed 9999999.", // Maximum salary
                      noLeadingZero: (value) =>
                        !/^0/.test(value) || "Salary cannot start with 0.", // Ensures salary does not start with 0
                      lessThanTo: (value) =>
                        !watch("salaryTo") || Number(value) <= Number(watch("salaryTo")) ||
                        "Initial salary cannot be higher than final salary.",
                    },
                  })}
                />
                {errors.salaryFrom && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginTop: "0.5rem",
                    }}
                  >
                    {errors.salaryFrom.message}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Salary To"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  {...register("salaryTo", {
                    required: {
                      value: true,
                      message: "Salary is required.",
                    },
                    pattern: {
                      value: /^(?!-)(?!.*-$)(?!0)\d+$/, // Disallow leading and trailing hyphen, and leading zero
                      message: "Salary is invalid.",
                    },
                    vvalidate: {
                      notNegative: (value) =>
                        value >= 1000 || "Salary must be at least 1000.", // Minimum salary
                      notExceed: (value) =>
                        value <= 9999999 || "Salary cannot exceed 9999999.", // Maximum salary
                      noLeadingZero: (value) =>
                        !/^0/.test(value) || "Salary cannot start with 0.", // Ensures salary does not start with 0
                      greaterThanFrom: (value) =>
                        !watch("salaryFrom") || Number(value) >= Number(watch("salaryFrom")) ||
                        "Final salary cannot be lower than initial salary.",
                    },
                  })}
                />
                {errors.salaryTo && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginTop: "0.5rem",
                    }}
                  >
                    {errors.salaryTo.message}
                  </div>
                )}
              </>
            )}

            <textarea
              rows="10"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "1rem",
                resize: "none",
                marginBottom: "20px",
              }}
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required.",
                },
              })}
            />
            
            {errors.description && (<div style={{
                      color: "red",
                      fontSize: "15px",
                      marginTop: "", marginBottom:"1rem"
                    }} >{errors.description.message  }</div>)}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px 20px",
                backgroundColor: "#4C51BF",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
            >
              Create Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
