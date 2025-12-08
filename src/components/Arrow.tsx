import { useCylinder } from '@react-three/cannon'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Arrow({ position, velocity, onHit }: { position: [number, number, number], velocity: [number, number, number], onHit: (position: THREE.Vector3) => void }) {
    const [ref, api] = useCylinder(() => ({
        mass: 0.1,
        position,
        rotation: [0, 0, 0],
        args: [0.02, 0.02, 1, 8],
        linearDamping: 0.1,
        angularDamping: 0.5,
        onCollide: (e) => {
            if (e.body.name !== 'arrow') {
                onHit(new THREE.Vector3(e.contact.contactPoint[0], e.contact.contactPoint[1], e.contact.contactPoint[2]))
            }
        }
    }))

    const velocityRef = useRef<[number, number, number]>(velocity)

    useEffect(() => {
        api.velocity.set(velocity[0], velocity[1], velocity[2])

        // Initial rotation to match velocity
        const direction = new THREE.Vector3(velocity[0], velocity[1], velocity[2]).normalize()
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)
        api.quaternion.set(targetQuaternion.x, targetQuaternion.y, targetQuaternion.z, targetQuaternion.w)

        // Subscribe to velocity to update rotation in real-time
        const unsubscribe = api.velocity.subscribe((v) => {
            velocityRef.current = v
        })
        return unsubscribe
    }, [])

    useFrame(() => {
        // Orient arrow along velocity vector
        const v = velocityRef.current
        if (Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2]) > 0.1) {
            // const direction = new THREE.Vector3(v[0], v[1], v[2]).normalize()
            // const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)
            // We can't directly set rotation on the body every frame without fighting physics.
        }
    })

    return (
        <mesh ref={ref as any}>
            <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
            <meshStandardMaterial color="white" />
            <mesh position={[0, 0.5, 0]}>
                <coneGeometry args={[0.04, 0.1, 8]} />
                <meshStandardMaterial color="gray" />
            </mesh>
            <mesh position={[0, -0.4, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </mesh>
    )
}
