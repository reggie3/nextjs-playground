import { ThreeEvent } from "@react-three/fiber";
import ParticlesClickableBackground from "../ParticlesClickableBackground/ParticlesClickableBackground";
import { Box, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { MultiSpheres } from "../MultiSpheres";
import { useState } from "react";

export interface ParticlesContentProps {}
const ParticlesContent = (props: ParticlesContentProps) => {
  const { cameraPos, cameraZoom, setCameraControls } = useParticleControls();

  const [particlePos, setParticlePos] = useState<[number, number]>([0, 0]);
  const onClick = (event: ThreeEvent<MouseEvent>) => {
    console.log(event.point.x, event.point.y);
  };
  return (
    <group name="content">
      <Stars />
      <ParticlesClickableBackground onClick={onClick} />
      <MultiSpheres pos={particlaPos} />
    </group>
  );
};
export default ParticlesContent;
