import { Dodecahedron } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useRef } from "react";
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
  distance,
  decay,
  intensity,
  setRef,
}: GlowingPointLightProps) => {
  //   const {
  //     luminanceThreshold,
  //     luminanceSmoothing,
  //     height,
  //     intensity: glowIntensity,
  //     resolutionScale,
  //   } = useGlowingPointLightControl();
  const indicatorRef = useRef<THREE.Mesh>();
  const pointLightRef = useRef<THREE.PointLight>();
  return (
    <group name="glowing-point-light">
      {/* <pointLight args={["hotpink", 1, 2, 1]} position={[2, 2, 2]} /> */}
      <pointLight
        args={[color, intensity, distance, decay]}
        position={[2, 2, 2]}
        ref={(ref: THREE.PointLight) => {
          setRef(ref);
          pointLightRef.current = ref;
        }}
        castShadow
        userData={{ name: "glowing-point-light" }}
      >
        <Dodecahedron args={[0.08, 10]} ref={indicatorRef}>
          <meshBasicMaterial color={color} />
        </Dodecahedron>
      </pointLight>
      {/* <EffectComposer>
        <SelectiveBloom
          luminanceThreshold={luminanceThreshold}
          luminanceSmoothing={luminanceSmoothing}
          intensity={glowIntensity}
          resolutionScale={resolutionScale}
          height={height}
          selection={indicatorRef}
          lights={[pointLightRef]}
        />
      </EffectComposer> */}
    </group>
  );
};
export default GlowingPointLight;
