import {
  Box,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { ClickableBackgroundPlane } from "./Components/ClickableBackgroundPlane";
import { ClickPoints } from "./Components/ClickPoints";
import { HomePageVisualizationContent } from "./Components/HomePageVisualizationContent";
import { ClickPoint } from "./types";

const HomePageVisualization = () => {
  const cameraRef = useRef<THREE.Camera>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);

  const addNewPosition = (position: Vector3) => {
    const newClickPoint: ClickPoint = {
      id: Date.now().toString(),
      position,
      color: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
    };
    setClickPoints((prevClickPoints) => [...prevClickPoints, newClickPoint]);
  };

  return (
    <Canvas ref={canvasRef}>
      <PerspectiveCamera ref={cameraRef} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <HomePageVisualizationContent />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <OrbitControls />
      <ClickableBackgroundPlane addNewPosition={addNewPosition} />
      <ClickPoints clickPoints={clickPoints} />
    </Canvas>
  );
};

export default HomePageVisualization;
