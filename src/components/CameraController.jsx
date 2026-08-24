import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '../store/scrollStore'

/** Smooth cubic easing: accelerates in, decelerates out */
function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}

/**
 * CameraController
 *
 * Reads scrollStore.current (mutated by GSAP) inside useFrame.
 * No useScroll, no ScrollControls dependency, no React state.
 * Runs entirely on the R3F render loop at native GPU frame rate.
 */
export default function CameraController() {
  const { camera } = useThree()

  // All state lives in refs — zero React renders from this component
  const smoothMouse   = useRef({ x: 0, y: 0 })
  const lookAt        = useRef(new THREE.Vector3(0, 0, 0))
  const lookAtGoal    = useRef(new THREE.Vector3(0, 0, 0))
  const smoothScroll  = useRef(0)  // Extra lerp on top of GSAP for camera lag

  useFrame((state, delta) => {
    // ------------------------------------------------------------------
    // 1. Read raw scroll progress from GSAP (no re-render triggered)
    // ------------------------------------------------------------------
    const raw = scrollStore.current // 0 → 1

    // Extra camera-specific smoothing so the camera trails the HTML scroll
    // rather than jumping with it. Damp factor 1.2 = very lazy/floaty.
    smoothScroll.current = THREE.MathUtils.damp(
      smoothScroll.current, raw, 1.2, delta
    )

    // Apply smoothstep easing so camera motion accelerates into sections
    // and decelerates out of them — feels cinematic, not mechanical.
    const p = smoothstep(smoothScroll.current)

    // ------------------------------------------------------------------
    // 2. Smooth mouse pointer — heavy damping kills micro-jitter
    // ------------------------------------------------------------------
    smoothMouse.current.x = THREE.MathUtils.damp(
      smoothMouse.current.x, state.pointer.x, 1.4, delta
    )
    smoothMouse.current.y = THREE.MathUtils.damp(
      smoothMouse.current.y, state.pointer.y, 1.4, delta
    )

    const mx = smoothMouse.current.x
    const my = smoothMouse.current.y

    // ------------------------------------------------------------------
    // 3. Compute orbital camera target from scroll progress
    // ------------------------------------------------------------------
    const angle  = p * Math.PI * 1.4 + 0.5   // ~252° sweep
    const radius = 6.0 - Math.sin(p * Math.PI) * 0.9
    const height = 0.3 + Math.sin(p * Math.PI * 1.2) * 1.3

    // Very subtle parallax (±0.2 units) — keeps canvas interactive while scrolling
    const targetX = Math.sin(angle) * radius + mx * 0.20
    const targetY = height                   + my * 0.15
    const targetZ = Math.cos(angle) * radius

    // ------------------------------------------------------------------
    // 4. Lazy camera follow — damp factor 1.4 = silky glide
    //    (lower = slower/smoother, higher = snappier)
    // ------------------------------------------------------------------
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 1.4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 1.4, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 1.4, delta)

    // ------------------------------------------------------------------
    // 5. Camera gaze — also trails behind for cinema-quality motion
    // ------------------------------------------------------------------
    lookAtGoal.current.set(
      mx * 0.08,
      Math.sin(p * Math.PI) * 0.12 + my * 0.06,
      0
    )
    lookAt.current.lerp(lookAtGoal.current, delta * 1.6)
    camera.lookAt(lookAt.current)
  })

  return null
}
