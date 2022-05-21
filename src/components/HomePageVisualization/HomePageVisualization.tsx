import React from "react";
import { Canvas } from "@react-three/fiber";
import { HomePageVisualizationContent } from "./components/HomePageVisualizationContent";
import { OrbitControls } from "@react-three/drei";

const HomePageVisualization = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6] }} shadows>
      <HomePageVisualizationContent />
      <OrbitControls />
    </Canvas>
  );
};

export default HomePageVisualization;
