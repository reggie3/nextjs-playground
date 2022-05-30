import { useFrame, useThree } from "@react-three/fiber";
import useParticlesControls from "../../useParticlesControls";

export interface ParticlesCameraControllerProps {}
const ParticlesCameraController = (props: ParticlesCameraControllerProps) => {
  const { cameraPos, cameraZoom } = useParticlesControls();
  const { camera } = useThree();

  useFrame(() => {
    if (camera) {
      camera.position.set(cameraPos[0], cameraPos[1], cameraPos[2]);
      camera.lookAt(0, 0, 0);

      camera.updateProjectionMatrix();
    }
  });

  return null;
};
export default ParticlesCameraController;
