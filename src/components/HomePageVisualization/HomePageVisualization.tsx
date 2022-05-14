import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { HomePageVisualizationContent } from "./components/HomePageVisualizationContent";
import { ClickPoint, Jellyfish } from "./types";
import { ClickableBackgroundPlane } from "./components/ClickableBackgroundPlane";
import { Jellies } from "./components/Jellies";

const HomePageVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [jellies, setJellies] = useState<Record<string, Jellyfish>>({});

  const addNewPosition = (position: Vector3, time: number) => {
    const id = Date.now().toString();
    const newJelly: Jellyfish = {
      id,
      position,
      color: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
      creationTime: time,
      speed: Math.random(),
      lifespanSeconds: Math.random() * 10,
      isDead: false,
    };
    const newJellies = { ...jellies, [id]: newJelly };
    setJellies(newJellies);
  };

  const killJellyfish = (idToDelete: string) => {
    console.log("kill", idToDelete);
    const { [idToDelete]: id, ...rest } = jellies;
    setJellies(rest);
  };

  return (
    <Canvas ref={canvasRef}>
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
      <Jellies jellies={jellies} killJellyfish={killJellyfish} />
    </Canvas>
  );
};

export default HomePageVisualization;
