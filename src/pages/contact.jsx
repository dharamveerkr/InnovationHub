export default function Contact() {
  return (
    <main style={{ padding: '80px 48px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '32px' }}>
        Let's <span style={{ color: 'var(--accent)' }}>Connect</span>
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <a href="mailto:dharamveerkumar774@mail.com" className="social-link" style={{ fontSize: '1rem' }}>
          ✉️ dharamveerkumar774@mail.com
        </a>
        <a href="https://linkedin.com/in/dharamveerkz" target="_blank" rel="noopener" className="social-link" style={{ fontSize: '1rem' }}>
          💼 LinkedIn
        </a>
        <a href="https://github.com/dharamveerkz" target="_blank" rel="noopener" className="social-link" style={{ fontSize: '1rem' }}>
          🐙 GitHub
        </a>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '24px' }}>
          Open to collaborations, feedback, or just chatting about new ideas. 
          I reply to every message.
        </p>
      </div>
    </main>
  );
}
