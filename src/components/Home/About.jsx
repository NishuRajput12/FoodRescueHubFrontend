import React from "react";
import NgoHelping from "../../assets/NgoHelping.jpg";
import charityfooddrive from "../../assets/carousel-1.png";


export default function About({ setCurrentPage, user }) {
  
  const handleJoinNow = () => {
    if (!user) {
      setCurrentPage("register");
    } else {
     
      user.role === "Donor" ? setCurrentPage("donate") : setCurrentPage("available");
    }
  };

  return (
    <>
      
      <section className="py-5 bg-light" id="About">
        <div className="container">
          <h2 className="mb-4 text-center text-success fw-bold">About Us</h2>
          <div className="row align-items-center">
            <div className="col-md-7 text-center mb-4 mb-md-0 about-img">
              <img
                src={NgoHelping}
                alt="Volunteers helping distribute food"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-5 About-text">
              <p>
              Every day, large amounts of food are wasted while many people go hungry.
                This imbalance between food wastage and hunger inspired the creation of
                <strong> Food Rescue Hub</strong> — a digital platform designed to connect
                food donors with NGOs and volunteers who can help distribute surplus food
                to those in need.
              </p>
              <p className="mt-3 About-text2">
              Food Rescue Hub serves as a centralized hub that connects restaurants, grocery stores, bakeries, and households with surplus food to NGOs, community kitchens, and volunteers who are ready to distribute it to underprivileged communities. The platform leverages technology to streamline the process of food donation, ensuring that surplus food reaches hungry individuals quickly, safely, and efficiently.
              </p>
              
            
              <button 
                className="btn btn-success mt-3"
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 About-text mb-4 mb-md-0">
              <h4 className="fw-bold text-success mb-3">Our Mission</h4>
              <p className="mt-3">
              Food Rescue Hub provides an efficient and transparent system to manage food donations,
                ensuring that edible food is not wasted but reaches the right hands at the right time.
                By leveraging technology, the platform promotes community collaboration and contributes
                toward building a sustainable, hunger-free society.
              </p>
              <ul className="About-text2">
                <li>To minimize food wastage through organized collection.</li>
                <li>To connect donors and NGOs on a single platform.</li>
                <li>To ensure timely and safe delivery of surplus food.</li>
                <li>To raise awareness about food sustainability.</li>
              </ul>
              
              
              <button 
                className="btn btn-success mt-3"
                onClick={handleJoinNow}
                
              >
                Join Now
              </button>
            </div>
            <div className="col-md-5 text-center about-img">
              <img
                src={charityfooddrive}
                alt="Charity food drive"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}