import vertexShader from "./outlineVertex.glsl";
import fragmentShader from "./outlineFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const OutlineMaterial = shaderMaterial(
  {
    elapsedTime: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ OutlineMaterial });

export default OutlineMaterial;
