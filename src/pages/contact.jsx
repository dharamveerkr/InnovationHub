// src/pages/contact.jsx
import { useState } from 'react';
import Head from 'next/head';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/dharamveerkumar774@mail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || 'New message from Portfolio',
          message: formState.message,
          _subject: formState.subject || 'Portfolio Contact: ' + formState.name,
          _captcha: 'false' // Disable captcha for cleaner UX
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      setSubmitStatus('error');
    } finally {      setIsSubmitting(false);
      // Auto-clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <>
      <Head>
        <title>Contact — Dharamveer</title>
        <meta name="description" content="Get in touch for collaborations, feedback, or new ideas" />
      </Head>

      <main style={{ padding: '80px 48px 100px', maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ 
          fontFamily: "'Syne', sans-serif", 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '40px',
          fontWeight: 800,
          letterSpacing: '-0.03em'
        }}>
          Let's <span style={{ color: 'var(--accent)' }}>Connect</span>
        </h1>

        {/* ── Social Links ── */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '14px', 
          marginBottom: '48px',
          padding: '20px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--surface)'
        }}>
          <a href="mailto:dharamveerkumar774@mail.com" className="social-link" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>✉️</span> dharamveerkumar774@mail.com
          </a>
          <a href="https://linkedin.com/in/dharamveerkr" target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💼</span> LinkedIn
          </a>
          <a href="https://github.com/dharamveerkz" target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🐙</span> GitHub
          </a>
          <a href="https://instagram.com/imdharamvrr" target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📸</span> Instagram
          </a>
        </div>

        {/* ── Contact Form ── */}        <div style={{ 
          border: '1px solid var(--border)', 
          borderRadius: '12px', 
          padding: '28px',
          background: 'var(--surface)'
        }}>
          <h2 style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontSize: '1.3rem', 
            marginBottom: '24px',
            fontWeight: 700
          }}>
            Send a Message
          </h2>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div style={{ 
              padding: '14px 18px', 
              background: 'rgba(61, 255, 143, 0.12)', 
              border: '1px solid #3dff8f',
              borderRadius: '8px', 
              color: '#3dff8f',
              fontSize: '0.9rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>✓</span> Thank you! Your message has been sent. I'll reply soon.
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div style={{ 
              padding: '14px 18px', 
              background: 'rgba(255, 60, 60, 0.12)', 
              border: '1px solid #ff3c3c',
              borderRadius: '8px', 
              color: '#ff6b6b',
              fontSize: '0.9rem',
              marginBottom: '20px'
            }}>
              ⚠️ Something went wrong. Please try again or email me directly.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name */}            <div>
              <label htmlFor="name" style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase', 
                color: 'var(--muted)', 
                marginBottom: '6px' 
              }}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(232, 255, 0, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                letterSpacing: '0.08em',                 textTransform: 'uppercase', 
                color: 'var(--muted)', 
                marginBottom: '6px' 
              }}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(232, 255, 0, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="you@example.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase', 
                color: 'var(--muted)', 
                marginBottom: '6px' 
              }}>
                Subject
              </label>              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(232, 255, 0, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="What's this about?"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase', 
                color: 'var(--muted)', 
                marginBottom: '6px' 
              }}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}                rows="5"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  minHeight: '120px',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(232, 255, 0, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Tell me about your idea, project, or just say hi..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: '8px',
                padding: '14px 28px',
                background: isSubmitting ? 'var(--border)' : 'var(--accent)',
                color: isSubmitting ? 'var(--muted)' : 'var(--bg)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 255, 0, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ 
                    width: '14px', 
                    height: '14px', 
                    border: '2px solid var(--bg)', 
                    borderTop: '2px solid transparent', 
                    borderRadius: '50%', 
                    animation: 'spin 0.8s linear infinite' 
                  }} />
                  Sending...
                </>
              ) : (
                'Send Message →'
              )}
            </button>
          </form>

          <p style={{ 
            fontSize: '0.75rem', 
            color: 'var(--muted)', 
            marginTop: '20px', 
            textAlign: 'center',
            lineHeight: 1.7
          }}>
            Open to collaborations, feedback, or just chatting about new ideas. 
            <br />I reply to every message — usually within 24 hours.
          </p>
        </div>
      </main>

      {/* Global spin animation for loading state */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}