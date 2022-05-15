import vertexShader from "./jellyfishVertex.glsl";
import fragmentShader from "./jellyfishFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Vector3 } from "three";

const JellyfishMaterial = shaderMaterial(
  {
    uTime: 0,
    uSpeed: Math.random() * 0.25 + 0.05,
    v3Color: new Vector3(),
    lookAt: new Vector3(),
  },
  vertexShader,
  fragmentShader
);

extend({ JellyfishMaterial });

export default JellyfishMaterial;
