import React from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useThree } from '@react-three/fiber'
import { BlendFunction } from 'postprocessing'

/** Keep desktop bloom inexpensive and skip its full-scene pass on small screens. */
export default function PostFX() {
  const isCompactViewport = useThree((state) => state.size.width < 768)

  if (isCompactViewport) return null

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.92}
        luminanceSmoothing={0.3}
        intensity={0.5}
        resolutionScale={0.35}
        blendFunction={BlendFunction.ADD}
      />
    </EffectComposer>
  )
}
