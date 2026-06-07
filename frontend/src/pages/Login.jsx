import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      const role = result?.role ? String(result.role).toUpperCase() : null;
      if (role === 'RESTAURANT' || role === 'HOTEL') {
        navigate('/restaurant-dashboard');
      } else if (role === 'NGO') {
        navigate('/ngo-dashboard');
      } else if (role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Invalid credentials or server error.';
      setError(message);
    }
  };

  return (
    <div className="fb-auth-wrapper">
      <div className="fb-auth-card">
        <div className="text-center mb-4">
          <div className="fb-auth-logo">Food<span style={{color:'#2a9d8f'}}>Bridge</span></div>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>Welcome back! Sign in to continue.</p>
        </div>

        {error && (
          <div className="fb-alert fb-alert-error mb-4">
            <i className="bi bi-exclamation-circle-fill"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fb-form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-envelope fb-input-icon"></i>
              <input
                type="email"
                className="fb-form-control has-icon"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="fb-form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-lock fb-input-icon"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                className="fb-form-control has-icon"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="fb-toggle-btn" onClick={() => setShowPassword((p) => !p)}>
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn-fb-primary w-100 justify-content-center" style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '12px', width: '100%' }}>
            <i className="bi bi-box-arrow-in-right"></i> Sign In
          </button>
        </form>

        <hr style={{ margin: '1.5rem 0', borderColor: '#e8ddd5' }} />
        <p className="text-center mb-0" style={{ color: '#6b7280', fontSize: '0.9rem' }}>
          New here?{' '}
          <Link to="/register" style={{ color: '#e8732a', fontWeight: 700 }}>
            Create an account →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
