import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollStore } from './store/scrollStore'
import Scene from './components/Scene'
import HtmlOverlay from './components/HtmlOverlay'
import { ArrowUpRight } from 'lucide-react'

// Register GSAP plugin once at module level
gsap.registerPlugin(ScrollTrigger)

// FIX 3a — Disable GSAP lag smoothing
// Without this, GSAP tries to "catch up" missed frames after a tab switch or
// focus loss, which causes a violent stutter burst when you return to the tab.
// lagSmoothing(0) = treat every frame as exactly delta ms, no catch-up.
gsap.ticker.lagSmoothing(0)

// ─── Error Boundary ──────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, info) { console.error('[3D Portfolio]', error, info) }
  render() {
    if (this.state.hasError) return (
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', background:'#FAFAFA',
        fontFamily:'system-ui', gap:'1rem', padding:'2rem' }}>
        <div style={{ fontSize:'2rem' }}>⚠️</div>
        <div style={{ fontWeight:600 }}>Scene Error</div>
        <pre style={{ fontSize:'0.78rem', color:'#71717A', maxWidth:500,
          background:'#F4F4F5', padding:'1rem', borderRadius:'10px',
          wordBreak:'break-all', whiteSpace:'pre-wrap' }}>
          {this.state.error?.message}
        </pre>
        <button style={{ padding:'0.6rem 1.4rem', background:'#18181B', color:'#fff',
          border:'none', borderRadius:'8px', cursor:'pointer' }}
          onClick={() => this.setState({ hasError:false, error:null })}>
          Retry
        </button>
      </div>
    )
    return this.props.children
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    /**
     * GSAP ScrollTrigger — the ONLY scroll listener.
     *
     * onUpdate fires on every native scroll frame (high-frequency, no React).
     * It directly mutates scrollStore.current — a plain JS object.
     * No setState, no dispatch, no re-renders triggered whatsoever.
     *
     * The R3F useFrame loop in CameraController reads scrollStore.current
     * independently at GPU frame rate and lerps the camera there.
     * The two loops (scroll events & RAF) are completely decoupled.
     */
    const trigger = ScrollTrigger.create({
      scroller: container,
      trigger:  container,
      start:    'top top',
      end:      'bottom bottom',
      onUpdate: (self) => {
        scrollStore.current = self.progress  // direct mutation, zero overhead
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* ── Fixed Canvas — never moves, always full screen ─────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <ErrorBoundary>
          <Canvas
            frameloop="always"
            dpr={[1, 1.5]}            {/* FIX 5 — cap DPR: 2.0 = 4× pixels on retina, lethal */}
            camera={{ position: [0, 0.4, 6.2], fov: 45 }}
            gl={{
              antialias: false,         {/* postprocessing handles AA, disable GL-level AA */}
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
              powerPreference: 'high-performance',
              stencil: false,
              depth: true,
            }}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* ── Native scroll container — HTML scrolls at full browser speed ─ */}
      {/*    pointer-events: none on the container itself so mouse hover    */}
      {/*    events reach the canvas; interactive children restore it.      */}
      <div
        ref={scrollContainerRef}
        style={{
          position:   'absolute',
          inset:      0,
          overflowY:  'scroll',
          overflowX:  'hidden',
          zIndex:     1,
          // No background — canvas is visible through this layer
        }}
      >
        <HtmlOverlay />
      </div>

      {/* ── Fixed navigation — always on top ─────────────────────────────── */}
      <header className="nav-header" style={{ zIndex: 50 }}>
        <div className="brand-logo">
          <div className="brand-dot" />
          <span>MANTHAN SHARMA</span>
        </div>

        <nav className="nav-links">
          {[
            ['Tech Stack',  'tech-stack'],
            ['ScriptSense', 'featured-work'],
            ['Contact',     'contact'],
          ].map(([label, id]) => (
            <span key={id} onClick={() => {
              const el = scrollContainerRef.current?.querySelector(`#${id}`)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}>
              {label}
            </span>
          ))}
        </nav>

        <a href="mailto:manthan.sharma@example.com" className="nav-cta">
          <span>Get in Touch</span>
          <ArrowUpRight size={15} />
        </a>
      </header>

    </div>
  )
}
