import React, { useState } from "react";
import axios from "axios";

export default function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  
  const [validated, setValidated] = useState(false);

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidated(true);

    
    if (
      !formData.email.includes("@") ||
      formData.password.length < 4
    ) {
      return;
    }

    try {
      const response = await axios.post(
        "https://food-rescue-hub-backend.vercel.app/api/auth/login",
        formData
      );

      if (response.data.success) {
        setMessage("Login Successful!");
        setType("success");

       
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

      
        setTimeout(() => {
          window.location.href =
            response.data.user.role === "Donor"
              ? "/donor-dashboard"
              : "/ngo-dashboard";
        }, 1500);
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login Failed!");
      setType("danger");
    }
  };

  const styles = {
    formContainer: {
      maxWidth: "500px",
      margin: "20px auto",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "0px 0px 10px rgb(154, 152, 152)",
      backgroundColor: "white",
    },

    heading: {
      color: "rgb(0, 128, 73)",
      fontWeight: 800,
      textAlign: "center",
      marginBottom: "20px",
    },

    label: {
      fontWeight: 600,
      marginBottom: "5px",
    },

    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "rgb(0, 128, 73)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop: "10px",
    },

    link: {
      color: "rgb(0, 128, 73)",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
   
      {message && (
        <div
          className={`alert alert-${type}`}
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "10px 0",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} noValidate>
          <h3 style={styles.heading}>Login Form</h3>

        
          <div className="mb-3">
            <label style={styles.label}>Email</label>

            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              className={`form-control ${
                validated
                  ? formData.email.includes("@")
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              value={formData.email}
              onChange={handleChange}
            />

            <div className="valid-feedback">
              Looks good!
            </div>

            <div className="invalid-feedback">
              Please enter a valid email.
            </div>
          </div>

         
          <div className="mb-3">
            <label style={styles.label}>Password</label>

            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              className={`form-control ${
                validated
                  ? formData.password.length >= 4
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              value={formData.password}
              onChange={handleChange}
            />

            <div className="valid-feedback">
              Password looks good!
            </div>

            <div className="invalid-feedback">
              Password must be at least 4 characters.
            </div>
          </div>

        
          <button type="submit" style={styles.button}>
            Login
          </button>

        
          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don't have an account?{" "}
            <span onClick={onSwitch} style={styles.link}>
              Register Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}