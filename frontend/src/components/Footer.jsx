import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="fb-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="fb-footer-brand mb-2">Food<span style={{color:'#2a9d8f'}}>Bridge</span></div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.7 }}>
              Connecting surplus food with NGOs and communities. Reduce waste, feed people, build impact.
            </p>
            <div className="d-flex gap-2 mt-3">
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle" style={{width:'36px',height:'36px',background:'rgba(255,255,255,0.1)'}}>
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle" style={{width:'36px',height:'36px',background:'rgba(255,255,255,0.1)'}}>
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle" style={{width:'36px',height:'36px',background:'rgba(255,255,255,0.1)'}}>
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-6">
            <h5 style={{ fontSize: '0.95rem' }} className="mb-3">Platform</h5>
            <div className="d-flex flex-column gap-2">
              <Link to="/about" className="fb-footer-link" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>About Us</Link>
              <Link to="/contact" className="fb-footer-link" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>Contact</Link>
              <Link to="/dashboard" className="fb-footer-link" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>Dashboard</Link>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <h5 style={{ fontSize: '0.95rem' }} className="mb-3">Join Us</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0 mt-3">
              <li><Link to="/register?role=RESTAURANT" className="fb-footer-link" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>Restaurant / Hotel</Link></li>
              <li><Link to="/register?role=NGO" className="fb-footer-link" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>NGO Organization</Link></li>
              <Link to="/login" className="fb-footer-link" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>Sign In</Link>
            </ul>
          </div>

          <div className="col-lg-3">
            <h5 style={{ fontSize: '0.95rem' }} className="mb-3">Contact</h5>
            <div className="d-flex flex-column gap-2" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>
              <span><i className="bi bi-envelope me-2" style={{color:'#e8732a'}}></i>support@foodbridge.com</span>
              <span><i className="bi bi-telephone me-2" style={{color:'#e8732a'}}></i>+91 98765 43210</span>
              <span><i className="bi bi-geo-alt me-2" style={{color:'#e8732a'}}></i>Mumbai, Maharashtra</span>
            </div>
          </div>
        </div>

        <hr className="fb-footer-divider" />
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p className="fb-footer-note mb-0">© 2026 FoodBridge. Built for communities and sustainable impact.</p>
          <p className="fb-footer-note mb-0">Made with <i className="bi bi-heart-fill" style={{color:'#e8732a',fontSize:'0.75rem'}}></i> for a better world</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
