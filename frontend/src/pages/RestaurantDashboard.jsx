import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import CountdownTimer from '../components/CountdownTimer';

function RestaurantDashboard() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [newFood, setNewFood] = useState({ title: '', qty: 1, expiryTime: '', category: 'VEG' });
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('info');

  const filteredFoods = foods
    .filter(f => {
      if (filterStatus === 'ALL') return true;
      const isExpired = new Date(f.expiryTime) <= new Date() && f.status === 'AVAILABLE';
      const effectiveStatus = isExpired ? 'EXPIRED' : f.status;
      return effectiveStatus === filterStatus;
    })
    .sort((a, b) => b.id - a.id);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const paginatedFoods = filteredFoods.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (user?.role === 'RESTAURANT' || user?.role === 'HOTEL') {
      fetchMyFoods();
    }
  }, [user]);

  const fetchMyFoods = async () => {
    try {
      const res = await api.get('/food/my-listings');
      setFoods(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  const showMsg = (text, type = 'info') => {
    setMessage(text);
    setMsgType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleRefresh = () => {
    showMsg('Refreshing food listings...', 'info');
    fetchMyFoods();
    setTimeout(() => showMsg('Data refreshed successfully.', 'success'), 600);
  };

  const handlePostFood = async (e) => {
    e.preventDefault();
    try {
      await api.post('/food', newFood);
      setNewFood({ title: '', qty: 1, expiryTime: '', category: 'VEG' });
      fetchMyFoods();
      showMsg('Food posted successfully.', 'success');
    } catch (err) {
      console.error(err);
      showMsg('Unable to post food.', 'error');
    }
  };

  const handleDelete = async (foodId) => {
    try {
      await api.delete(`/food/${foodId}`);
      fetchMyFoods();
      showMsg('Listing removed successfully.', 'success');
    } catch (err) {
      console.error(err);
      showMsg('Unable to remove listing.', 'error');
    }
  };

  if (!user) return (
    <div className="container py-5 text-center">
      <i className="bi bi-lock" style={{ fontSize: '3rem', color: '#e8732a', opacity: 0.5, display: 'block', marginBottom: '1rem' }}></i>
      <p>Please log in to view your dashboard.</p>
    </div>
  );

  const msgClass = msgType === 'success' ? 'fb-alert-success' : msgType === 'error' ? 'fb-alert-error' : 'fb-alert-info';

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="fb-dashboard-header d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.75, marginBottom: '0.3rem' }}>
            <i className="bi bi-building me-1"></i>{user.role} Dashboard
          </div>
          <h2 className="mb-1">Welcome back{user.name ? `, ${user.name}` : ''} 👋</h2>
          <p style={{ opacity: 0.82, margin: 0, fontSize: '0.95rem' }}>Manage your restaurant listings and keep surplus food available to NGOs.</p>
        </div>
        <button onClick={handleRefresh} className="btn-fb-outline" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          <i className="bi bi-arrow-clockwise"></i>Refresh
        </button>
      </div>

      {message && (
        <div className={`fb-alert ${msgClass} mb-4`}>
          <i className={`bi ${msgType === 'success' ? 'bi-check-circle-fill' : msgType === 'error' ? 'bi-x-circle-fill' : 'bi-info-circle-fill'}`}></i>
          {message}
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="fb-stat-card">
            <div className="stat-number">{foods.length}</div>
            <div className="stat-label">Total Listings</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fb-stat-card">
            <div className="stat-number" style={{ fontSize: '1.4rem' }}>{user.role}</div>
            <div className="stat-label">Your Role</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Post Form */}
        <div className="col-lg-5">
          <h5 style={{ fontFamily: 'Nunito', fontWeight: 800, marginBottom: '1rem', color: '#1a1a2e' }}>
            <i className="bi bi-plus-circle-fill me-2" style={{ color: '#e8732a' }}></i>Post New Surplus Food
          </h5>
          <div className="fb-post-form">
            <form onSubmit={handlePostFood}>
              <div className="mb-3">
                <label className="fb-form-label">Food Title</label>
                <input
                  type="text"
                  className="fb-form-control"
                  required
                  placeholder="e.g., Rice and Dal, Bread loaves..."
                  value={newFood.title}
                  onChange={(e) => setNewFood({ ...newFood, title: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="fb-form-label">Quantity (servings)</label>
                <input
                  type="number"
                  min="1"
                  className="fb-form-control"
                  required
                  value={newFood.qty}
                  onChange={(e) => setNewFood({ ...newFood, qty: Number(e.target.value) })}
                />
              </div>
              <div className="mb-3">
                <label className="fb-form-label">Category</label>
                <select
                  className="fb-form-control"
                  required
                  value={newFood.category}
                  onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                >
                  <option value="VEG">Vegetarian</option>
                  <option value="NON_VEG">Non-Vegetarian</option>
                  <option value="DAIRY">Dairy</option>
                  <option value="BAKERY">Bakery</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="fb-form-label">Expiry Date & Time</label>
                <input
                  type="datetime-local"
                  className="fb-form-control"
                  required
                  value={newFood.expiryTime}
                  onChange={(e) => setNewFood({ ...newFood, expiryTime: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-fb-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', borderRadius: '12px', fontSize: '0.95rem' }}>
                <i className="bi bi-send-fill"></i> Post Food Listing
              </button>
            </form>
          </div>
        </div>

        {/* Listings */}
        <div className="col-lg-7">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 style={{ fontFamily: 'Nunito', fontWeight: 800, margin: 0, color: '#1a1a2e' }}>
              <i className="bi bi-list-ul me-2" style={{ color: '#2a9d8f' }}></i>
              My Food Listings
              <span className="fb-badge fb-badge-primary ms-2">{filteredFoods.length}</span>
            </h5>
            <select 
              className="form-select form-select-sm w-auto shadow-sm" 
              style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            >
              <option value="ALL">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="CLAIMED">Claimed</option>
              <option value="COLLECTED">Collected</option>
              <option value="EXPIRED">Expired</option>
            </select>
          </div>
          {filteredFoods.length === 0 ? (
            <div className="fb-empty-state fb-card" style={{ padding: '3rem' }}>
              <i className="bi bi-inbox"></i>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>No listings found</p>
              <p style={{ fontSize: '0.88rem' }}>{foods.length === 0 ? 'Post new food to see it appear here.' : 'Try changing your filter.'}</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {paginatedFoods.map((f) => (
                <div key={f.id} className="fb-food-card">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <h5 className="mb-1">{f.title}</h5>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span className="fb-badge fb-badge-primary">
                          <i className="bi bi-bag-fill me-1"></i>Qty: {f.qty}
                        </span>
                        <span className="fb-badge" style={{ backgroundColor: '#6c757d', color: '#fff' }}>
                          <i className="bi bi-tag-fill me-1"></i>{f.category}
                        </span>
                        <span className={`fb-badge ${f.status === 'AVAILABLE' ? 'fb-badge-success' : 'fb-badge-warning'}`}>
                          {f.status}
                        </span>
                      </div>
                      {f.status !== 'COLLECTED' && (
                        <div style={{ marginTop: '0.6rem' }}>
                          <CountdownTimer expiryTime={f.expiryTime} />
                        </div>
                      )}
                    </div>
                    <button onClick={() => handleDelete(f.id)} className="btn-fb-danger flex-shrink-0" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}>
                      <i className="bi bi-trash3"></i>Remove
                    </button>
                  </div>
                </div>
              ))}

              {totalPages > 1 && (
                <nav aria-label="Food listings pagination" className="mt-3">
                  <ul className="pagination justify-content-center mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" style={{ color: currentPage === 1 ? '#6c757d' : '#2a9d8f' }} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          style={currentPage === page ? { backgroundColor: '#2a9d8f', borderColor: '#2a9d8f', color: '#fff' } : { color: '#2a9d8f' }}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" style={{ color: currentPage === totalPages ? '#6c757d' : '#2a9d8f' }} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDashboard;
