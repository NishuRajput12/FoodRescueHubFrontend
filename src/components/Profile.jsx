import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const endpoint = user.role === 'Donor' 
          ? 'http://localhost:8000/api/food/my-donations' 
          : 'http://localhost:8000/api/food/my-accepted-food';
        
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setHistory(user.role === 'Donor' ? res.data.donations : res.data.accepted);
      } catch (err) {
        console.error("History fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchHistory();
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); 

    return () => clearInterval(timer);
  }, []);

  const checkExpiry = (createdAt) => {
    const postTime = new Date(createdAt).getTime();
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    return (currentTime - postTime) > threeHoursInMs;
  };

  if (!user) return <div className="text-center mt-5">Please login to view profile.</div>;

  const styles = {
    card: { maxWidth: '800px', margin: '30px auto', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', backgroundColor: '#fff' },
    avatar: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgb(0, 128, 73)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold', margin: '0 auto 15px' },
    infoBox: { padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '10px', marginBottom: '10px' },
    label: { fontSize: '14px', color: '#6c757d', fontWeight: '500', display: 'block', marginBottom: '2px' },
    value: { fontSize: '16px', color: '#333', fontWeight: '600' },
    badge: { backgroundColor: 'rgba(0, 128, 73, 0.1)', color: 'rgb(0, 128, 73)', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }
  };

  return (
    <div className="container pb-5">
      {/* User Basic Info */}
      <div style={styles.card}>
        <div style={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
        <h3 className="text-center mb-1 fw-bold">{user.name}</h3>
        <p className="text-center mb-4"><span style={styles.badge}>{user.role}</span></p>

        <div className="row g-3">
          <div className="col-md-6">
            <div style={styles.infoBox}>
              <span style={styles.label}>Email:</span>
              <span style={styles.value}>{user.email}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div style={styles.infoBox}>
              <span style={styles.label}>Phone:</span>
              <span style={styles.value}>{user.phone || user.phoneNumber || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div className="mt-4 mx-auto" style={{maxWidth: '800px'}}>
        <h4 className="fw-bold mb-3 px-2">
            {user.role === 'Donor' ? " My Donations" : " Foods I Accepted"}
        </h4>
        
        {loading ? (
            <p className="text-center mt-4">Loading history...</p>
        ) : history.length > 0 ? (
            <div className="row mx-0">
                {history.map((item) => {
                    const isExpired = item.status === 'Available' && checkExpiry(item.createdAt);
                    
                    let badgeClass = "bg-success"; 
                    let statusText = item.status;

                    if (item.status === 'Accepted') {
                        badgeClass = "bg-primary";
                    } else if (isExpired) {
                        badgeClass = "bg-danger";
                        statusText = "Expired";
                    }

                    return (
                        <div className="col-12 mb-3 px-2" key={item._id}>
                            <div className="card border-0 shadow-sm p-3" style={{borderRadius: '15px'}}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fw-bold mb-1 text-success">{item.foodName}</h6>
                                        <small className="text-muted">Qty: {item.quantity} | {item.address}</small>
                                        <br/>
                                        <small className="text-muted" style={{fontSize: '11px'}}>
                                            {new Date(item.createdAt).toLocaleString()}
                                        </small>
                                    </div>
                                    <span className={`badge ${badgeClass} px-3 py-2`} style={{borderRadius: '10px'}}>
                                        {statusText}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="text-center p-5 bg-light rounded-3 shadow-sm mt-3">
                <p className="text-muted mb-0">No activity found yet.</p>
            </div>
        )}
      </div>
    </div>
  );
}