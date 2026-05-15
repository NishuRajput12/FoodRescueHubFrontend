import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    quantity: "",
    location: ""
  });


  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const [validated, setValidated] = useState(false);
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {

    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
      setMessageType("");
    }, 3000);

    return () => clearTimeout(timer);

  }, [message]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setValidated(true);

    if (
      formData.name.length < 3 ||
      formData.contact.length < 10 ||
      formData.quantity < 1 ||
      formData.location.length < 5
    ) {
      return;
    }

    const token = localStorage.getItem('token');

    try {

      const response = await axios.post(
        'https://food-rescue-hub-backend.vercel.app/api/food/request/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {

        setMessage("Request Posted Successfully!");
        setMessageType("success");

        // Reset Form
        setFormData({
          name: "",
          contact: "",
          quantity: "",
          location: ""
        });

        setValidated(false);

      } else {

        setMessage("Failed to post request.");
        setMessageType("danger");
      }

    } catch (error) {

      setMessage(
        error.response?.data?.msg ||
        "Error posting request."
      );

      setMessageType("danger");
    }
  };

  return (

    <div className="container mt-5">
      {message && (
        <div className="row mb-3">
          <div className="col-md-8 offset-md-2">
            <div
              className={`alert alert-${messageType} text-center shadow-sm`}
              role="alert"
            >
              {message}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-8 offset-md-2 p-4 shadow-sm bg-white rounded">
          <h3 className="mb-4 text-success fw-bold">
            Request Form
          </h3>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Enter Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${
                  validated
                    ? formData.name.length >= 3
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }`}
              />
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Name must be at least 3 characters.
              </div>
            </div>

            <div className="mb-3">
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

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="e.g., 10 Plates"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`form-control ${
                    validated
                      ? formData.quantity >= 1
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

              <div className="col-md-8 mb-3">
                <label className="form-label fw-semibold">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Jaipur, Rajasthan"
                  value={formData.location}
                  onChange={handleChange}
                  className={`form-control ${
                    validated
                      ? formData.location.length >= 5
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }`}
                />
                <div className="valid-feedback">
                  Location looks good!
                </div>
                <div className="invalid-feedback">
                  Please enter valid location.
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 fw-bold mt-3 py-2"
            >
              Submit Request
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}