import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

/**
 * GSAPTicker
 *
 * Removes GSAP from its own independent requestAnimationFrame loop and
 * drives it manually from inside React Three Fiber's useFrame.
 *
 * Result: one single RAF loop (Three.js owns it). GSAP and Three.js are
 * guaranteed to be in sync on the same frame — zero micro-stutter from
 * two independent loops firing at slightly different timestamps.
 */
export default function GSAPTicker() {
  useEffect(() => {
    // Detach GSAP from its own RAF
    gsap.ticker.remove(gsap.updateRoot)

    return () => {
      // Restore GSAP's own ticker when component unmounts
      gsap.ticker.add(gsap.updateRoot)
    }
  }, [])

  useFrame(({ clock }) => {
    // Drive GSAP with Three.js elapsed time (same RAF frame, same timestamp)
    gsap.updateRoot(clock.getElapsedTime())
  })

  return null
}
