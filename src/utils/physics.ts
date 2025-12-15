import * as THREE from 'three';

/**
 * Calculates the power of the arrow based on how long the bow was drawn.
 * @param durationMs Duration of the draw in milliseconds.
 * @returns The power value to apply to the arrow's velocity.
 */
export function calculateArrowPower(durationMs: number): number {
    // Cap duration at 2000ms (2 seconds)
    const clampedDuration = Math.min(durationMs, 2000);
    // Base power 25, max additional power 25 (total max 50)
    return 25 + (clampedDuration / 2000) * 25;
}

/**
 * Calculates the distance between two 3D points.
 * @param point1 First point
 * @param point2 Second point (e.g., target center)
 * @returns Distance between the points
 */
export function calculateDistance(point1: THREE.Vector3, point2: THREE.Vector3): number {
    return point1.distanceTo(point2);
}

/**
 * Calculates the score based on the distance from the target center.
 * @param distance Distance from the hit point to the target center.
 * @returns Points awarded (0-10).
 */
export function calculateScore(distance: number): number {
    if (distance < 0.15) return 10;
    if (distance < 0.30) return 9;
    if (distance < 0.45) return 8;
    if (distance < 0.60) return 7;
    if (distance < 0.75) return 6;
    if (distance < 0.90) return 5;
    if (distance < 1.05) return 4;
    if (distance < 1.20) return 3;
    if (distance < 1.35) return 2;
    if (distance < 1.50) return 1;
    return 0;
}
