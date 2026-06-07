import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [claims, setClaims] = useState([]);
  const [newFood, setNewFood] = useState({ title: '', qty: 1, expiryTime: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.role === 'NGO' || user?.role === 'ADMIN') {
      fetchAvailableFoods();
      if (user?.role === 'NGO') fetchMyClaims();
    } else if (user?.role === 'RESTAURANT' || user?.role === 'HOTEL') {
      fetchMyFoods();
    }
  }, [user]);

  const fetchAvailableFoods = async () => {
    try {
      const res = await api.get('/food');
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyFoods = async () => {
    try {
      const res = await api.get('/food/my-listings');
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyClaims = async () => {
    try {
      const res = await api.get('/claims');
      setClaims(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredFoods = useMemo(() => foods, [foods]);
  const filteredClaims = useMemo(() => claims, [claims]);

  const handleRefresh = () => {
    setMessage('Refreshing data...');
    if (user?.role === 'NGO' || user?.role === 'ADMIN') {
      fetchAvailableFoods();
      if (user?.role === 'NGO') fetchMyClaims();
    } else {
      fetchMyFoods();
    }
    setTimeout(() => setMessage('Data refreshed successfully.'), 600);
  };

  const handlePostFood = async (e) => {
    e.preventDefault();
    try {
      await api.post('/food', newFood);
      setNewFood({ title: '', qty: 1, expiryTime: '' });
      fetchMyFoods();
      setMessage('Food posted successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Unable to post food.');
    }
  };

  const handleClaim = async (foodId) => {
    try {
      await api.post(`/claims/${foodId}`);
      fetchAvailableFoods();
      fetchMyClaims();
      setMessage('Claim submitted successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Unable to claim this food item.');
    }
  };

  const handleCollect = async (claimId) => {
    try {
      await api.put(`/claims/${claimId}/collect`);
      fetchMyClaims();
      setMessage('Claim marked as collected.');
    } catch (err) {
      console.error(err);
      setMessage('Unable to update claim status.');
    }
  };

  const handleDelete = async (foodId) => {
    try {
      await api.delete(`/food/${foodId}`);
      if (user?.role === 'NGO' || user?.role === 'ADMIN') {
        fetchAvailableFoods();
      } else {
        fetchMyFoods();
      }
      setMessage('Listing removed successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Unable to remove listing.');
    }
  };

  if (!user) return <div className="text-center mt-4">Please log in to view your dashboard.</div>;

  return (
    <div className="mt-4">
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h2 className="mb-2">Welcome back{user.name ? `, ${user.name}` : ''}</h2>
            <p className="text-muted">Your personalized dashboard for managing food sharing and impact.</p>
          </div>
          <div className="action-row">
            <button onClick={handleRefresh} className="btn btn-secondary">Refresh Data</button>
          </div>
        </div>

        {message && <div className="badge badge-info" style={{ marginTop: '1rem', display: 'inline-block' }}>{message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="card p-4 text-center">
            <h3>{filteredFoods.length}</h3>
            <p className="text-muted">Active food {user.role === 'NGO' ? 'options' : 'listings'}</p>
          </div>
          {user.role === 'NGO' && (
            <div className="card p-4 text-center">
              <h3>{filteredClaims.length}</h3>
              <p className="text-muted">Visible claims</p>
            </div>
          )}
        </div>
      </div>


      {user.role === 'NGO' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>Available Food to Claim</h3>
            <div className="grid grid-cols-1 mt-4">
              {filteredFoods.length === 0 ? (
                <div className="card p-4 text-center text-muted">No matching food listings found. Try a different search term or refresh.</div>
              ) : filteredFoods.map((f) => (
                <div key={f.id} className="card p-4">
                  <h4>{f.title} (Qty: {f.qty})</h4>
                  <p className="text-muted">Posted by: {f.postedByName}</p>
                  <p className="text-muted">Expires: {new Date(f.expiryTime).toLocaleString()}</p>
                  <button onClick={() => handleClaim(f.id)} className="btn btn-primary mt-4">Claim Food</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>My Claims</h3>
            <div className="grid grid-cols-1 mt-4">
              {filteredClaims.length === 0 ? (
                <div className="card p-4 text-center text-muted">No claims are available yet. Claim food to see status updates here.</div>
              ) : filteredClaims.map((c) => (
                <div key={c.id} className="card p-4">
                  <h4>{c.foodTitle}</h4>
                  <p>Status: <span className={`badge badge-${c.status === 'COLLECTED' ? 'success' : 'warning'}`}>{c.status}</span></p>
                  {c.status === 'PENDING' && (
                    <button onClick={() => handleCollect(c.id)} className="btn btn-secondary mt-4">Mark Collected</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(user.role === 'RESTAURANT' || user.role === 'HOTEL') && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>Post New Surplus Food</h3>
            <form onSubmit={handlePostFood} className="card p-4 mt-4">
              <div className="form-group">
                <label className="form-label">Food Title</label>
                <input type="text" className="form-input" required value={newFood.title} onChange={(e) => setNewFood({ ...newFood, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="number" min="1" className="form-input" required value={newFood.qty} onChange={(e) => setNewFood({ ...newFood, qty: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Expiry Time</label>
                <input type="datetime-local" className="form-input" required value={newFood.expiryTime} onChange={(e) => setNewFood({ ...newFood, expiryTime: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary">Post Food</button>
            </form>
          </div>

          <div>
            <h3>My Food Listings</h3>
            <div className="grid grid-cols-1 mt-4">
              {filteredFoods.length === 0 ? (
                <div className="card p-4 text-center text-muted">No listings found. Post new food or refresh to update the board.</div>
              ) : filteredFoods.map((f) => (
                <div key={f.id} className="card p-4">
                  <h4>{f.title} (Qty: {f.qty})</h4>
                  <p>Status: <span className="badge badge-info">{f.status}</span></p>
                  <p className="text-muted">Expires: {new Date(f.expiryTime).toLocaleString()}</p>
                  <button onClick={() => handleDelete(f.id)} className="btn btn-danger mt-4">Remove Listing</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {user.role === 'ADMIN' && (
        <div className="grid grid-cols-1 gap-4">
          <div className="card p-4">
            <h3 className="text-gradient">Admin Panel - Listings Overview</h3>
            <p className="text-muted">Manage all food listings across the platform.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredFoods.length === 0 ? (
              <div className="card p-4 text-center text-muted">No listings are available at this time.</div>
            ) : filteredFoods.map((f) => (
              <div key={f.id} className="card p-4">
                <h4>{f.title} (Qty: {f.qty})</h4>
                <p className="text-muted mt-2">Posted by: {f.postedByName}</p>
                <p className="text-muted mb-2">Status: <span className="badge badge-info">{f.status}</span></p>
                <button onClick={() => handleDelete(f.id)} className="btn btn-danger mt-4" style={{ width: '100%' }}>Delete Listing</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
