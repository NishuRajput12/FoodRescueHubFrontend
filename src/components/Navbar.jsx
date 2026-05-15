import React from 'react';
import LogoImage from '../assets/earthLogo.jpg';

export default function Navbar({ setCurrentPage, user, onLogout }) {

  const getRandomColor = (name) => {
    const colors = ["#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#009688", "#4CAF50", "#FF5722", "#FFC107"];
    const index = name ? name.length % colors.length : 0;
    return colors[index];
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white px-4 sticky-top shadow-sm">
      <div className="container-fluid">
        <button className="navbar-brand btn fw-bold text-white fs-4" onClick={() => setCurrentPage("home")}>
          <img src={LogoImage} alt="Food Rescue Logo" style={{ height: "45px" }} />
        </button>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3 align-items-center">
            
           
            <li className="nav-item">
              <button className="nav-link btn fw-bold text-success" onClick={() => setCurrentPage("home")}>Home</button>
            </li>

            
            {user?.role === 'Donor' && (
              <>
                <li className="nav-item">
                  <button className="nav-link btn fw-bold text-success" onClick={() => setCurrentPage("donate")}>Donate Food</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn fw-bold text-warning" onClick={() => setCurrentPage("urgent")}>NGO Requests</button>
                </li>
              </>
            )}

           
            {user?.role === 'NGO' && (
              <>
                <li className="nav-item">
                  <button className="nav-link btn fw-bold text-success" onClick={() => setCurrentPage("request")}>Post Request</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn fw-bold text-success" onClick={() => setCurrentPage("available")}>Available Food</button>
                </li>
              </>
            )}

         
            {!user ? (
              <li className="nav-item d-flex align-items-center bg-white rounded-pill px-3 py-1">
                <button className="nav-link btn p-0 text-success fw-bold" onClick={() => setCurrentPage("login")}>Login</button>
                <span className="mx-2 text-success">/</span>
                <button className="nav-link btn p-0 text-success fw-bold" onClick={() => setCurrentPage("register")}>Register</button>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <div
                  className="dropdown-toggle d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    backgroundColor: getRandomColor(user?.name), color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', border: '2px solid white'
                  }}>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </div>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li className="dropdown-item-text fw-bold border-bottom pb-2">
                    Hi, {user?.name} <br/>
                    <small className="text-muted" style={{fontSize: '10px'}}>{user?.role}</small>
                  </li>
                  <li><button className="dropdown-item" onClick={() => setCurrentPage("profile")}>My Profile</button></li>
                  <li><button className="dropdown-item text-danger" onClick={onLogout}>Logout</button></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}