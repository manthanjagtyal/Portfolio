import React from 'react'
import { Scroll } from '@react-three/drei'
import {
  Sparkles,
  Cpu,
  Layers,
  CreditCard,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react'

export default function ScrollOverlay() {
  return (
    <Scroll html style={{ width: '100%' }}>
      {/* =========================================================================
          SECTION 1: HERO (100vh)
          ========================================================================= */}
      <section className="scroll-section" style={{ justifyContent: 'flex-start' }}>
        <div className="interactive-content" style={{ marginTop: '2rem' }}>
          <div className="badge">
            <Sparkles size={13} color="#D4AF37" />
            <span>Interactive 3D Portfolio</span>
          </div>

          <h1 className="hero-title">
            Manthan Sharma
            <br />
            <span className="hero-gradient-text">Full-Stack & AI/ML Engineer</span>
          </h1>

          <p className="section-desc">
            Architecting intelligent web systems, high-performance backends, and 
            interactive spatial interfaces with algorithmic rigor and clean engineering.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#featured-work" className="btn-primary">
              <span>Explore ScriptSense</span>
              <ArrowRight size={16} />
            </a>
            <a href="#tech-stack" className="btn-secondary">
              <Layers size={16} color="#D4AF37" />
              <span>Core Tech Stack</span>
            </a>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Open to High-Impact Roles</span>
            </div>
            <span style={{ color: '#D1D5DB' }}>•</span>
            <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>Scalable Systems & AI Architecture</span>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse-icon">
            <div className="mouse-wheel" />
          </div>
          <span>Scroll to explore 3D Journey</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TECH STACK & ARCHITECTURE (100vh)
          ========================================================================= */}
      <section id="tech-stack" className="scroll-section" style={{ justifyContent: 'flex-end' }}>
        <div className="interactive-content glass-card" style={{ maxWidth: '640px' }}>
          <div className="badge">
            <Cpu size={13} color="#D4AF37" />
            <span>Technical Foundation</span>
          </div>

          <h2 className="section-title">Core Tech Stack</h2>
          <p className="section-desc" style={{ marginBottom: '1.25rem' }}>
            Focusing on scalable systems, resilient distributed backends, and intelligent architecture built for mission-critical reliability.
          </p>

          {/* Core 4 Minimalist Glassmorphic Tech Stack Tags */}
          <div className="arch-grid">
            {/* 1. React */}
            <div className="arch-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Code2 size={18} color="#D4AF37" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#18181B' }}>React</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.45 }}>
                Modern component architectures, dynamic reactive UIs, state management, and real-time frontend integration.
              </p>
            </div>

            {/* 2. Python (FastAPI) */}
            <div className="arch-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Terminal size={18} color="#D4AF37" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#18181B' }}>Python (FastAPI)</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.45 }}>
                High-throughput asynchronous APIs, AI/ML model deployment, background workers, and data validation pipelines.
              </p>
            </div>

            {/* 3. PostgreSQL */}
            <div className="arch-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Database size={18} color="#D4AF37" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#18181B' }}>PostgreSQL</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.45 }}>
                Relational schema design, complex query optimization, transactional ACID guarantees, and indexing strategies.
              </p>
            </div>

            {/* 4. C / DSA */}
            <div className="arch-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Cpu size={18} color="#D4AF37" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#18181B' }}>C / DSA</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.45 }}>
                Low-level memory awareness, computational efficiency, algorithmic problem-solving, and clean data structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED WORK - SCRIPTSENSE (100vh)
          ========================================================================= */}
      <section id="featured-work" className="scroll-section" style={{ justifyContent: 'flex-start' }}>
        <div className="interactive-content glass-card" style={{ maxWidth: '640px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div className="badge">
              <CreditCard size={13} color="#D4AF37" />
              <span>Featured Engineering Project</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#D4AF37', background: 'rgba(212, 175, 55, 0.1)', padding: '0.2rem 0.65rem', borderRadius: '6px' }}>
              Production SaaS
            </span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.3rem' }}>
            ScriptSense
          </h2>

          <p className="section-desc" style={{ marginBottom: '1.3rem', fontSize: '1.02rem', color: '#3F3F46', fontWeight: 500 }}>
            Built a robust FastAPI backend with PostgreSQL, featuring a custom subscription model and secure Razorpay payment gateway integration.
          </p>

          {/* Architectural Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: '#27272A' }}>
              <ShieldCheck size={16} color="#D4AF37" />
              <span>FastAPI Async Engine</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: '#27272A' }}>
              <Lock size={16} color="#D4AF37" />
              <span>Razorpay Webhook Verification</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: '#27272A' }}>
              <CheckCircle2 size={16} color="#D4AF37" />
              <span>Custom Subscription Lifecycle</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: '#27272A' }}>
              <Database size={16} color="#D4AF37" />
              <span>PostgreSQL Relational Storage</span>
            </div>
          </div>

          {/* Technology Badges */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.6rem' }}>
            <span className="tech-tag">FastAPI</span>
            <span className="tech-tag">PostgreSQL</span>
            <span className="tech-tag">Razorpay API</span>
            <span className="tech-tag">React</span>
            <span className="tech-tag">SQLAlchemy</span>
            <span className="tech-tag">Pydantic</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" onClick={() => alert('ScriptSense project case study details.')}>
              <span>View Case Study</span>
              <ExternalLink size={15} />
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary">
              <Github size={15} />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CONTACT & CALL-TO-ACTION (100vh)
          ========================================================================= */}
      <section id="contact" className="scroll-section" style={{ justifyContent: 'center' }}>
        <div className="interactive-content glass-card" style={{ maxWidth: '680px', width: '100%', textAlign: 'center' }}>
          <div className="badge" style={{ margin: '0 auto 0.75rem auto' }}>
            <Mail size={13} color="#D4AF37" />
            <span>Opportunities & Contact</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>
            Let's Build High-Impact Systems
          </h2>

          <p className="section-desc" style={{ maxWidth: '540px', margin: '0 auto 1.8rem auto' }}>
            Actively seeking high-impact engineering roles in Full-Stack development, AI/ML systems, and backend architecture. Let's connect!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <a href="mailto:manthan.sharma@example.com" className="btn-primary">
              <Mail size={16} />
              <span>Get In Touch</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary">
              <Github size={16} />
              <span>GitHub</span>
              <ArrowUpRight size={14} color="#71717A" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-secondary">
              <Linkedin size={16} color="#0A66C2" />
              <span>LinkedIn</span>
              <ArrowUpRight size={14} color="#71717A" />
            </a>
          </div>

          {/* Footer bar */}
          <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#71717A' }}>
            <span>© 2026 Manthan Sharma</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37' }}></span>
              <span>FastAPI • React • PostgreSQL • Three.js</span>
            </div>
          </div>
        </div>
      </section>
    </Scroll>
  )
}
