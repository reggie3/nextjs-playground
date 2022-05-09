import vertexShader from "./atmosphereVertex.glsl";
import fragmentShader from "./atmosphereFragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const AtmosphereMaterial = shaderMaterial({}, vertexShader, fragmentShader);

extend({ AtmosphereMaterial });

export default AtmosphereMaterial;
