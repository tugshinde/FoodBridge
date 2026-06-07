function Contact() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #fff9f6 0%, #fde8d8 50%, #e8f7f5)', minHeight: 'calc(100vh - 80px)', padding: '4rem 0' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="text-center mb-4">
              <span style={{ background: '#fde8d8', color: '#c45e1a', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.4rem 1rem', borderRadius: '999px', display: 'inline-block', marginBottom: '1rem' }}>
                Get in Touch
              </span>
              <h1 style={{ fontFamily: 'Nunito', fontWeight: 900, color: '#1a1a2e', marginBottom: '0.5rem' }}>Contact Us</h1>
              <p style={{ color: '#6b7280' }}>We'd love to hear from you! Send us a message.</p>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #e8ddd5', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 12px 48px rgba(232,115,42,0.1)' }}>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label className="fb-form-label">Your Name</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-person fb-input-icon"></i>
                    <input type="text" className="fb-form-control has-icon" placeholder="John Doe" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="fb-form-label">Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-envelope fb-input-icon"></i>
                    <input type="email" className="fb-form-control has-icon" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="fb-form-label">Subject</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-chat-left-text fb-input-icon"></i>
                    <input type="text" className="fb-form-control has-icon" placeholder="How can we help?" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="fb-form-label">Message</label>
                  <textarea className="fb-form-control" rows="5" placeholder="Describe your query in detail..." style={{ resize: 'vertical' }}></textarea>
                </div>
                <button className="btn-fb-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem', borderRadius: '12px' }}>
                  <i className="bi bi-send-fill"></i> Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-4 mt-5 mt-lg-0">
            <div className="d-flex flex-column gap-3" style={{ paddingTop: '5rem' }}>
              {[
                { icon: 'bi-envelope-fill', label: 'Email', value: 'support@foodbridge.com', color: '#e8732a' },
                { icon: 'bi-telephone-fill', label: 'Phone', value: '+91 98765 43210', color: '#2a9d8f' },
                { icon: 'bi-geo-alt-fill', label: 'Location', value: 'Mumbai, Maharashtra, India', color: '#f4a261' },
                { icon: 'bi-clock-fill', label: 'Office Hours', value: 'Mon–Sat: 9 AM – 6 PM', color: '#8b5cf6' },
              ].map((c) => (
                <div key={c.label} style={{ background: '#fff', border: '1.5px solid #e8ddd5', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '2.8rem', height: '2.8rem', background: c.color + '18', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: c.color, fontSize: '1.1rem' }}>
                    <i className={`bi ${c.icon}`}></i>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c.label}</div>
                    <div style={{ color: '#1a1a2e', fontWeight: 600, fontSize: '0.92rem' }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
