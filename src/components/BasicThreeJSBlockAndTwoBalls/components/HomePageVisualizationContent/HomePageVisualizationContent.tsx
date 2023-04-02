import { Box, softShadows, Sphere, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { GlowingPointLight } from "../../../GlowingPointLight";
import useHomePageVisualizationControl from "./useHomePageVisualizationControl";

softShadows();

const HomePageVisualizationContent = () => {
  const boxRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (boxRef.current) {
      // boxRef.current.rotation.x += 0.005;
      boxRef.current.rotation.y -= 0.01;
    }
  });

  const {
    ambientIntensity,
    boxColor,
    pointLightIntensity,
    pointLightDistance,
    pointLightDecay,
    pointLightPos,
    pointLightColor,
    pointLightRadius,
    sphereColor,
  } = useHomePageVisualizationControl();

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.z -= 0.00005;
    }
    if (pointLightRef.current) {
      pointLightRef.current.position.x =
        Math.cos(clock.getElapsedTime()) * pointLightRadius;
      pointLightRef.current.position.y =
        Math.sin(clock.getElapsedTime()) * pointLightRadius;
    }
  });

  return (
    <group>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={ambientIntensity} />
      <GlowingPointLight
        color={pointLightColor}
        intensity={pointLightIntensity}
        distance={pointLightDistance}
        decay={pointLightDecay}
        position={pointLightPos}
        setRef={(ref: THREE.PointLight) => {
          pointLightRef.current = ref;
        }}
      />

      {/* <pointLight
        args={[
          pointLightColor,
          pointLightIntensity,
          pointLightDistance,
          pointLightDecay,
        ]}
        position={[pointLightPos.x, pointLightPos.y, pointLightPos.z]}
        ref={pointLightRef}
        castShadow
      >
        <Sphere args={[0.08, 10]}>
          <meshBasicMaterial color={pointLightColor} />
        </Sphere>
      </pointLight> */}
      <Stars ref={starsRef} />
      <Box
        args={[1, 1, 1]}
        ref={boxRef}
        rotation={[Math.PI / 4, Math.PI / 4, 0]}
        receiveShadow
        castShadow
      >
        <meshPhongMaterial
          color={boxColor}
          shininess={60}
          specular="#111111"
          emissive={"#0f0a0a"}
        />
      </Box>
      <Sphere args={[0.5, 10]} position={[2, 2, 0]} receiveShadow castShadow>
        <meshPhongMaterial color={sphereColor} />
      </Sphere>

      <Sphere args={[0.5, 10]} position={[-2, -2, 0]} receiveShadow castShadow>
        <meshPhongMaterial color={sphereColor} />
      </Sphere>
    </group>
  );
};
export default HomePageVisualizationContent;
