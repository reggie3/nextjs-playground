//@ts-ignore Cannot find module './shaders/vertex.glsl' or its corresponding type declarations.
import vertexShader from "../shaders/globeVertex.glsl";
//@ts-ignore Cannot find module './shaders/fragment.glsl' or its corresponding type declarations.
import fragmentShader from "../shaders/globeFragment.glsl";
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
