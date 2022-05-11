import { Sphere, useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import { AtmosphereMaterial } from "./AtmosphereMaterial/";
import * as THREE from "three";
import { Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import {
  EARTH_RADIUS_KM_EQUATOR,
  EARTH_Y_TO_X_SCALE,
  UNIVERSAL_SCALE,
} from "./globeConstants";
import LocationMarker, {
  LocationMarkerData,
} from "../LocationMarker/LocationMarker";
import LocationMarkers from "../LocationMarkers/LocationMarkers";

type Props = {};

export const INITIAL_EARTH_ARGS = [
  EARTH_RADIUS_KM_EQUATOR,
  20000 * UNIVERSAL_SCALE,
  20000 * UNIVERSAL_SCALE,
] as [number, number, number];

const locations: LocationMarkerData[] = [
  { coords: [23.6345, -102.5528], name: "Mexico City" },
  // { coords: [36.56, -76.17], name: "Home" },
  // { coords: [-22.9068, -43.1729], name: "Rio" },
  // { coords: [20.5937, 76.9629], name: "India" },
  // { coords: [19.8968, -155.5858], name: "Hawaii" },
  // { coords: [1.3521, 109.8198], name: "Singapore" },
];

const Globe = (props: Props) => {
  const groupRef = useRef<Group>(null);
  const globeRef = useRef<Mesh>(null);
  const blueGlowRef = useRef<Mesh>(null);

  const globeTexture = useRef(
    useTexture({
      map: "./images/globe/earth_texture_02.webp",
      //normalMap: "./images/globe/earth_texture_02_nrm.webp",
      bumpMap: "./images/globe/earth_texture_02_nrm.webp",
      //roughnessMap: "./images/globe/earth_texture_02_spec.webp",
      displacementMap: "./images/globe/earth_texture_02_nrm.webp",
    })
  );

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group name="globe" ref={groupRef}>
      <Sphere
        args={INITIAL_EARTH_ARGS}
        position={[0, 0, 0]}
        name="globe"
        ref={globeRef}
        scale={[1, EARTH_Y_TO_X_SCALE, 1]}
        // this initial rotation is required to make the globe texture match the earth's longitude
        rotation={[0, (-90 / 180) * Math.PI, 0]}
      >
        <meshStandardMaterial
          attach="material"
          {...globeTexture.current}
          bumpScale={1}
          roughness={1.0}
          displacementScale={1}
        />
      </Sphere>
      <Sphere
        args={INITIAL_EARTH_ARGS}
        position={[0, 0, 0]}
        name="blue-glow"
        scale={[1.01, 1.01, 1.01]}
        ref={blueGlowRef}
      >
        <meshStandardMaterial
          attach="material"
          transparent
          color={"#33f"}
          opacity={0.2}
        />
      </Sphere>
      <Sphere
        args={INITIAL_EARTH_ARGS}
        position={[0, 0, 0]}
        name="atmosphere-glow"
        scale={[1.1, 1.1, 1.1]}
      >
        {/* @ts-ignore Property 'atmosphereMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
        <atmosphereMaterial
          key={AtmosphereMaterial.key}
          attach="material"
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>
      <LocationMarkers locations={locations} globeRef={globeRef} />
    </group>
  );
};

export default Globe;
