import { useControls } from "leva";

const useMissileCommandControl = () => {
  const { cameraPos, cameraZoom } = useControls("Camera Controls", {
    cameraZoom: { label: "zoom", value: 55, min: 10, max: 100, step: 1 },
    cameraPos: { label: "Position", x: 0, y: -5.5, z: -1 },
  });
  return { cameraPos, cameraZoom };
};

export default useMissileCommandControl;
