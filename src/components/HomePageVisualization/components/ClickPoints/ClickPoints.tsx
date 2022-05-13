import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { ClickPointMaterial } from "./material";
import { ShaderMaterial, Vector3 } from "three";
import { ClickPoint } from "../../types";

type ClickPointsProps = {
  clickPoints: ClickPoint[];
};

const ClickPoints = ({ clickPoints }: ClickPointsProps) => {
  const clickPointsRef = useRef<Record<string, THREE.Mesh>>({});

  useFrame(({ clock }) => {
    if (clickPointsRef.current) {
      Object.values(clickPointsRef.current).forEach((clickPoint, index) => {
        const material = clickPoint.material as ShaderMaterial;

        material.uniforms.uTime.value = clock.getElapsedTime();
      });
    }
  });

  const setRef = (ref: THREE.Mesh, point: ClickPoint) => {
    console.log(ref);
    if (ref) {
      (ref.material as ShaderMaterial).transparent = true;
      (ref.material as ShaderMaterial).uniforms.v3Color.value = point.color;
    }
    clickPointsRef.current[point.id] = ref as THREE.Mesh;
  };

  return (
    <group name="click-points">
      {clickPoints.map((point, index) => {
        return (
          <Sphere
            args={[0.1, 20]}
            position={point.position}
            key={index}
            ref={(ref) => setRef(ref as THREE.Mesh, point)}
            userData={{ creationTime: Date.now(), index }}
          >
            {/* @ts-ignore Property 'clickPointMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
            <clickPointMaterial
              key={ClickPointMaterial.key}
              attach="material"
            />
          </Sphere>
        );
      })}
    </group>
  );
};

export default ClickPoints;
