import { Sphere, useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import AtmosphereMaterial from "./materials/Atmosphere/AtmosphereMaterial";
import * as THREE from "three";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import {
  EARTH_RADIUS_KM_EQUATOR,
  EARTH_Y_TO_X_SCALE,
  UNIVERSAL_SCALE,
} from "../globeConstants";

type Props = {};

const INITIAL_EARTH_ARGS = [
  EARTH_RADIUS_KM_EQUATOR,
  20000 * UNIVERSAL_SCALE,
  20000 * UNIVERSAL_SCALE,
] as [number, number, number];

const Globe = (props: Props) => {
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
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
      blueGlowRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group name="globe">
      <Sphere
        args={INITIAL_EARTH_ARGS}
        position={[0, 0, 0]}
        name="globe"
        ref={globeRef}
        scale={[1, EARTH_Y_TO_X_SCALE, 1]}
      >
        {/* @ts-ignore Property 'globeMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
        {/* <globeMaterial
          key={GlobeMaterial.key}
          attach="material"
          globeTexture={globeTexture.current.map}
          bumpMap={globeTexture.current.bumpMap}
          roughnessMap={globeTexture.current.roughnessMap}
        /> */}
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
    </group>
  );
};

export default Globe;
