import { useRef } from 'react'
import { QuadraticBezierLine } from '@react-three/drei'
import * as THREE from 'three'

export function Bow({ isAiming }: { isAiming: boolean }) {
    const bowRef = useRef<THREE.Group>(null)

    return (
        <group ref={bowRef} rotation={[0, -Math.PI / 2, 0]}>
            <group rotation={[0, 0, Math.PI / 2]}>
                {/* Riser (Main Body) - Blue Metallic */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.04, 0.6, 0.05]} />
                    <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Grip */}
                <mesh position={[0.03, 0, 0]}>
                    <boxGeometry args={[0.04, 0.15, 0.04]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                {/* Upper Limb */}
                <mesh position={[0, 0.45, 0.1]} rotation={[0.2, 0, 0]}>
                    <boxGeometry args={[0.03, 0.4, 0.01]} />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* Lower Limb */}
                <mesh position={[0, -0.45, 0.1]} rotation={[-0.2, 0, 0]}>
                    <boxGeometry args={[0.03, 0.4, 0.01]} />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* Sight */}
                <group position={[-0.1, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.005, 0.005, 0.2, 8]} />
                        <meshStandardMaterial color="black" />
                    </mesh>
                    <mesh position={[0.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <ringGeometry args={[0.04, 0.05, 32]} />
                        <meshBasicMaterial color="black" side={THREE.DoubleSide} />
                    </mesh>
                    <mesh position={[0.1, 0, 0]}>
                        <sphereGeometry args={[0.005, 8, 8]} />
                        <meshBasicMaterial color="red" />
                    </mesh>
                </group>

                {/* Nocked Arrow (Visual Only) */}
                <group position={[0, 0, isAiming ? 0.6 : 0.25]} rotation={[Math.PI / 2, 0, 0]}>
                    {/* Shaft */}
                    <mesh position={[0, 0.35, 0]}>
                        <cylinderGeometry args={[0.005, 0.005, 0.7, 8]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                    {/* Fletching */}
                    <mesh position={[0, 0.65, 0]}>
                        <coneGeometry args={[0.02, 0.1, 4]} />
                        <meshStandardMaterial color="red" />
                    </mesh>
                    {/* Tip */}
                    <mesh position={[0, 0, 0]}>
                        <coneGeometry args={[0.01, 0.05, 8]} />
                        <meshStandardMaterial color="silver" />
                    </mesh>
                </group>

                {/* String */}
                <QuadraticBezierLine
                    start={[0, 0.65, 0.25]}
                    end={[0, -0.65, 0.25]}
                    mid={[0, 0, isAiming ? 0.6 : 0.25]}
                    color="black"
                    lineWidth={1.5}
                />
            </group>
        </group>
    )
}
