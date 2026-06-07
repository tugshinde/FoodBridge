import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
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

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const paginatedFoods = filteredFoods.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchAvailableFoods();
    }
  }, [user]);

  const fetchAvailableFoods = async () => {
    try {
      const res = await api.get('/food');
      setFoods(res.data);
      setCurrentPage(1);
    } catch (err) { console.error(err); }
  };

  const showMsg = (text, type = 'info') => {
    setMessage(text); setMsgType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleRefresh = () => {
    showMsg('Refreshing admin dashboard...', 'info');
    fetchAvailableFoods();
    setTimeout(() => showMsg('Data refreshed successfully.', 'success'), 600);
  };

  const handleDelete = async (foodId) => {
    try {
      await api.delete(`/food/${foodId}`);
      fetchAvailableFoods();
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
  const available = foods.filter(f => f.status === 'AVAILABLE').length;

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="fb-dashboard-header d-flex justify-content-between align-items-start flex-wrap gap-3" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: '0.3rem' }}>
            <i className="bi bi-shield-lock-fill me-1"></i>Admin Dashboard
          </div>
          <h2 className="mb-1">Platform Overview</h2>
          <p style={{ opacity: 0.75, margin: 0, fontSize: '0.95rem' }}>Review all food listings and manage platform content.</p>
        </div>
        <button onClick={handleRefresh} className="btn-fb-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
          <i className="bi bi-arrow-clockwise"></i>Refresh
        </button>
      </div>

      {message && (
        <div className={`fb-alert ${msgClass} mb-4`}>
          <i className={`bi ${msgType === 'success' ? 'bi-check-circle-fill' : msgType === 'error' ? 'bi-x-circle-fill' : 'bi-info-circle-fill'}`}></i>
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="fb-stat-card">
            <div className="stat-number">{foods.length}</div>
            <div className="stat-label">Total Listings</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fb-stat-card" style={{ background: 'linear-gradient(135deg, #fff 60%, #d1fae5)' }}>
            <div className="stat-number" style={{ color: '#2a9d8f' }}>{available}</div>
            <div className="stat-label">Available</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fb-stat-card" style={{ background: 'linear-gradient(135deg, #fff 60%, #fef3c7)' }}>
            <div className="stat-number" style={{ color: '#f4a261' }}>{foods.length - available}</div>
            <div className="stat-label">Claimed</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fb-stat-card" style={{ background: 'linear-gradient(135deg, #fff 60%, #fde8d8)' }}>
            <div className="stat-number" style={{ fontSize: '1.3rem' }}>{user.role}</div>
            <div className="stat-label">Your Role</div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 style={{ fontFamily: 'Nunito', fontWeight: 800, margin: 0, color: '#1a1a2e' }}>
            <i className="bi bi-grid-3x3-gap-fill me-2" style={{ color: '#e8732a' }}></i>
            All Food Listings
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
            <p style={{ fontWeight: 600 }}>No listings found</p>
            <p style={{ fontSize: '0.88rem' }}>{foods.length === 0 ? 'No food listings are present at this time.' : 'Try changing your filter.'}</p>
          </div>
        ) : (
          <>
            <div className="row g-3">
              {paginatedFoods.map((f) => (
                <div className="col-md-6 col-lg-4" key={f.id}>
                  <div className="fb-food-card h-100 d-flex flex-column">
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="mb-0" style={{ fontSize: '1rem' }}>{f.title}</h5>
                        <span className={`fb-badge flex-shrink-0 ms-2 ${f.status === 'AVAILABLE' ? 'fb-badge-success' : 'fb-badge-warning'}`}>
                          {f.status}
                        </span>
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '0.83rem', margin: '0.3rem 0' }}>
                        <i className="bi bi-person me-1"></i>{f.postedByName}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '0.83rem', margin: '0.3rem 0' }}>
                        <i className="bi bi-bag me-1"></i>Qty: {f.qty}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '0.83rem', margin: '0.3rem 0' }}>
                        <i className="bi bi-clock me-1"></i>{new Date(f.expiryTime).toLocaleString()}
                      </p>
                    </div>
                    <button onClick={() => handleDelete(f.id)} className="btn-fb-danger mt-3" style={{ width: '100%', justifyContent: 'center', padding: '0.5rem', fontSize: '0.88rem', borderRadius: '10px' }}>
                      <i className="bi bi-trash3-fill"></i>Delete Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <nav aria-label="Food listings pagination" className="mt-4">
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
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
