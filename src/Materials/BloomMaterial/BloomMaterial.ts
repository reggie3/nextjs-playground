import vertexShader from "./bloomVertex.glsl";
import fragmentShader from "./bloomFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Vector3 } from "three";

const BloomMaterial = shaderMaterial(
  {
    size: new Vector3(),
    intensity: 1,
    radiance: 1,
    color: new Vector3(),
  },
  vertexShader,
  fragmentShader
);

extend({ BloomMaterial });

export default BloomMaterial;
