import { useControls } from "leva";
import { CAMERA_Y_POS } from "./missileCommandGlobals";

const useMissileCommandControls = () => {
  // @ts-ignore
  const [{ cameraPos, cameraZoom, orbitControls }, set] = useControls(
    "Camera Controls",
    // @ts-ignore
    () => ({
      cameraZoom: { label: "zoom", value: 55, min: 10, max: 100, step: 1 },
      cameraPos: { label: "Position", x: 0, y: CAMERA_Y_POS, z: 5 },
      orbitControls: { label: "UseOrbit Controls", value: false },
    })
  );

  const [{ incomingInterval, isMuted }] = useControls(
    "Game Controls",
    // @ts-ignore
    () => ({
      incomingInterval: {
        label: "incoming interval",
        value: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
      },
      isMuted: { label: "mute", value: false },
    })
  );

  return {
    isMuted,
    cameraPos,
    cameraZoom,
    setCameraControls: set,
    orbitControls,
    incomingInterval,
  };
};

export default useMissileCommandControls;
