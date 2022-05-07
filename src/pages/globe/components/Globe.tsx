import { Sphere, useTexture } from "@react-three/drei";
import React from "react";

type Props = {};

const Globe = (props: Props) => {
  const globeTextures = useTexture({
    map: "./images/globe/earth_texture_02.webp",
    normalMap: "./images/globe/earth_texture_02_nrm.webp",
    bumpMap: "./images/globe/earth_texture_02_nrm.webp",
    roughnessMap: "./images/globe/earth_texture_02_spec.webp",
  });

  return (
    <Sphere args={[5, 75, 75]} position={[0, 0, 0]}>
      <meshStandardMaterial {...globeTextures} />
    </Sphere>
  );
};

export default Globe;
