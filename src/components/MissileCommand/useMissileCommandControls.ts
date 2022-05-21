import { useControls } from "leva";

const useMissileCommandControl = () => {
  // @ts-ignore
  const [{ cameraPos, cameraZoom, setCameraControls }, set] = useControls(
    "Camera Controls",
    // @ts-ignore
    () => ({
      cameraZoom: { label: "zoom", value: 55, min: 10, max: 100, step: 1 },
      cameraPos: { label: "Position", x: 0, y: 5.5, z: 5 },
    })
  );
  return { cameraPos, cameraZoom, setCameraControls: set };
};

export default useMissileCommandControl;
