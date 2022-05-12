import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import {
  EARTH_RADIUS_KM_EQUATOR,
  INITIAL_CAMERA_HEIGHT_ABOVE_EARTH_KM,
} from "../globeConstants";

type Props = {};

const Camera = (props: Props) => {
  const { size } = useThree();

  return (
    <PerspectiveCamera
      // Constructor
      // PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
      // fov — Camera frustum vertical field of view.
      // aspect — Camera frustum aspect ratio.
      // near — Camera frustum near plane.
      // far — Camera frustum far plane.
      args={[75, size.width / size.height, 0.1, 100000]}
      position={[
        0,
        0,
        EARTH_RADIUS_KM_EQUATOR + INITIAL_CAMERA_HEIGHT_ABOVE_EARTH_KM,
      ]}
      makeDefault
      {...props}
    />
  );
};

export default Camera;
