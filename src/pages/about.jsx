// src/pages/about.jsx
export default function About() {
  return (
    <main style={{ padding: '80px 48px 100px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* ── Profile Image ── */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ 
            width: '200px', 
            height: '200px', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '2px solid var(--border)',
            background: 'var(--surface)',
            transition: 'border-color 0.3s ease'
          }}>
            <img 
              src="/my-image.jpg" 
              alt="Dharamveer" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: 'grayscale(30%) contrast(1.1)',
                transition: 'filter 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%) contrast(1)';
                e.currentTarget.parentElement.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(30%) contrast(1.1)';
                e.currentTarget.parentElement.style.borderColor = 'var(--border)';
              }}
            />
          </div>
        </div>

        {/* ── Bio Content ── */}
        <div style={{ flex: 1, minWidth: '280px', paddingTop: '8px' }}>
          <h1 style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '20px' 
          }}>
            About <span style={{ color: 'var(--accent)' }}>Me</span>          </h1>

          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            letterSpacing: '0.15em', 
            textTransform: 'uppercase', 
            color: 'var(--accent)', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)' }}></span>
            Software Engineer & Full-Stack Developer
          </div>

          <p style={{ 
            fontSize: '0.95rem', 
            lineHeight: 1.9, 
            color: 'var(--muted)', 
            marginBottom: '16px'
          }}>
            B.Tech CSE graduate from <span style={{ color: 'var(--text)', fontWeight: 600 }}>Bakhtiyarpur College of Engineering, Patna</span>, with strong foundations in algorithms, system design, and modern web technologies.
          </p>

          <p style={{ 
            fontSize: '0.95rem', 
            lineHeight: 1.9, 
            color: 'var(--muted)', 
            marginBottom: '24px'
          }}>
            Building scalable web applications, intelligent AI solutions, and data-driven systems. Specializing in real-world projects that bridge engineering rigor with product impact.
          </p>

          <div style={{ 
            padding: '16px 20px', 
            borderLeft: '2px solid var(--accent)', 
            background: 'rgba(232, 255, 0, 0.03)',
            borderRadius: '0 8px 8px 0'
          }}>
            <p style={{ 
              fontSize: '0.85rem', 
              lineHeight: 1.8, 
              color: 'var(--text)', 
              fontStyle: 'italic',
              margin: 0
            }}>
              This site is my public lab — where every startup idea gets a working prototype. Shipped fast, iterated publicly. No mockups, just code.
            </p>          </div>
        </div>

      </div>
    </main>
  );
}