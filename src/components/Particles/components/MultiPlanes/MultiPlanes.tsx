import { useEffect, useRef, useState } from "react";
import { Plane } from "@react-three/drei";
import useParticlesControls from "../../useParticlesControls";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface MultiPlanesProps {
  pos: [number, number];
}
const MultiPlanes = ({ pos }: MultiPlanesProps) => {
  const particlesRef = useRef<{ mesh: THREE.Mesh; direction: Vector3 }[]>([]);
  const { color, number, size, speed, lifespan } = useParticlesControls();
  const [startTime, setStartTime] = useState(0);

  const { clock } = useThree();

  useFrame(() => {
    particlesRef.current.forEach(({ mesh, direction }) => {
      if (!mesh.visible) {
        mesh.visible = true;
      }

      mesh.position.addScaledVector(direction, speed);
    });
    if (clock.getElapsedTime() - startTime > lifespan) {
      particlesRef.current.forEach((particle) => {
        particle.mesh.visible = false;
      });
    }
  });

  useEffect(() => {
    if (particlesRef.current.length) {
      setStartTime(clock.getElapsedTime());
    }
  }, [clock, pos]);

  console.count("render");
  return (
    <group name="multi-spheres">
      {Array.from(Array(number)).map((_, index) => {
        const direction = new Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          0
        ).normalize();

        return (
          <Plane
            args={[size, size, 1]}
            position={[pos[0], pos[1], 0]}
            key={index}
            ref={(ref: THREE.Mesh) => {
              if (ref) {
                particlesRef.current.push({
                  mesh: ref,
                  direction,
                });
              }
            }}
          >
            <meshBasicMaterial color={color} />
          </Plane>
        );
      })}
    </group>
  );
};
export default MultiPlanes;
