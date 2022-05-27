import vertexShader from "./interceptorExplosionVertex.glsl";
import fragmentShader from "./interceptorExplosionFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Vector3 } from "three";

const InterceptorExplosionMaterial = shaderMaterial(
  {
    uAge: 0,
    uExplosionLifeSpan: 0,
    v3Color: new Vector3(),
  },
  vertexShader,
  fragmentShader
);

extend({ InterceptorExplosionMaterial });

export default InterceptorExplosionMaterial;
