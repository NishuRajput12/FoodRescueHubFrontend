import React from 'react';
import bgImage from '../../assets/restaurant food wast.jpg';


export default function Home({ setCurrentPage, user }) {
  
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',             
    flexDirection: 'column',     
    justifyContent: 'center',   
    alignItems: 'center',      
    color: 'white',    
  };

  return (
    <div style={sectionStyle} id='Home'>
      <h1 className="fw-bold display-4">Welcome to Food Rescue Hub</h1>
      <p className="mt-3 fs-5 px-3" style={{ maxWidth: '700px' }}>
        A platform to connect food donors with NGOs to reduce food wastage. 
        Start your journey with us today!
      </p>

      <div className="d-flex gap-3 mt-4">
       
        <button
          className="btn btn-success mt-3"
          style={{  fontWeight: '600' }}
          onClick={() => {
            if (!user) {
              setCurrentPage("register");
            } else {
              user.role === 'Donor' ? setCurrentPage("donate") : setCurrentPage("available");
            }
          }}
        >
          Get Started
        </button>

       
      </div>
    </div>
  );
}