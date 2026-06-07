import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="fb-auth-wrapper">
      <div className="fb-auth-card text-center">
        <div style={{ width: '5rem', height: '5rem', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem', color: '#e63946' }}>
          <i className="bi bi-shield-exclamation"></i>
        </div>
        <span style={{ background: '#fee2e2', color: '#991b1b', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '0.3rem 0.85rem', borderRadius: '999px', display: 'inline-block', marginBottom: '0.75rem' }}>
          Access Denied
        </span>
        <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, color: '#1a1a2e', marginBottom: '0.75rem' }}>Unauthorized</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.75rem', lineHeight: 1.7 }}>
          You do not have permission to view this page. Please sign in with the correct role or contact support.
        </p>
        <Link to="/dashboard" className="btn-fb-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', borderRadius: '12px' }}>
          <i className="bi bi-house-fill"></i>Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
