import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Fast Pickup",
      desc: "On our platform, as soon as food is posted, nearby NGOs receive an alert so that the food can be picked up before it gets spoiled.",
      icon:  <i className="fas fa-truck"style={{ color: "#008049" }}></i>,
      color: "#e8f5e9"
    },
    {
      title: "Real-time Tracking",
      desc: "Donors and NGOs can view each other’s locations on the map, making coordination easier.",
      icon: <i className="fa-solid fa-location-dot" style={{ color: "#008049" }}></i>,
      color: "#f1f8e9"
    },
    {
      title: "Zero Waste Goal",
      desc: "Our mission is to ensure that leftover food from any function or hotel does not go to waste, but instead reaches someone in need.",
      icon: <i className="fa-solid fa-recycle"style={{ color: "#008049" }}></i>,
      color: "#f1f8e9"
    }
  ];

  return (
    <section className="py-5 bg-white" id="services">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">
          Our <span className="text-success">Services</span>
        </h2>

        <div className="row g-4">
          {services.map((ser, index) => (
            <div className="col-md-4" key={index}>
              <div 
                className="card h-100 border-0 shadow-sm p-4 text-center service-card"
                style={{ backgroundColor: ser.color, transition: '0.3s' }}
              >
                <div className="display-4 mb-3">{ser.icon}</div>
                <h4 className="fw-bold">{ser.title}</h4>
                <p className="text-muted">{ser.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }
        `}
      </style>
    </section>
  );
};

export default Services;