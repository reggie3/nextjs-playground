import { Box, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Globe } from "./Components/Globe";
import { Camera } from "./Components/Camera";
import {
  EARTH_RADIUS_KM_EQUATOR,
  STARS_DISTANCE,
  UNIVERSAL_SCALE,
} from "./Components/globeConstants";
import { PointLightExample } from "./Components/PointLightExample";

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
        <ambientLight intensity={0.25} />
        <pointLight
          position={[
            EARTH_RADIUS_KM_EQUATOR * 10,
            EARTH_RADIUS_KM_EQUATOR * 10,
            EARTH_RADIUS_KM_EQUATOR * 10,
          ]}
          intensity={0.5}
        />
        <Globe />
        {false && <PointLightExample />}
        <OrbitControls
          maxDistance={STARS_DISTANCE - 100 * UNIVERSAL_SCALE}
          minDistance={EARTH_RADIUS_KM_EQUATOR + 10 * UNIVERSAL_SCALE}
        />
        <Stars
          radius={STARS_DISTANCE}
          depth={50}
          count={15000}
          factor={4}
          saturation={1}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
};

export default index;
