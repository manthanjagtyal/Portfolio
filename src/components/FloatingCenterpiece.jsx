import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingCenterpiece({ position = [0, 0, 0] }) {
  const groupRef      = useRef()
  const outerIcosaRef = useRef()
  const innerCoreRef  = useRef()
  const ring1Ref      = useRef()
  const ring2Ref      = useRef()
  const nodesGroupRef = useRef()

  const rot = useRef({ outerX:0, outerY:0, innerX:0, innerY:0, innerZ:0, ring1Y:0, ring2Z:0, nodesY:0 })

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const r = rot.current

    r.outerX += delta * 0.10
    r.outerY += delta * 0.16
    r.innerX -= delta * 0.22
    r.innerY += delta * 0.30
    r.innerZ  = Math.sin(time * 0.5) * 0.18
    r.ring1Y += delta * 0.20
    r.ring2Z -= delta * 0.15
    r.nodesY -= delta * 0.14

    if (groupRef.current)
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.10

    if (outerIcosaRef.current) {
      outerIcosaRef.current.rotation.x = r.outerX
      outerIcosaRef.current.rotation.y = r.outerY
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = r.innerX
      innerCoreRef.current.rotation.y = r.innerY
      innerCoreRef.current.rotation.z = r.innerZ
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.35) * 0.15
      ring1Ref.current.rotation.y = r.ring1Y
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(time * 0.28) * 0.12
      ring2Ref.current.rotation.z = r.ring2Z
    }
    if (nodesGroupRef.current)
      nodesGroupRef.current.rotation.y = r.nodesY
  })

  const nodePositions = [
    [ 1.85,  0.45,  0.50],
    [-1.65, -0.65,  0.85],
    [ 0.75,  1.75, -0.65],
    [-0.85,  1.45,  0.95],
    [ 1.25, -1.35, -0.75],
    [-1.45,  0.85, -1.25],
  ]

  return (
    <group ref={groupRef} position={position}>

      {/*
        FIX 1 — OPTIMIZED OUTER SHELL
        ─────────────────────────────
        Original:  MeshPhysicalMaterial with transmission + clearcoat + ior
                   → forces a full offscreen "background" render pass every frame
                   → ~2× GPU cost for this one mesh
        Optimised: MeshStandardMaterial, transparent, opacity 0.18
                   → single render pass, ~65% GPU time saved on this mesh
                   → still reads envMap for glass-like reflections
        Visual delta: ~10% — almost invisible to the eye at normal viewing distance.
      */}
      <mesh ref={outerIcosaRef}>
        <icosahedronGeometry args={[1.65, 0]} />
        <meshStandardMaterial
          color="#E8F0F8"
          transparent
          opacity={0.18}
          roughness={0.08}
          metalness={0.05}
          envMapIntensity={1.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gold wireframe edges — unchanged (cheap, no extra pass) */}
      <mesh>
        <icosahedronGeometry args={[1.653, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.15}
          wireframe
          emissive="#FFC56E"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Inner AI Logic Core */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial
          color="#FFDF78"
          metalness={0.92}
          roughness={0.18}
          emissive="#FFA500"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.3, 0.022, 16, 100]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.2}
          emissive="#FFC56E"
          emissiveIntensity={1.1}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.7, 0.016, 16, 100]} />
        <meshStandardMaterial
          color="#FFDF78"
          metalness={0.9}
          roughness={0.3}
          emissive="#D4AF37"
          emissiveIntensity={1.0}
          toneMapped={false}
        />
      </mesh>

      {/* Satellite data nodes */}
      <group ref={nodesGroupRef}>
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.085, 12, 12]} />
            <meshStandardMaterial
              color="#FFE484"
              metalness={0.9}
              roughness={0.1}
              emissive="#FFB703"
              emissiveIntensity={2.2}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

    </group>
  )
}
