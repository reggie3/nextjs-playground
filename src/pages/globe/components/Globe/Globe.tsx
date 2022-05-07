import { Sphere, useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import AtmosphereMaterial from "./materials/AtmosphereMaterial";
import GlobeMaterial from "./materials/GlobeMaterial";
import * as THREE from "three";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {};

const Globe = (props: Props) => {
  const globeRef = useRef<Mesh>(null);

  const globeTexture = useRef(
    useTexture({
      map: "./images/globe/earth_texture_02.webp",
      //normalMap: "./images/globe/earth_texture_02_nrm.webp",
      bumpMap: "./images/globe/earth_texture_02_nrm.webp",
      roughnessMap: "./images/globe/earth_texture_02_spec.webp",
    })
  );

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group name="globe">
      <Sphere
        args={[5, 75, 75]}
        position={[0, 0, 0]}
        name="globe"
        ref={globeRef}
      >
        {/* @ts-ignore Property 'globeMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
        <globeMaterial
          key={GlobeMaterial.key}
          attach="material"
          globeTexture={globeTexture.current.map}
          bumpMap={globeTexture.current.bumpMap}
          roughnessMap={globeTexture.current.roughnessMap}
        />
      </Sphere>
      <Sphere
        args={[5, 75, 75]}
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
