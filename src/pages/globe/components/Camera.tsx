import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";

type Props = {};

const Camera = (props: Props) => {
  const { size } = useThree();

  return (
    <PerspectiveCamera
      args={[75, size.width / size.height, 0.1, 1000]}
      position={[0, 0, 15]}
      makeDefault
      {...props}
    />
  );
};

export default Camera;
