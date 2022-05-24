import { useControls } from "leva";
import { CAMERA_Y_POS } from "./missileCommandGlobals";

const useMissileCommandControl = () => {
  // @ts-ignore
  const [{ cameraPos, cameraZoom, setCameraControls }, set] = useControls(
    "Camera Controls",
    // @ts-ignore
    () => ({
      cameraZoom: { label: "zoom", value: 55, min: 10, max: 100, step: 1 },
      cameraPos: { label: "Position", x: 0, y: CAMERA_Y_POS, z: 5 },
      orbitControls: { label: "Orbit Controls", value: false },
    })
  );
  return { cameraPos, cameraZoom, setCameraControls: set };
};

export default useMissileCommandControl;
