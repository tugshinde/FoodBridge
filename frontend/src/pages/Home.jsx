import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="fb-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="fb-hero-badge mb-3">
                <i className="bi bi-leaf-fill"></i>
                Community Food Rescue Platform
              </span>
              <h1 className="fb-hero mb-4">
                Serve surplus meals <span className="fb-hero-accent">faster</span>, with a warm food rescue flow.
              </h1>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                FoodBridge connects restaurants, hotels, and NGOs in a clean interface that feels friendly, organized, and easy to use. Reduce waste. Feed communities.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/register?role=RESTAURANT" className="btn-fb-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                  <i className="bi bi-building"></i>Join as Restaurant
                </Link>
                <Link to="/register?role=NGO" className="btn-fb-accent" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                  <i className="bi bi-people-fill"></i>Join as NGO
                </Link>
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <div style={{ background: '#fff', border: '1.5px solid #e8ddd5', borderRadius: '14px', padding: '1.1rem' }}>
                    <i className="bi bi-lightning-charge-fill mb-2 d-block" style={{ color: '#e8732a', fontSize: '1.2rem' }}></i>
                    <div style={{ fontWeight: 800, fontFamily: 'Nunito, sans-serif', color: '#1a1a2e', fontSize: '0.95rem' }}>Quick posts</div>
                    <div style={{ color: '#6b7280', fontSize: '0.83rem', marginTop: '0.25rem' }}>Create listings with quantity, expiry, and pickup in one step.</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ background: '#fff', border: '1.5px solid #e8ddd5', borderRadius: '14px', padding: '1.1rem' }}>
                    <i className="bi bi-check2-circle mb-2 d-block" style={{ color: '#2a9d8f', fontSize: '1.2rem' }}></i>
                    <div style={{ fontWeight: 800, fontFamily: 'Nunito, sans-serif', color: '#1a1a2e', fontSize: '0.95rem' }}>Fast claims</div>
                    <div style={{ color: '#6b7280', fontSize: '0.83rem', marginTop: '0.25rem' }}>NGOs reserve meals instantly and keep status clear.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="fb-hero-visual">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <span style={{ width: '10px', height: '10px', background: '#2a9d8f', borderRadius: '50%', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2a9d8f' }}>Trusted by kitchens and care partners</span>
                </div>
                <div className="row g-3">
                  {[
                    { num: '78%', label: 'Less food waste across the supply chain', icon: 'bi-graph-down-arrow', color: '#e8732a' },
                    { num: '500+', label: 'Active NGO and kitchen partners', icon: 'bi-people-fill', color: '#2a9d8f' },
                    { num: '1.8K', label: 'Successful collections logged', icon: 'bi-bag-check-fill', color: '#f4a261' },
                  ].map((s) => (
                    <div key={s.num} className="col-12">
                      <div className="d-flex align-items-center gap-3" style={{ background: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', border: '1.5px solid #e8ddd5' }}>
                        <div style={{ width: '2.8rem', height: '2.8rem', background: s.color + '18', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: '1.2rem' }}></i>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.6rem', color: '#1a1a2e', lineHeight: 1 }}>{s.num}</div>
                          <div style={{ color: '#6b7280', fontSize: '0.83rem', marginTop: '0.2rem' }}>{s.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* How it works */}
      <section className="fb-section fb-section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <span className="fb-hero-badge mb-3">How it works</span>
            <h2 className="fb-section-title">Three simple steps to <span>rescue food</span></h2>
            <p style={{ color: '#6b7280', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
              Steered by simplicity — every step is designed to feel like a calm ordering counter for shared community resources.
            </p>
          </div>
          <div className="row g-4 position-relative z-1">
            {[
              { icon: 'bi-pencil-square', title: 'Post meals instantly', desc: 'Restaurants and hotels publish surplus food details quickly so NGOs can respond right away.', color: '#e8732a', step: '01' },
              { icon: 'bi-search', title: 'NGOs find local food', desc: 'Organizations browse available food in their area, filtering by type or expiry time.', color: '#2a9d8f', step: '02' },
              { icon: 'bi-hand-thumbs-up-fill', title: 'Track every pickup', desc: 'Manage claims, mark collections, and keep your team updated across every handoff.', color: '#f4a261', step: '03' },
            ].map((f) => (
              <div className="col-md-4" key={f.step}>
                <div className="fb-feature-card h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="fb-feature-icon">
                      <i className={`bi ${f.icon}`}></i>
                    </div>
                    <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.8rem', color: f.color + '40' }}>{f.step}</span>
                  </div>
                  <h5 style={{ fontFamily: 'Nunito', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.6rem' }}>{f.title}</h5>
                  <p style={{ color: '#6b7280', lineHeight: 1.7, fontSize: '0.93rem', marginBottom: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Stats row */}
      <section className="fb-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fb-section-title">Designed for <span>community kitchens</span></h2>
            <p style={{ color: '#6b7280', maxWidth: '550px', margin: '0 auto', fontSize: '1rem' }}>
              FoodBridge blends friendly visuals with practical tools so your platform feels polished and reliable.
            </p>
          </div>
          <div className="row g-4">
            {[
              { icon: 'bi-rocket-takeoff-fill', title: 'Easy setup', desc: 'Sign up and start posting or claiming in minutes without any extra steps.', color: '#e8732a' },
              { icon: 'bi-layout-text-window-reverse', title: 'Calm dashboard', desc: 'All your active listings, claims, and actions appear in a clean overview.', color: '#2a9d8f' },
              { icon: 'bi-bar-chart-fill', title: 'Impact tracked', desc: 'See your contribution to food rescue with every posting and claim.', color: '#f4a261' },
            ].map((s) => (
              <div className="col-md-4" key={s.title}>
                <div style={{ background: `linear-gradient(135deg, #fff 60%, ${s.color}12)`, border: '1.5px solid #e8ddd5', borderRadius: '20px', padding: '2rem', height: '100%', textAlign: 'center' }}>
                  <div style={{ width: '3.5rem', height: '3.5rem', background: s.color + '18', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.4rem', color: s.color }}>
                    <i className={`bi ${s.icon}`}></i>
                  </div>
                  <h5 style={{ fontFamily: 'Nunito', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem' }}>{s.title}</h5>
                  <p style={{ color: '#6b7280', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #e8732a, #c45e1a)', padding: '4rem 0' }}>
        <div className="container text-center text-white">
          <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: '1rem' }}>
            Ready to make an impact?
          </h2>
          <p style={{ opacity: 0.85, maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Join hundreds of restaurants and NGOs already using FoodBridge to reduce waste and feed communities.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/register" style={{ background: '#fff', color: '#e8732a', borderRadius: '999px', padding: '0.75rem 2.2rem', fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <i className="bi bi-person-plus-fill"></i>Get Started Free
            </Link>
            <Link to="/about" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '999px', padding: '0.75rem 2.2rem', fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
