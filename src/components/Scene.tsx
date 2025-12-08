import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Sky, Environment, PerspectiveCamera, Text } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Target } from './Target'
import { Bow } from './Bow'
import { Arrow } from './Arrow'

interface SceneProps {
    setScore: React.Dispatch<React.SetStateAction<number>>
    isAiming: boolean
    setIsAiming: React.Dispatch<React.SetStateAction<boolean>>
}

function Field() {
    return (
        <group>
            {/* Grass Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#4ade80" />
            </mesh>

            {/* Field Lines */}
            {[-5, 5].map((x) => (
                <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, 0]}>
                    <planeGeometry args={[0.2, 100]} />
                    <meshStandardMaterial color="white" opacity={0.5} transparent />
                </mesh>
            ))}
            {[0, -10, -20, -30].map((z) => (
                <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z]}>
                    <planeGeometry args={[100, 0.1]} />
                    <meshStandardMaterial color="white" opacity={0.3} transparent />
                </mesh>
            ))}

            {/* Distance Markers */}
            <group position={[-3, 0.5, -10]}>
                <mesh>
                    <boxGeometry args={[1.5, 0.8, 0.1]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
                <Text position={[0, 0, 0.06]} fontSize={0.4} color="black" anchorX="center" anchorY="middle">
                    30m
                </Text>
            </group>
            <group position={[3, 0.5, -10]}>
                <mesh>
                    <boxGeometry args={[1.5, 0.8, 0.1]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
                <Text position={[0, 0, 0.06]} fontSize={0.4} color="black" anchorX="center" anchorY="middle">
                    30m
                </Text>
            </group>

            {/* Trees (Simple Low Poly) */}
            {[-15, 15].map((xSide) => (
                Array.from({ length: 10 }).map((_, i) => (
                    <group key={`${xSide}-${i}`} position={[xSide + (Math.random() * 5), 0, -i * 5 + 5]}>
                        {/* Trunk */}
                        <mesh position={[0, 1, 0]}>
                            <cylinderGeometry args={[0.3, 0.4, 2, 6]} />
                            <meshStandardMaterial color="#5c3a21" />
                        </mesh>
                        {/* Leaves */}
                        <mesh position={[0, 3, 0]}>
                            <coneGeometry args={[1.5, 4, 6]} />
                            <meshStandardMaterial color="#166534" />
                        </mesh>
                    </group>
                ))
            ))}

            {/* Mountains Background (Simple) */}
            <group>
                <mesh position={[0, -5, -60]}>
                    <planeGeometry args={[200, 50]} />
                    <meshBasicMaterial color="#a5b4fc" /> {/* Foggy mountain color */}
                </mesh>
                {/* Peaks */}
                {[-40, -20, 0, 20, 40].map((x) => (
                    <mesh key={x} position={[x, 10, -59]} rotation={[0, 0, Math.PI / 4]}>
                        <coneGeometry args={[15, 30, 4]} />
                        <meshBasicMaterial color="#e0e7ff" />
                    </mesh>
                ))}
            </group>
        </group>
    )
}

function GameController({ setScore, isAiming, setIsAiming }: SceneProps) {
    const { camera } = useThree()
    const [arrows, setArrows] = useState<{ id: string, position: [number, number, number], velocity: [number, number, number] }[]>([])
    const aimStartTime = useRef<number>(0)

    useEffect(() => {
        const handleMouseDown = () => {
            setIsAiming(true)
            aimStartTime.current = Date.now()
        }

        const handleMouseUp = () => {
            if (!isAiming) return
            setIsAiming(false)

            const duration = Math.min(Date.now() - aimStartTime.current, 2000)
            const power = 25 + (duration / 2000) * 25

            const direction = new THREE.Vector3(0, 0, -1)
            direction.applyQuaternion(camera.quaternion)
            direction.y += 0.03
            direction.normalize()

            const velocity: [number, number, number] = [
                direction.x * power,
                direction.y * power,
                direction.z * power
            ]

            const spawnPos = new THREE.Vector3(0, 0, -0.5).applyQuaternion(camera.quaternion).add(camera.position)

            setArrows(prev => [...prev, { id: crypto.randomUUID(), position: [spawnPos.x, spawnPos.y, spawnPos.z], velocity }])
        }

        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isAiming, setIsAiming, camera, setArrows])

    useFrame((state) => {
        const targetEuler = new THREE.Euler(
            state.mouse.y * 0.2,
            -state.mouse.x * 0.5,
            0
        )
        camera.quaternion.slerp(new THREE.Quaternion().setFromEuler(targetEuler), 0.2)
        camera.position.set(0, 1.6, 8)
    })

    const handleHit = (pos: THREE.Vector3) => {
        const targetCenter = new THREE.Vector3(0, 1.5, -10)
        const distance = pos.distanceTo(targetCenter)

        let points = 0
        if (distance < 0.15) points = 10
        else if (distance < 0.30) points = 9
        else if (distance < 0.45) points = 8
        else if (distance < 0.60) points = 7
        else if (distance < 0.75) points = 6
        else if (distance < 0.90) points = 5
        else if (distance < 1.05) points = 4
        else if (distance < 1.20) points = 3
        else if (distance < 1.35) points = 2
        else if (distance < 1.50) points = 1

        if (points > 0) {
            setScore(prev => prev + points)
        }
    }

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight
                position={[10, 20, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            <Physics gravity={[0, -9.8, 0]}>
                <Field />
                <Target position={[0, 1.5, -10]} />

                {arrows.map(arrow => (
                    <Arrow
                        key={arrow.id}
                        position={arrow.position}
                        velocity={arrow.velocity}
                        onHit={handleHit}
                    />
                ))}
            </Physics>

            <Sky sunPosition={[100, 20, 100]} />
            <Environment preset="park" />
        </>
    )
}

export function Scene(props: SceneProps) {
    return (
        <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 1.6, 8]} fov={40}>
                {/* Bow Position: Tilted top-left as requested */}
                <group position={[0.2, -0.15, -0.5]} rotation={[0, 0, 0.1]}>
                    <Bow isAiming={props.isAiming} />
                </group>
            </PerspectiveCamera>

            <GameController {...props} />
        </Canvas>
    )
}
