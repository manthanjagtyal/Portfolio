import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export default function Lighting() {
  const dirLightRef   = useRef()
  const pointLightRef = useRef()

  useFrame((state, delta) => {
    const mx = state.pointer.x
    const my = state.pointer.y

    // Mouse-reactive key light shift — kept, but light no longer casts shadows
    // so this costs nothing for shadow recalculation
    if (dirLightRef.current) {
      dirLightRef.current.position.x = THREE.MathUtils.damp(
        dirLightRef.current.position.x, 6 + mx * 2.0, 2.5, delta
      )
      dirLightRef.current.position.y = THREE.MathUtils.damp(
        dirLightRef.current.position.y, 8 + my * 1.5, 2.5, delta
      )
      dirLightRef.current.position.z = THREE.MathUtils.damp(
        dirLightRef.current.position.z, 4 + mx * 1.2, 2.5, delta
      )
    }

    if (pointLightRef.current) {
      pointLightRef.current.position.x = THREE.MathUtils.damp(
        pointLightRef.current.position.x, mx * 1.5, 2.5, delta
      )
      pointLightRef.current.position.z = THREE.MathUtils.damp(
        pointLightRef.current.position.z, 2 + my * 1.0, 2.5, delta
      )
    }
  })

  return (
    <>
      {/* Hemisphere — sky/ground gradient, zero GPU cost */}
      <hemisphereLight color="#FFF5E0" groundColor="#FFC56E" intensity={0.85} />

      {/* Soft ambient fill */}
      <ambientLight color="#F9F6F0" intensity={0.6} />

      {/*
        FIX 2a — castShadow REMOVED from key light
        ────────────────────────────────────────────
        castShadow on a directional light forces Three.js to:
          • Render the entire scene from the light's POV every frame
          • Write a shadow depth map (512×512 = 262k pixels) every frame
        Since the object rotates, shadows would need updating anyway.
        Removing castShadow from the light eliminates this completely.
        The ContactShadows below (frames={1}) provides the ground shadow.
      */}
      <directionalLight
        ref={dirLightRef}
        position={[6, 8, 4]}
        intensity={2.8}
        color="#FFC56E"
        castShadow={false}
      />

      {/* Cool rim fill — no shadows needed */}
      <directionalLight
        position={[-5, -2, -4]}
        intensity={0.6}
        color="#B6D0E2"
        castShadow={false}
      />

      {/* Warm underglow — mouse reactive */}
      <pointLight
        ref={pointLightRef}
        position={[0, -3, 2]}
        intensity={1.0}
        color="#FFDF78"
        distance={8}
        castShadow={false}
      />

      {/*
        FIX 2b — ContactShadows baked with frames={1}
        ───────────────────────────────────────────────
        Default ContactShadows re-renders its internal scene every frame.
        frames={1} renders the shadow map exactly ONCE on mount and never again.
        The soft blob shadow beneath the object looks identical but costs
        ~0 GPU after the first frame (just a fullscreen quad texture read).
      */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.28}
        scale={10}
        blur={2.5}
        far={4}
        color="#18181B"
        frames={1}
      />
    </>
  )
}
