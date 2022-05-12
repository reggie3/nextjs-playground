import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

type Props = {};

const HomePageVisualization = (props: Props) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default HomePageVisualization;
