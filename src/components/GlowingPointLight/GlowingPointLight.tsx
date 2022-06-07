import { Dodecahedron, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { BloomMaterial } from "../../Materials/BloomMaterial";
import { GlowMaterial } from "../../Materials/GlowMaterial";
import { AtmosphereMaterial } from "../threeJsGlobe/Globe/AtmosphereMaterial";
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
  // console.log({ color, intensity, distance, decay, position, setRef });
  const ballRef = useRef<THREE.Mesh>();
  const glowRef = useRef<THREE.Mesh>();

  const { intensity: bloomIntensity, radiance } = useGlowingPointLightControl();

  useFrame(() => {
    const rgbColor = new THREE.Color(color).toArray();

    if (ballRef.current) {
      // (ballRef.current.material as THREE.ShaderMaterial).uniforms.color.value =
      //   rgbColor;
      // (
      //   ballRef.current.material as THREE.ShaderMaterial
      // ).uniforms.intensity.value = bloomIntensity;
      // (
      //   ballRef.current.material as THREE.ShaderMaterial
      // ).uniforms.radiance.value = radiance;
    }
    if (glowRef.current) {
      (glowRef.current.material as THREE.ShaderMaterial).uniforms.color.value =
        rgbColor;
      // (
      //   glowRef.current.material as THREE.ShaderMaterial
      // ).uniforms.intensity.value = bloomIntensity;
      // (
      //   glowRef.current.material as THREE.ShaderMaterial
      // ).uniforms.radiance.value = radiance;
    }
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
        {/* <Dodecahedron args={[0.2, 10]} ref={glowRef}>
          // {/* @ts-ignore Property 'glowMaterial' does not exist on type 'JSX.IntrinsicElements'. *
          <glowMaterial
            key={GlowMaterial.key}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </Dodecahedron> */}
        <Sphere args={[0.08, 20]} ref={ballRef}>
          {/* @ts-ignore Property 'bloomMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
          {/* <bloomMaterial
            key={BloomMaterial.key}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          /> */}
          <meshStandardMaterial color={color} />
        </Sphere>
      </pointLight>
    </group>
  );
};
export default GlowingPointLight;
