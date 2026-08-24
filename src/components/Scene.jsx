import React from 'react'
import Lighting from './Lighting'
import FloatingCenterpiece from './FloatingCenterpiece'
import CameraController from './CameraController'
import PostFX from './PostFX'
import GSAPTicker from './GSAPTicker'

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#FAFAFA']} />

      {/* Fix 3: GSAP synced to Three.js RAF — one loop, zero micro-stutter */}
      <GSAPTicker />

      <CameraController />
      <Lighting />
      <FloatingCenterpiece position={[0, 0, 0]} />
      <PostFX />
    </>
  )
}
