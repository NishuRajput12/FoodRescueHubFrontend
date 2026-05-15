import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm({ onSwitch }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Donor",
    phone: "",
    address: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidated(true);

    if (
      formData.name.length < 3 ||
      !formData.email.includes("@") ||
      formData.password.length < 6 ||
      formData.phone.length < 10 ||
      formData.address.length < 5
    ) {
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );

      if (response.status === 201 || response.data.success) {

        setShowSuccess(true);

        setTimeout(() => {
          onSwitch();
        }, 2000);
      }

    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed!");
    }
  };

  const styles = {

    formContainer: {
      maxWidth: "500px",
      width: "100%",
      margin: "20px auto",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "0px 0px 10px rgb(154, 152, 152)",
      backgroundColor: "white"
    },

    heading: {
      color: "rgb(0, 128, 73)",
      fontWeight: 800,
      textAlign: "center",
      marginBottom: "20px"
    },

    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: 600,
      color: "#333"
    },

    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "rgb(0, 128, 73)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold"
    },

    link: {
      color: "rgb(0, 128, 73)",
      fontWeight: "bold",
      cursor: "pointer"
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >

      {showSuccess && (
        <div
          className="alert alert-success"
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "10px 0",
            textAlign: "center"
          }}
        >
          Registration Successful!
        </div>
      )}

      <div style={styles.formContainer}>

        <form onSubmit={handleSubmit} noValidate>

          <h3 style={styles.heading}>
            Register Form
          </h3>

          <div className="mb-3">
            <label style={styles.label}>
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter Full Name"
              className={`form-control ${
                validated
                  ? formData.name.length >= 3
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              value={formData.name}
              onChange={handleChange}
            />
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Name must be at least 3 characters.
            </div>
          </div>

          <div className="mb-3">
            <label style={styles.label}>
              Email
            </label>
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
              Email looks good!
            </div>

            <div className="invalid-feedback">
              Please enter a valid email.
            </div>

          </div>

         
          <div className="mb-3">

            <label style={styles.label}>
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Create Password"
              className={`form-control ${
                validated
                  ? formData.password.length >= 6
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              value={formData.password}
              onChange={handleChange}
            />

            <div className="valid-feedback">
              Strong password!
            </div>

            <div className="invalid-feedback">
              Password must be at least 6 characters.
            </div>

          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label style={styles.label}>
                Role
              </label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Donor">Donor</option>
                <option value="NGO">NGO</option>
              </select>

            </div>

            <div className="col-md-6">
              <label style={styles.label}>
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="Enter Phone"
                className={`form-control ${
                  validated
                    ? formData.phone.length >= 10
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }`}
                value={formData.phone}
                onChange={handleChange}
              />

              <div className="valid-feedback">
                Valid phone number!
              </div>
               <div className="invalid-feedback">
                Enter valid 10 digit number.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label style={styles.label}>
              Address / Location
            </label>
            <input
              name="address"
              type="text"
              placeholder="Enter Your Location"
              className={`form-control ${
                validated
                  ? formData.address.length >= 5
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              value={formData.address}
              onChange={handleChange}
            />
            <div className="valid-feedback">
              Address looks good!
            </div>
            <div className="invalid-feedback">
              Please enter complete address.
            </div>
          </div>
        
          <button
            type="submit"
            style={styles.button}
          >
            Register
          </button>
          <p
            style={{
              textAlign: "center",
              marginTop: "15px"
            }}
          >
            Already have an account?{" "}

            <span
              onClick={onSwitch}
              style={styles.link}
            >
              Login Here
            </span>

          </p>

        </form>
      </div>
    </div>
  );
}