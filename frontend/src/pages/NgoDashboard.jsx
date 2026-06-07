import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import CountdownTimer from '../components/CountdownTimer';

function NgoDashboard() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [claims, setClaims] = useState([]);
  const [currentFoodPage, setCurrentFoodPage] = useState(1);
  const [filterClaimStatus, setFilterClaimStatus] = useState('ALL');
  const [currentClaimPage, setCurrentClaimPage] = useState(1);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [sortQty, setSortQty] = useState('');
  const [sortExpiry, setSortExpiry] = useState('');

  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('info');

  useEffect(() => {
    if (user?.role === 'NGO') {
      fetchAvailableFoods();
      fetchMyClaims();
    }
  }, [user]);

  let processedFoods = [...foods].filter(f => 
    (filterCategory === 'ALL' || f.category === filterCategory) &&
    (searchQuery === '' || f.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (sortQty === 'high') processedFoods.sort((a, b) => b.qty - a.qty);
  else if (sortQty === 'low') processedFoods.sort((a, b) => a.qty - b.qty);
  else if (sortExpiry === 'soon') processedFoods.sort((a, b) => new Date(a.expiryTime) - new Date(b.expiryTime));
  else if (sortExpiry === 'late') processedFoods.sort((a, b) => new Date(b.expiryTime) - new Date(a.expiryTime));
  else processedFoods.sort((a, b) => b.id - a.id);

  const foodsPerPage = 5;
  const totalFoodPages = Math.ceil(processedFoods.length / foodsPerPage);
  const paginatedFoods = processedFoods.slice((currentFoodPage - 1) * foodsPerPage, currentFoodPage * foodsPerPage);

  const filteredClaims = claims
    .filter(c => filterClaimStatus === 'ALL' || c.status === filterClaimStatus)
    .sort((a, b) => b.id - a.id);
  const claimsPerPage = 5;
  const totalClaimPages = Math.ceil(filteredClaims.length / claimsPerPage);
  const paginatedClaims = filteredClaims.slice((currentClaimPage - 1) * claimsPerPage, currentClaimPage * claimsPerPage);

  const fetchAvailableFoods = async () => {
    try {
      const res = await api.get('/food');
      setFoods(res.data);
      setCurrentFoodPage(1);
    } catch (err) { console.error(err); }
  };

  const fetchMyClaims = async () => {
    try {
      const res = await api.get('/claims');
      setClaims(res.data);
      setCurrentClaimPage(1);
    } catch (err) { console.error(err); }
  };

  const showMsg = (text, type = 'info') => {
    setMessage(text); setMsgType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleRefresh = () => {
    showMsg('Refreshing data...', 'info');
    fetchAvailableFoods(); fetchMyClaims();
    setTimeout(() => showMsg('Data refreshed successfully.', 'success'), 600);
  };

  const handleClaim = async (foodId) => {
    try {
      await api.post(`/claims/${foodId}`);
      fetchAvailableFoods(); fetchMyClaims();
      showMsg('Claim submitted successfully.', 'success');
    } catch (err) {
      console.error(err);
      showMsg('Unable to claim this food item.', 'error');
    }
  };

  const handleCollect = async (claimId) => {
    try {
      await api.put(`/claims/${claimId}/collect`);
      fetchMyClaims();
      showMsg('Claim marked as collected.', 'success');
    } catch (err) {
      console.error(err);
      showMsg('Unable to update claim status.', 'error');
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
      <div className="fb-dashboard-header d-flex justify-content-between align-items-start flex-wrap gap-3" style={{ background: 'linear-gradient(135deg, #2a9d8f, #21867a)' }}>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.75, marginBottom: '0.3rem' }}>
            <i className="bi bi-people-fill me-1"></i>NGO Dashboard
          </div>
          <h2 className="mb-1">Welcome back{user.name ? `, ${user.name}` : ''} 👋</h2>
          <p style={{ opacity: 0.82, margin: 0, fontSize: '0.95rem' }}>Explore available food listings and manage your claims.</p>
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

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="fb-stat-card" style={{ background: 'linear-gradient(135deg, #fff 60%, #d1fae5)' }}>
            <div className="stat-number" style={{ color: '#2a9d8f' }}>{foods.length}</div>
            <div className="stat-label">Available Food</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fb-stat-card">
            <div className="stat-number">{claims.length}</div>
            <div className="stat-label">Your Claims</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fb-stat-card">
            <div className="stat-number" style={{ fontSize: '1.4rem', color: '#2a9d8f' }}>
              {claims.filter(c => c.status === 'COLLECTED').length}
            </div>
            <div className="stat-label">Collected</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fb-stat-card" style={{ background: 'linear-gradient(135deg, #fff 60%, #fef3c7)' }}>
            <div className="stat-number" style={{ color: '#f4a261', fontSize: '1.4rem' }}>
              {claims.filter(c => c.status === 'PENDING').length}
            </div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Available Food */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 style={{ fontFamily: 'Nunito', fontWeight: 800, margin: 0, color: '#1a1a2e' }}>
              <i className="bi bi-bag-heart-fill me-2" style={{ color: '#e8732a' }}></i>
              Available Food
              <span className="fb-badge fb-badge-success ms-2">{processedFoods.length}</span>
            </h5>
          </div>
          
          <div className="fb-card p-3 mb-3">
            <div className="row g-2">
              <div className="col-md-12">
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="Search by title..." 
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentFoodPage(1); }}
                />
              </div>
              <div className="col-4">
                <select className="form-select form-select-sm" value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setCurrentFoodPage(1); }}>
                  <option value="ALL">All Categories</option>
                  <option value="VEG">Vegetarian</option>
                  <option value="NON_VEG">Non-Vegetarian</option>
                  <option value="DAIRY">Dairy</option>
                  <option value="BAKERY">Bakery</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="col-4">
                <select className="form-select form-select-sm" value={sortQty} onChange={e => { setSortQty(e.target.value); setCurrentFoodPage(1); }}>
                  <option value="">Sort by Qty...</option>
                  <option value="high">Highest Qty</option>
                  <option value="low">Lowest Qty</option>
                </select>
              </div>
              <div className="col-4">
                <select className="form-select form-select-sm" value={sortExpiry} onChange={e => { setSortExpiry(e.target.value); setCurrentFoodPage(1); }}>
                  <option value="">Sort by Expiry...</option>
                  <option value="soon">Expiring Soon</option>
                  <option value="late">Expiring Late</option>
                </select>
              </div>
            </div>
          </div>
          
          {processedFoods.length === 0 ? (
            <div className="fb-empty-state fb-card" style={{ padding: '2.5rem' }}>
              <i className="bi bi-inbox"></i>
              <p style={{ fontWeight: 600 }}>No food listings available</p>
              <p style={{ fontSize: '0.88rem' }}>Refresh to load the latest options.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {paginatedFoods.map((f) => (
                <div key={f.id} className="fb-food-card">
                  <h5 className="mb-1">{f.title}</h5>
                  <div className="d-flex gap-2 flex-wrap mb-2">
                    <span className="fb-badge fb-badge-primary"><i className="bi bi-bag-fill me-1"></i>Qty: {f.qty}</span>
                    {f.category && (
                      <span className="fb-badge" style={{ backgroundColor: '#6c757d', color: '#fff' }}>
                        <i className="bi bi-tag-fill me-1"></i>{f.category}
                      </span>
                    )}
                    <span className="fb-badge fb-badge-available">Available</span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.83rem', margin: '0 0 0.4rem' }}>
                    <i className="bi bi-person me-1"></i>By: {f.postedByName}
                  </p>
                  <div style={{ marginBottom: '0.8rem' }}>
                    <CountdownTimer expiryTime={f.expiryTime} />
                  </div>
                  <button onClick={() => handleClaim(f.id)} className="btn-fb-primary" style={{ fontSize: '0.88rem', padding: '0.5rem 1.2rem' }}>
                    <i className="bi bi-hand-index-thumb-fill"></i>Claim Food
                  </button>
                </div>
              ))}
              
              {totalFoodPages > 1 && (
                <nav aria-label="Available food pagination" className="mt-2">
                  <ul className="pagination justify-content-center mb-0">
                    <li className={`page-item ${currentFoodPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" style={{ color: currentFoodPage === 1 ? '#6c757d' : '#2a9d8f' }} onClick={() => setCurrentFoodPage(prev => prev - 1)}>Prev</button>
                    </li>
                    {Array.from({ length: totalFoodPages }, (_, i) => i + 1).map(page => (
                      <li key={page} className={`page-item ${currentFoodPage === page ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          style={currentFoodPage === page ? { backgroundColor: '#2a9d8f', borderColor: '#2a9d8f', color: '#fff' } : { color: '#2a9d8f' }}
                          onClick={() => setCurrentFoodPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentFoodPage === totalFoodPages ? 'disabled' : ''}`}>
                      <button className="page-link" style={{ color: currentFoodPage === totalFoodPages ? '#6c757d' : '#2a9d8f' }} onClick={() => setCurrentFoodPage(prev => prev + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          )}
        </div>

        {/* My Claims */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 style={{ fontFamily: 'Nunito', fontWeight: 800, margin: 0, color: '#1a1a2e' }}>
              <i className="bi bi-clipboard-check-fill me-2" style={{ color: '#2a9d8f' }}></i>
              My Claims
              <span className="fb-badge fb-badge-info ms-2">{filteredClaims.length}</span>
            </h5>
            <select 
              className="form-select form-select-sm w-auto shadow-sm" 
              style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
              value={filterClaimStatus}
              onChange={(e) => { setFilterClaimStatus(e.target.value); setCurrentClaimPage(1); }}
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="COLLECTED">Collected</option>
            </select>
          </div>

          {filteredClaims.length === 0 ? (
            <div className="fb-empty-state fb-card" style={{ padding: '2.5rem' }}>
              <i className="bi bi-clipboard"></i>
              <p style={{ fontWeight: 600 }}>No claims found</p>
              <p style={{ fontSize: '0.88rem' }}>{claims.length === 0 ? 'Claim food to see status updates here.' : 'Try changing your filter.'}</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {paginatedClaims.map((c) => (
                <div key={c.id} className="fb-food-card">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <h5 className="mb-1">{c.foodTitle}</h5>
                      <span className={`fb-badge ${c.status === 'COLLECTED' ? 'fb-badge-success' : 'fb-badge-warning'}`}>
                        <i className={`bi ${c.status === 'COLLECTED' ? 'bi-check-circle-fill' : 'bi-hourglass-split'} me-1`}></i>
                        {c.status}
                      </span>
                    </div>
                    {c.status === 'PENDING' && (
                      <button onClick={() => handleCollect(c.id)} className="btn-fb-accent flex-shrink-0" style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}>
                        <i className="bi bi-check2-all"></i>Mark Collected
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {totalClaimPages > 1 && (
                <nav aria-label="Claims pagination" className="mt-2">
                  <ul className="pagination justify-content-center mb-0">
                    <li className={`page-item ${currentClaimPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" style={{ color: currentClaimPage === 1 ? '#6c757d' : '#2a9d8f' }} onClick={() => setCurrentClaimPage(prev => prev - 1)}>Prev</button>
                    </li>
                    {Array.from({ length: totalClaimPages }, (_, i) => i + 1).map(page => (
                      <li key={page} className={`page-item ${currentClaimPage === page ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          style={currentClaimPage === page ? { backgroundColor: '#2a9d8f', borderColor: '#2a9d8f', color: '#fff' } : { color: '#2a9d8f' }}
                          onClick={() => setCurrentClaimPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentClaimPage === totalClaimPages ? 'disabled' : ''}`}>
                      <button className="page-link" style={{ color: currentClaimPage === totalClaimPages ? '#6c757d' : '#2a9d8f' }} onClick={() => setCurrentClaimPage(prev => prev + 1)}>Next</button>
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

export default NgoDashboard;
