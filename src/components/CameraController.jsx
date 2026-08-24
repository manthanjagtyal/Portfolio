import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '../store/scrollStore'

/**
 * CameraController
 *
 * Reads native scroll progress without triggering React renders and applies one
 * frame-rate-independent smoothing pass before mapping it to the camera path.
 */
export default function CameraController() {
  const { camera } = useThree()

  // All state lives in refs — zero React renders from this component
  const smoothMouse   = useRef({ x: 0, y: 0 })
  const lookAt        = useRef(new THREE.Vector3(0, 0, 0))
  const lookAtGoal    = useRef(new THREE.Vector3(0, 0, 0))
  const smoothScroll  = useRef(0)

  useFrame((state, delta) => {
    // Ignore large resume deltas after the tab has been backgrounded.
    const frameDelta = Math.min(delta, 0.05)

    smoothScroll.current = THREE.MathUtils.damp(
      smoothScroll.current, scrollStore.current, 8, frameDelta
    )

    const p = smoothScroll.current

    smoothMouse.current.x = THREE.MathUtils.damp(
      smoothMouse.current.x, state.pointer.x, 8, frameDelta
    )
    smoothMouse.current.y = THREE.MathUtils.damp(
      smoothMouse.current.y, state.pointer.y, 8, frameDelta
    )

    const mx = smoothMouse.current.x
    const my = smoothMouse.current.y

    const angle  = p * Math.PI * 1.4 + 0.5   // ~252° sweep
    const radius = 6.0 - Math.sin(p * Math.PI) * 0.9
    const height = 0.3 + Math.sin(p * Math.PI * 1.2) * 1.3

    // Very subtle parallax (±0.2 units) — keeps canvas interactive while scrolling
    const targetX = Math.sin(angle) * radius + mx * 0.20
    const targetY = height                   + my * 0.15
    const targetZ = Math.cos(angle) * radius

    camera.position.set(targetX, targetY, targetZ)

    lookAtGoal.current.set(
      mx * 0.08,
      Math.sin(p * Math.PI) * 0.12 + my * 0.06,
      0
    )
    lookAt.current.lerp(lookAtGoal.current, 1 - Math.exp(-10 * frameDelta))
    camera.lookAt(lookAt.current)
  })

  return null
}
