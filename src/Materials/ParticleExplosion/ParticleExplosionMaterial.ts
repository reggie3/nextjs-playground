import vertexShader from "./particleExplosionVertex.glsl";
import fragmentShader from "./particleExplosionFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Vector3 } from "three";

const ParticleExplosionMaterial = shaderMaterial(
  {
    uAge: 0,
    uExplosionLifeSpan: 0,
    v3Color: new Vector3(),
  },
  vertexShader,
  fragmentShader
);

extend({ ParticleExplosionMaterial });

export default ParticleExplosionMaterial;
