import { Canvas } from "@react-three/fiber";
import { ParticlesContent } from "./components/ParticlesContent";

export interface ParticlesProps {}
const Particles = (props: ParticlesProps) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <ParticlesContent />
    </Canvas>
  );
};
export default Particles;
