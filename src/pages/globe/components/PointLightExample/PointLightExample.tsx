import { Box, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { EARTH_RADIUS_KM_EQUATOR } from "../Globe/globeConstants";

const SPHERE_SIZE = [0.5, 10, 10] as [number, number, number];
const LIGHT_DISTANCE = EARTH_RADIUS_KM_EQUATOR + 20;

const PointLightExample = () => {
  const redLightRef = React.useRef<THREE.PointLight>();
  const greenLightRef = React.useRef<THREE.PointLight>();
  const blueLightRef = React.useRef<THREE.PointLight>();
  const yellowLightRef = React.useRef<THREE.PointLight>();

  useFrame(({ clock }) => {
    if (redLightRef.current) {
      redLightRef.current.position.x =
        Math.sin(clock.getElapsedTime() * 0.6) * -LIGHT_DISTANCE;
      redLightRef.current.position.z =
        Math.cos(clock.getElapsedTime() * 0.6) * -LIGHT_DISTANCE;
    }
    if (greenLightRef.current) {
      greenLightRef.current.position.x =
        Math.sin(clock.getElapsedTime() * 0.3) * LIGHT_DISTANCE;
      greenLightRef.current.position.z =
        Math.cos(clock.getElapsedTime() * 0.3) * LIGHT_DISTANCE;
    }
    if (blueLightRef.current) {
      blueLightRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.7) * LIGHT_DISTANCE;
      blueLightRef.current.position.z =
        Math.cos(clock.getElapsedTime() * 0.7) * LIGHT_DISTANCE;
    }
    if (yellowLightRef.current) {
      yellowLightRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.5) * -LIGHT_DISTANCE;
      yellowLightRef.current.position.z =
        Math.cos(clock.getElapsedTime() * 0.5) * -LIGHT_DISTANCE;
    }
  });

  return (
    <group>
      <Box args={[20, 20, 20]}>
        <meshStandardMaterial color="white" />
      </Box>
      <pointLight
        args={["green", 1, 100]}
        position={[0, 0, LIGHT_DISTANCE]}
        intensity={10}
        ref={greenLightRef}
      >
        <Sphere args={SPHERE_SIZE}>
          <meshBasicMaterial color="green" />
        </Sphere>
      </pointLight>
      <pointLight
        args={["red", 1, 100]}
        position={[0, 0, -LIGHT_DISTANCE]}
        intensity={10}
        ref={redLightRef}
      >
        <Sphere args={SPHERE_SIZE}>
          <meshBasicMaterial color="red" />
        </Sphere>
      </pointLight>
      <pointLight
        args={["blue", 1, 100]}
        position={[0, LIGHT_DISTANCE, 0]}
        intensity={10}
        ref={blueLightRef}
      >
        <Sphere args={SPHERE_SIZE}>
          <meshBasicMaterial color="blue" />
        </Sphere>
      </pointLight>
      <pointLight
        args={["yellow", 1, 100]}
        position={[0, -LIGHT_DISTANCE, 0]}
        intensity={10}
        ref={yellowLightRef}
      >
        <Sphere args={SPHERE_SIZE}>
          <meshBasicMaterial color="yellow" />
        </Sphere>
      </pointLight>
    </group>
  );
};

export default PointLightExample;
