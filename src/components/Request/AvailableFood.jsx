import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AvailableFood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Expiry Check Function
  const checkExpiry = (createdAt) => {
    const createdTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();

    // Example: 4 hours ke baad expire
    const expiryLimit = 4 * 60 * 60 * 1000;

    return currentTime - createdTime > expiryLimit;
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('https://food-rescue-hub-backend.vercel.app/api/food/available');
        setFoods(response.data.foods);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching food:", err);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleAccept = async (foodId) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.put(
        `https://food-rescue-hub-backend.vercel.app/api/food/accept/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setFoods(foods.filter(food => food._id !== foodId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return <div className="text-center mt-5">Loading available food...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary">Available Food Donations</h3>

      <div className="row">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div className="col-md-4 mb-4" key={food._id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  
                  <h5 className="card-title text-success">
                    {food.foodName}
                  </h5>

                  <p className="mb-1">
                    <strong>Type:</strong> {food.foodType}
                  </p>

                  <p className="mb-1">
                    <strong>Qty:</strong> {food.quantity}
                  </p>

                  <p className="mb-1">
                    <strong>Location:</strong> {food.address}
                  </p>

                  <p className="mb-3 text-muted small">
                    <strong>Expires:</strong> {food.expiryTime}
                  </p>

                
                  <div className="mt-3">
                    {checkExpiry(food.createdAt) ? (
                      <div
                        className="alert alert-danger text-center fw-bold py-2 m-0"
                        style={{ borderRadius: '10px' }}
                      >
                         Expired
                      </div>
                    ) : (
                      <button
                        className="btn btn-success w-100 fw-bold py-2"
                        style={{ borderRadius: '10px' }}
                        onClick={() => handleAccept(food._id)}
                      >
                        Accept Donation
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <h5>No food available right now. Check back later!</h5>
          </div>
        )}
      </div>
    </div>
  );
}