import { Box, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Camera } from "../threeJsGlobe/Camera";
import { STARS_DISTANCE } from "../threeJsGlobe/globeConstants";

const TriggerExample = () => {
  return (
    <Canvas dpr={[1, 2]}>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.25} />

      <OrbitControls />
      <Stars />
    </Canvas>
  );
};

export default TriggerExample;
