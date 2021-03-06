import { useFrame, useThree } from "@react-three/fiber";
import useExplosionsControls from "../../useExplosionsControls";

export interface ParticlesCameraControllerProps {}
const ParticlesCameraController = (props: ParticlesCameraControllerProps) => {
  const { cameraPos, cameraZoom } = useExplosionsControls();
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
