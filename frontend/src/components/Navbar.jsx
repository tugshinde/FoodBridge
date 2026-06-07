import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fb-navbar">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to={user ? '/dashboard' : '/'} className="fb-brand">
            Food<span>Bridge</span>
          </Link>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {!user && (
              <Link to="/" className="fb-nav-link">
                <i className="bi bi-house-door me-1"></i>Home
              </Link>
            )}
            <Link to="/about" className="fb-nav-link">
              <i className="bi bi-info-circle me-1"></i>About
            </Link>
            <Link to="/contact" className="fb-nav-link">
              <i className="bi bi-envelope me-1"></i>Contact
            </Link>

            <div className="d-flex align-items-center gap-2 ms-2">
              {user ? (
                <>
                  <span className="fb-user-badge">
                    <i className="bi bi-person-circle"></i>
                    {user.name || user.role}
                  </span>
                  <Link to="/dashboard" className="btn-fb-secondary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.88rem' }}>
                    <i className="bi bi-speedometer2"></i>Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-fb-danger" style={{ padding: '0.45rem 1.1rem', fontSize: '0.88rem' }}>
                    <i className="bi bi-box-arrow-right"></i>Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn-fb-primary" style={{ padding: '0.5rem 1.3rem', fontSize: '0.9rem' }}>
                  <i className="bi bi-box-arrow-in-right"></i>Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
