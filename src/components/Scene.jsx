import React from 'react'
import Lighting from './Lighting'
import FloatingCenterpiece from './FloatingCenterpiece'
import CameraController from './CameraController'
import PostFX from './PostFX'

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#FAFAFA']} />

      <CameraController />
      <Lighting />
      <FloatingCenterpiece position={[0, 0, 0]} />
      <PostFX />
    </>
  )
}
