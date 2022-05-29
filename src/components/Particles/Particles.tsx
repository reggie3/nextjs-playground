import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { ParticlesCameraController } from "./components/ParticlesCameraController";
import { ParticlesContent } from "./components/ParticlesContent";
import useParticlesControls from "./useParticlesControls";

const Particles = () => {
  const cameraRef = useRef<Camera>();

  const {
    cameraPos,
    cameraZoom,
    orbitControls: shouldUseOrbitControls,
  } = useParticlesControls();

  useEffect(() => {});
  return (
    <Canvas>
      {/* <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={cameraPos}
        zoom={cameraZoom}
      /> */}
      <axesHelper args={[10]} />
      <ambientLight />
      <ParticlesContent />
      {/* <ParticlesCameraController /> */}
      {shouldUseOrbitControls && <OrbitControls />}
    </Canvas>
  );
};
export default Particles;
