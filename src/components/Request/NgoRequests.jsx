import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NgoRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/food/all-requests");
        setRequests(res.data.requests);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", padding: "30px 0" }}>
      
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2 style={{ fontWeight: "800", color: "#198754" }}>
           Food Donation Requests
        </h2>
        <p style={{ color: "#666" }}>
          Support NGOs by donating food and helping people in need
        </p>
      </div>

      <div className="container">
        <div className="row">

          {requests.length > 0 ? (
            requests.map((req) => {
              
              
              console.log("NGO DATA:", req);
              console.log("CONTACT FIELD:", req.contact);

              return (
                <div className="col-md-6 col-lg-4 mb-4" key={req._id}>
                  
                  <div
                    style={{
                      background: "white",
                      borderRadius: "18px",
                      padding: "18px",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      border: "1px solid #eee",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0px)")
                    }
                  >
                    
                    
                    <h5 style={{ fontWeight: "700", marginBottom: "10px" }}>
                       {req.ngoName}
                    </h5>

                    
                    <div style={{ marginBottom: "10px" }}>
                      <span
                        style={{
                          background: "#e8f5e9",
                          color: "#198754",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          marginRight: "6px",
                          fontWeight: "500",
                        }}
                      >
                         {req.quantity} People
                      </span>

                      <span
                        style={{
                          background: "#fff3e0",
                          color: "#ef6c00",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                        }}
                      >
                         Need Food
                      </span>
                    </div>

                    {/* ADDRESS */}
                    <p style={{ fontSize: "14px", marginBottom: "5px", color: "#555" }}>
                      <b>Address:</b> {req.address}
                    </p>

                    
                    <p style={{ fontSize: "14px", marginBottom: "15px", color: "#555" }}>
                      <b>Contact:</b>{" "}
                      {req.contact || req.phone || req.mobile || "Not Available"}
                    </p>

                  
                    <a
                      href={`tel:${req.contact || req.phone || req.mobile}`}
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: "#198754",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px",
                        fontWeight: "600",
                        textDecoration: "none",
                      }}
                    >
                      Donate / Call Now
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: "center", width: "100%", marginTop: "40px" }}>
              <h5> No active food requests right now</h5>
              <p style={{ color: "#777" }}>Check back later</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}