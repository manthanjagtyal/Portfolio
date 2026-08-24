/**
 * scrollStore.js
 *
 * A plain module-level object shared between the HTML layer (GSAP ScrollTrigger)
 * and the R3F 3D layer (useFrame). Using a plain object — not React state, not
 * a React ref — means mutations never trigger re-renders in any component.
 *
 * Pattern: write from outside React (GSAP), read inside R3F (useFrame).
 */
export const scrollStore = {
  current: 0,   // 0 → 1 raw progress from ScrollTrigger
}
