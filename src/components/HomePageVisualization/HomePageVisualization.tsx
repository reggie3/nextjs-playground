import { Box, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { HomePageVisualizationContent } from "./components/HomePageVisualizationContent";
import { Jellyfish } from "./types";
import { ClickableBackgroundPlane } from "./components/ClickableBackgroundPlane";
import { Jellies } from "./components/Jellies";
import MouseIndicator from "../MouseIndicator/MouseIndicator";

const MAX_LIFESPAN = 5;
const MIN_LIFE_SPAN = 40;

const HomePageVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [jellies, setJellies] = useState<Record<string, Jellyfish>>({});

  const addNewPosition = (position: Vector3, time: number) => {
    console.log("addNewPosition", position);
    const id = Date.now().toString();
    const hslColor = new THREE.Color(
      `hsl(${Math.round(Math.random() * 255)}, 100%, 50%)`
    );
    const vec3Color = new THREE.Vector3(hslColor.r, hslColor.g, hslColor.b);
    const newJelly: Jellyfish = {
      id,
      position,
      color: vec3Color,
      creationTime: time,
      speed: Math.random(),
      lifespanSeconds: Math.random() * MAX_LIFESPAN + MIN_LIFE_SPAN,
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
    <Canvas ref={canvasRef} id="home-page-canvas">
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
      <OrbitControls
        maxAzimuthAngle={0}
        minAzimuthAngle={0}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <primitive object={new THREE.AxesHelper(10)} visible={false} />
      {/* <Sphere position={[0, 0, -0]} args={[1, 20]}>
        <meshBasicMaterial color="hotpink" wireframe />
      </Sphere> */}
      <ClickableBackgroundPlane addNewPosition={addNewPosition} />
      <Jellies jellies={jellies} killJellyfish={killJellyfish} />
      <MouseIndicator />
    </Canvas>
  );
};

export default HomePageVisualization;
