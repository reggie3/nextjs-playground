import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Camera from "./components/Camera";
import Globe from "./components/Globe";

type Props = {};

const index = (props: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={["black"]} />
        <Camera />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Globe />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default index;
