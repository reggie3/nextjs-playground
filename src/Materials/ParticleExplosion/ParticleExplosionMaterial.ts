import vertexShader from "./particleExplosionVertex.glsl";
import fragmentShader from "./particleExplosionFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";

const ParticleExplosionMaterial = shaderMaterial(
  {
    uAge: 0,
    uExplosionLifeSpan: 0,
    v3Color: new Vector3(),
    uResolution: new Vector2(),
    uRotationRandomSpeed: new Vector3(),
    uUseNoise: false,
  },
  vertexShader,
  fragmentShader
);

extend({ ParticleExplosionMaterial });

export default ParticleExplosionMaterial;
