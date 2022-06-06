import vertexShader from "./glowVertex.glsl";
import fragmentShader from "./glowFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Vector3 } from "three";

const GlowMaterial = shaderMaterial(
  {
    size: new Vector3(),
    intensity: 1,
    radiance: 1,
    color: new Vector3(),
  },
  vertexShader,
  fragmentShader
);

extend({ GlowMaterial });

export default GlowMaterial;
