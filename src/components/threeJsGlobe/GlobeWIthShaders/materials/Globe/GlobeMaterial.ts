import vertexShader from "./globeVertex.glsl";
import fragmentShader from "./globeFragment.glsl";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const GlobeMaterial = shaderMaterial(
  {
    globeTexture: new THREE.Texture(),
    bumpMap: new THREE.Texture(),
    roughnessMap: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
);

extend({ GlobeMaterial });

export default GlobeMaterial;
