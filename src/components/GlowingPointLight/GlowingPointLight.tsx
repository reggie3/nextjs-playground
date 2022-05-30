import { Dodecahedron, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { BloomMaterial } from "../../Materials/BloomMaterial";
import useGlowingPointLightControl from "./useGlowingPointLightControls";

export interface GlowingPointLightProps {
  color: string;
  intensity: number;
  distance: number;
  decay: number;
  position: [number, number, number];
  setRef: (ref: THREE.PointLight) => void;
}
const GlowingPointLight = ({
  color,
  intensity,
  distance,
  decay,
  position,
  setRef,
}: GlowingPointLightProps) => {
  console.log({ color, intensity, distance, decay, position, setRef });
  const glowRingsRef = useRef<THREE.Mesh[]>([]);
  const rgbColor = new THREE.Color(color).toArray();

  const { intensity: bloomIntensity, radiance: bloomRadiance } =
    useGlowingPointLightControl();

  useFrame(() => {
    glowRingsRef.current.forEach((ring) => {
      //   console.log("ring", ring);
      //   debugger;
      if (ring) {
        // const material as THREE.Material = ring.material
        // console.log("updating ring");
        (ring.material as THREE.ShaderMaterial).uniforms.color.value = rgbColor;
        (ring.material as THREE.ShaderMaterial).uniforms.intensity.value =
          bloomIntensity;
        (ring.material as THREE.ShaderMaterial).uniforms.radiance.value =
          bloomRadiance;
        //   (ring.material as THREE.Material).opacity = 0.5;
        //   (ring.material as THREE.Material).color = new THREE.Color(color);
      }
    });
  });

  return (
    <group name="glowing-point-light">
      <pointLight
        args={[color, intensity, distance, decay]}
        position={[2, 2, 2]}
        ref={setRef}
        castShadow
        userData={{ name: "glowing-point-light" }}
      >
        <Dodecahedron
          args={[0.1, 10]}
          ref={(ref: THREE.Mesh) => {
            glowRingsRef.current.push(ref);
          }}
        >
          {/* <meshBasicMaterial /> */}
          {/* @ts-ignore Property 'bloomMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
          <bloomMaterial
            key={BloomMaterial.key}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </Dodecahedron>
        {/* <Dodecahedron
          args={[0.15, 10]}
          ref={(ref: THREE.Mesh) => {
            glowRingsRef.current.push(ref);
          }}
        >
          <meshBasicMaterial transparent opacity={0.75} />
        </Dodecahedron>
        <Dodecahedron
          args={[0.2, 10]}
          ref={(ref: THREE.Mesh) => {
            glowRingsRef.current.push(ref);
          }}
        >
          <meshBasicMaterial transparent opacity={0.5} />
        </Dodecahedron>
        <Dodecahedron
          args={[0.25, 10]}
          ref={(ref: THREE.Mesh) => {
            glowRingsRef.current.push(ref);
          }}
        >
          <meshBasicMaterial transparent opacity={0.25} />
        </Dodecahedron> */}
      </pointLight>
    </group>
  );
};
export default GlowingPointLight;
