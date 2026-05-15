import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home/Home.jsx';
import About from './components/Home/About.jsx';
import Contact from './components/Home/Contact.jsx';
import Services from "./components/Home/Services.jsx";
import DonateForm from './components/Donate/DonateForm';
import RequestForm from './components/Request/RequestForm';
import AuthPage from './components/Auth/AuthPage.jsx';
import Footer from "./components/Footer.jsx";
import Profile from './components/Profile.jsx';
import AvailableFood from './components/Request/AvailableFood';
import NgoRequests from './components/Request/NgoRequests'



function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [flashMessage, setFlashMessage] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser && loggedInUser !== "undefined") {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

 
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    setUser(null);
    setFlashMessage("Successfully Logged Out! ");
    setCurrentPage("login");
    setTimeout(() => setFlashMessage(""), 3000);
  };

  const navigateTo = (page) => {
    const publicPages = ["home", "login", "register"];
    if (!publicPages.includes(page) && !user) {
      setCurrentPage("login");
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Navbar setCurrentPage={navigateTo} user={user} onLogout={handleLogout} />

      {flashMessage && (
        <div className="alert alert-success text-center mx-auto mt-3" style={{ maxWidth: "500px", borderRadius: "10px" }}>
          {flashMessage}
        </div>
      )}

      
      {currentPage === "home" && (
        <>
          <Home setCurrentPage={navigateTo} user={user} /> 
          <About setCurrentPage={navigateTo} user={user} />
          <Services />
          <Contact />
          <Footer />
        </>
      )}

      
      {currentPage === "donate" && (user?.role === "Donor" ? <DonateForm /> : <Home />)}
      {currentPage === "urgent" && (user?.role === "Donor" ? <NgoRequests /> : <Home />)}

    
      {currentPage === "request" && (user?.role === "NGO" ? <RequestForm /> : <Home />)}
      {currentPage === "available" && (user?.role === "NGO" ? <AvailableFood /> : <Home />)}

     
      {currentPage === "profile" && (user ? <Profile /> : <Home />)}
      {currentPage === "login" && <AuthPage initialMode="login" onLoginSuccess={handleLoginSuccess} />}
      {currentPage === "register" && <AuthPage initialMode="register" />}

    
    </>
  );
}

export default App;