import { Canvas } from "@react-three/fiber";
import React from "react";
import { HomePageVisualizationContent } from "./Components/HomePageVisualizationContent";

type Props = {};

const HomePageVisualization = (props: Props) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <HomePageVisualizationContent />
    </Canvas>
  );
};

export default HomePageVisualization;
