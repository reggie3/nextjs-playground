import vertexShader from "./clickPointVertex.glsl";
import fragmentShader from "./clickPointFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Vector3 } from "three";

const ClickPointMaterial = shaderMaterial(
  {
    uTime: 0,
    v3Color: new Vector3(),
  },
  vertexShader,
  fragmentShader
);

extend({ ClickPointMaterial });

export default ClickPointMaterial;
