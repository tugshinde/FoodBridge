import { useState, useContext } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const fixedRole = searchParams.get('role');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: fixedRole || 'NGO'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords must match.');
      return;
    }
    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // Auto-login after successful registration
      const userRes = await login(formData.email, formData.password);

      // Navigate to respective dashboard
      if (userRes.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (userRes.role === 'NGO') {
        navigate('/ngo/dashboard');
      } else {
        navigate('/restaurant/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="fb-auth-wrapper">
      <div className="fb-auth-card" style={{ maxWidth: '520px' }}>
        <div className="text-center mb-4">
          <div className="fb-auth-logo">Food<span style={{ color: '#2a9d8f' }}>Bridge</span></div>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {fixedRole
              ? `Registering as ${fixedRole === 'RESTAURANT' ? 'Restaurant / Hotel' : 'NGO'}`
              : 'Create your account and start sharing food.'}
          </p>
        </div>

        {error && (
          <div className="fb-alert fb-alert-error mb-4">
            <i className="bi bi-exclamation-circle-fill"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!fixedRole && (
            <div className="mb-3">
              <label className="fb-form-label">Account Type</label>
              <select
                className="fb-form-control"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="NGO">NGO</option>
                <option value="RESTAURANT">Restaurant / Hotel</option>
              </select>
            </div>
          )}

          {fixedRole && (
            <div className="mb-3">
              <div style={{ background: '#fde8d8', border: '1.5px solid #f5d0b0', borderRadius: '10px', padding: '0.7rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="bi bi-info-circle-fill" style={{ color: '#e8732a' }}></i>
                <span style={{ fontSize: '0.88rem', color: '#c45e1a', fontWeight: 600 }}>
                  Account role: {fixedRole === 'RESTAURANT' ? 'Restaurant / Hotel' : 'NGO'}
                </span>
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="fb-form-label">Name / Organization</label>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-building fb-input-icon"></i>
              <input
                type="text"
                className="fb-form-control has-icon"
                required
                placeholder="Your name or organization"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="fb-form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-envelope fb-input-icon"></i>
              <input
                type="email"
                className="fb-form-control has-icon"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="fb-form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <i className="bi bi-lock fb-input-icon"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="fb-form-control has-icon"
                  required
                  pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$"
                  title="Password must be at least 8 characters, and contain at least one digit, one lowercase, one uppercase, and one special character (@#$%^&+=!)"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="button" className="fb-toggle-btn" onClick={() => setShowPassword((p) => !p)}>
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              <small style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: '0.4rem' }}>
                At least 8 chars, 1 uppercase, 1 number, 1 special character.
              </small>
            </div>
            <div className="col-6">
              <label className="fb-form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <i className="bi bi-lock-fill fb-input-icon"></i>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="fb-form-control has-icon"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button type="button" className="fb-toggle-btn" onClick={() => setShowConfirmPassword((p) => !p)}>
                  <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-fb-primary w-100 justify-content-center" style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '12px', width: '100%' }}>
            <i className="bi bi-person-plus-fill"></i> Create Account
          </button>
        </form>

        <hr style={{ margin: '1.5rem 0', borderColor: '#e8ddd5' }} />
        <p className="text-center mb-0" style={{ color: '#6b7280', fontSize: '0.9rem' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: '#e8732a', fontWeight: 700 }}>Sign in here →</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
