import { ThreeEvent } from "@react-three/fiber";
import ParticlesClickableBackground from "../ParticlesClickableBackground/ParticlesClickableBackground";
import { Box, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { MultiSpheres } from "../MultiSpheres";
import { useState } from "react";
import useParticlesControls from "../../useParticlesControls";
import { MultiPlanes } from "../MultiPlanes";

const ParticlesContent = () => {
  const { cameraPos, cameraZoom, setCameraControls } = useParticlesControls();

  const [particlePos, setParticlePos] = useState<[number, number]>([0, 0]);
  const onClick = (event: ThreeEvent<MouseEvent>) => {
    console.log(event.point.x, event.point.y);
    setParticlePos([event.point.x, event.point.y]);
  };

  return (
    <group name="content">
      <Stars />
      <ParticlesClickableBackground onClick={onClick} />
      {/* <MultiSpheres pos={pos} /> */}
      <MultiPlanes pos={particlePos} />
    </group>
  );
};
export default ParticlesContent;
