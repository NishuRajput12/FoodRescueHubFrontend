import React, { useState } from 'react';
import axios from 'axios';
export default function DonateForm() {
  const [formData, setFormData] = useState({
    foodName: "",
    foodType: "Veg",
    quantity: "",
    expiryTime: "6 Hours",
    address: "",
    contact: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
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
      formData.foodName.length < 3 ||
      formData.quantity.length < 1 ||
      formData.contact.length < 10 ||
      formData.address.length < 5
    ) {
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setMessageType("danger");
      setMessage("Session expired! Please login again.");
      return;
    }
    try {

      const response = await axios.post(
        'http://localhost:8000/api/food/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {

        setMessageType("success");
        setMessage("Food Donation Posted Successfully!");

        setFormData({
          foodName: "",
          foodType: "Veg",
          quantity: "",
          expiryTime: "6 Hours",
          address: "",
          contact: ""
        });

        setValidated(false);

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }

    } catch (error) {

      setMessageType("danger");

      setMessage(
        error.response?.data?.msg ||
        "Server Error: Food could not be posted."
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 p-4 rounded shadow-sm bg-white">
          {message && (
            <div
              className={`alert alert-${messageType} text-center`}
              role="alert"
              style={{ borderRadius: "10px" }}
            >
              {message}
            </div>

          )}
          <h3 className="mb-4 text-success fw-bold">
            Donate Form
          </h3>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">

              <label className="form-label fw-semibold">
                Enter Food Item Name
              </label>
              <input
                type="text"
                name="foodName"
                placeholder="e.g., Dal Tadka"
                value={formData.foodName}
                onChange={handleChange}
                className={`form-control ${
                  validated
                    ? formData.foodName.length >= 3
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }`}
              />
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Food name must be at least 3 characters.
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Food Type
                </label>
                <select
                  name="foodType"
                  className="form-select"
                  onChange={handleChange}
                  value={formData.foodType}
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="e.g., 10 Plates"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`form-control ${
                    validated
                      ? formData.quantity.length >= 1
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }`}
                />
                <div className="valid-feedback">
                  Quantity added!
                </div>
                <div className="invalid-feedback">
                  Please enter quantity.
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Food Validity
                </label>
                <select
                  name="expiryTime"
                  className="form-select"
                  onChange={handleChange}
                  value={formData.expiryTime}
                >
                  <option value="1 Hours">1 Hour</option>
                  <option value="3 Hours">3 Hours</option>
                  <option value="6 Hours">6 Hours</option>
                  <option value="12 Hours">12 Hours</option>
                  <option value="24 Hours">24 Hours</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="+91-9999999999"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`form-control ${
                    validated
                      ? formData.contact.length >= 10
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }`}
                />
                <div className="valid-feedback">
                  Valid contact number!
                </div>
                <div className="invalid-feedback">
                  Enter valid phone number.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Address
              </label>
              <textarea
                name="address"
                rows="2"
                placeholder="Jaipur, Rajasthan"
                value={formData.address}
                onChange={handleChange}
                className={`form-control ${
                  validated
                    ? formData.address.length >= 5
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }`}
              />
              <div className="valid-feedback">
                Address looks good!
              </div>
              <div className="invalid-feedback">
                Please enter proper address.
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 fw-bold mt-3 py-2"
            >
              Add Donation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}