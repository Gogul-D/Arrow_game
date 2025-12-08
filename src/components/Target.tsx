import { Cylinder } from '@react-three/drei'
import { useCylinder } from '@react-three/cannon'

export function Target({ position = [0, 1.5, -10] }: { position?: [number, number, number] }) {
    // Physics body is rotated to face camera
    const [ref] = useCylinder(() => ({
        mass: 0,
        position,
        rotation: [Math.PI / 2, 0, 0],
        args: [1.5, 1.5, 0.2, 32]
    }))

    return (
        <group ref={ref as any}>
            {/* Rings - No extra rotation needed as parent is already rotated */}
            {/* White (1-2) */}
            <Cylinder args={[1.5, 1.5, 0.1, 32]} position={[0, 0.05, 0]}>
                <meshStandardMaterial color="white" />
            </Cylinder>
            {/* Black (3-4) */}
            <Cylinder args={[1.2, 1.2, 0.11, 32]} position={[0, 0.06, 0]}>
                <meshStandardMaterial color="black" />
            </Cylinder>
            {/* Blue (5-6) */}
            <Cylinder args={[0.9, 0.9, 0.12, 32]} position={[0, 0.07, 0]}>
                <meshStandardMaterial color="#3b82f6" />
            </Cylinder>
            {/* Red (7-8) */}
            <Cylinder args={[0.6, 0.6, 0.13, 32]} position={[0, 0.08, 0]}>
                <meshStandardMaterial color="#ef4444" />
            </Cylinder>
            {/* Yellow (9-10) */}
            <Cylinder args={[0.3, 0.3, 0.14, 32]} position={[0, 0.09, 0]}>
                <meshStandardMaterial color="#fbbf24" />
            </Cylinder>

            {/* Stand - Adjust rotation relative to the now-rotated parent */}
            {/* Parent is X=90. Y is Z. Z is -Y. */}
            {/* We want legs to go DOWN in world space. World Down is -Y. */}
            {/* In local space (X=90), World -Y is Local -Z. */}
            {/* So legs should point along -Z locally. */}

            <Cylinder args={[0.05, 0.05, 2, 8]} position={[-0.8, 0, -1.2]} rotation={[-0.2, 0, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 2, 8]} position={[0.8, 0, -1.2]} rotation={[-0.2, 0, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 2, 8]} position={[0, -0.8, -1.2]} rotation={[0.4, 0, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Cylinder>
        </group>
    )
}
