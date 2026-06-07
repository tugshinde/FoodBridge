function About() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #fff9f6 0%, #fde8d8 60%, #e8f7f5)', padding: '4rem 0 3rem', borderBottom: '2px solid #e8ddd5' }}>
        <div className="container text-center" style={{ maxWidth: '700px' }}>
          <span style={{ background: '#fde8d8', color: '#c45e1a', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.4rem 1rem', borderRadius: '999px', display: 'inline-block', marginBottom: '1rem' }}>
            Our Story
          </span>
          <h1 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a1a2e', marginBottom: '1.25rem' }}>
            About <span style={{ color: '#e8732a' }}>FoodBridge</span>
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#4a4a4a', marginBottom: '1.5rem' }}>
            FoodBridge was created with a single vision: to eliminate food waste while feeding those in need. Every day, tons of perfectly good food from restaurants and hotels are thrown away simply because there is no efficient way to redirect it.
          </p>
          <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.8 }}>
            We provide a real-time bridge. Restaurants post surplus food in seconds, and local NGOs get instant access to claim it. A win-win for the environment and the community.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container py-5">
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div style={{ background: 'linear-gradient(135deg, #fff 60%, #fde8d8)', border: '1.5px solid #e8ddd5', borderRadius: '20px', padding: '2rem', height: '100%' }}>
              <div style={{ width: '3rem', height: '3rem', background: '#fde8d8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.3rem', color: '#e8732a' }}>
                <i className="bi bi-bullseye"></i>
              </div>
              <h4 style={{ fontFamily: 'Nunito', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.75rem' }}>Our Mission</h4>
              <p style={{ color: '#6b7280', lineHeight: 1.75, marginBottom: 0 }}>
                To reduce global food waste by creating localized, lightning-fast surplus distribution networks that connect kitchens directly to communities in need.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ background: 'linear-gradient(135deg, #fff 60%, #d1fae5)', border: '1.5px solid #e8ddd5', borderRadius: '20px', padding: '2rem', height: '100%' }}>
              <div style={{ width: '3rem', height: '3rem', background: '#d1fae5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.3rem', color: '#2a9d8f' }}>
                <i className="bi bi-eye-fill"></i>
              </div>
              <h4 style={{ fontFamily: 'Nunito', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.75rem' }}>Our Vision</h4>
              <p style={{ color: '#6b7280', lineHeight: 1.75, marginBottom: 0 }}>
                A world where no edible food goes to the landfill, and every plate finds a person. We envision a future where technology bridges gaps between abundance and need.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-4">
          <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, color: '#1a1a2e' }}>Our Values</h2>
        </div>
        <div className="row g-3">
          {[
            { icon: 'bi-heart-fill', label: 'Community First', color: '#e8732a', desc: 'Every decision we make centers around the well-being of our communities.' },
            { icon: 'bi-lightning-fill', label: 'Speed & Simplicity', color: '#f4a261', desc: 'Fast, simple flows ensure food reaches people before it expires.' },
            { icon: 'bi-shield-check-fill', label: 'Trust & Transparency', color: '#2a9d8f', desc: 'Open tracking and clear status updates for every handoff.' },
            { icon: 'bi-globe2', label: 'Sustainability', color: '#059669', desc: 'Reducing food waste is one of the most impactful environmental actions.' },
          ].map((v) => (
            <div className="col-6 col-md-3" key={v.label}>
              <div className="text-center" style={{ background: '#fff', border: '1.5px solid #e8ddd5', borderRadius: '16px', padding: '1.5rem 1rem' }}>
                <i className={`bi ${v.icon}`} style={{ fontSize: '1.6rem', color: v.color, display: 'block', marginBottom: '0.6rem' }}></i>
                <div style={{ fontFamily: 'Nunito', fontWeight: 800, color: '#1a1a2e', fontSize: '0.95rem', marginBottom: '0.4rem' }}>{v.label}</div>
                <div style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
