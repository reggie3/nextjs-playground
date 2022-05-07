//@ts-ignore Cannot find module './shaders/vertex.glsl' or its corresponding type declarations.
import vertexShader from "../shaders/atmosphereVertex.glsl";
//@ts-ignore Cannot find module './shaders/fragment.glsl' or its corresponding type declarations.
import fragmentShader from "../shaders/atmosphereFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const AtmosphereMaterial = shaderMaterial({}, vertexShader, fragmentShader);

extend({ AtmosphereMaterial });

export default AtmosphereMaterial;
