import React from "react";

const Contact = () => {
  return (
    <>
      <style>{`
        .contact-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px 20px;
          gap: 30px;
          flex-wrap: wrap;
          background: #f9f9f9;
        }

        .contact-info, .contact-form {
          flex: 1;
          min-width: 300px;
          max-width: 500px;
        }

        .contact-info h2 {
          color: rgb(0, 128, 73);
          font-size: 32px;
          margin-bottom: 10px;
        }

        .contact-info h4 {
          margin-top: 20px;
          font-size: 18px;
          color: #333;
        }

        .contact-info p,
        .contact-info ul li {
          font-size: 15px;
          color: #555;
          line-height: 1.6;
        }

        .contact-info ul {
          padding-left: 18px;
        }

        .contact-info i {
          font-size: 30px;
          color: rgb(0, 128, 73);
          margin-top: 15px;
          display: inline-block;
        }

        .contact-form {
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
        }

        .contact-form h3 {
          margin-bottom: 15px;
          color: #333;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          outline: none;
          transition: 0.3s;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: rgb(0, 128, 73);
          box-shadow: 0 0 5px rgba(0, 128, 73, 0.3);
        }

        .contact-form textarea {
          height: 120px;
          resize: none;
        }

        .contact-form button {
          width: 100%;
          padding: 12px;
          background: rgb(0, 128, 73);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }

        .contact-form button:hover {
          background: rgb(0, 110, 63);
        }

        @media (max-width: 768px) {
          .contact-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            Have any questions? We’re here to help you connect food donors<br />
            with NGOs and volunteers.
          </p>

          <h4>Email</h4>
          <p>foodrescuehelp@gmail.com</p>

          <h4>Phone</h4>
          <p>+91 98765 43210</p>

          <h4>Support</h4>
          <ul>
            <li>NGO Registration Help</li>
            <li>Donor Queries</li>
            <li>Food Pickup Issues</li>
            <li>Volunteer Support</li>
          </ul>

          <h4> <i className="fa-solid fa-location-dot"></i> Address</h4>
          <p>Food Rescue Hub, Bijnor, Uttar Pradesh, India</p>


        </div>

        {/* RIGHT */}
        <div className="contact-form">
          <h3>Get in Touch</h3>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone Number" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>

      </div>
    </>
  );
};

export default Contact;