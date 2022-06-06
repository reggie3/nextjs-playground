import vertexShader from "./explosionVertex.glsl";
import fragmentShader from "./explosionFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Vector3, Vector2 } from "three";

const ExplosionMaterial = shaderMaterial(
  {
    uAge: 0,
    uExplosionLifeSpan: 0,
    v3Color: new Vector3(),
  },
  vertexShader,
  fragmentShader
);

extend({ ExplosionMaterial });

export default ExplosionMaterial;
