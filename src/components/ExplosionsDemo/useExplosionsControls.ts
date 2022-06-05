import { useControls } from "leva";

const useExplosionsControls = () => {
  // @ts-ignore
  const [{ cameraPos, cameraZoom, orbitControls }, set] = useControls(
    "Camera Controls",
    // @ts-ignore
    () => ({
      cameraZoom: { label: "Zoom", value: 1, min: 0, max: 20, step: 1 },
      orbitControls: { label: "UseOrbit Controls", value: false },
      cameraPos: { label: "Position", x: 0, y: 0, z: 0 },
    })
  );
  const [{ autoModeInterval, autoMode, color, number, size, speed, lifespan }] =
    useControls(
      "Particle Controls",
      // @ts-ignore
      () => ({
        color: "red",
        number: { label: "# particles", value: 100, min: 1, max: 200, step: 1 },
        size: { value: 0.05, min: 0.01, max: 1, step: 0.05 },
        speed: { value: 0.05, step: 0.01, min: 0.01, max: 0.1 },
        lifespan: {
          label: "life span (s)",
          value: 5,
          min: 0.5,
          max: 10,
          step: 0.5,
        },
        autoMode: { label: "auto", value: false },
        autoModeInterval: {
          label: "interval",
          value: 0.25,
          min: 0.1,
          max: 5,
          step: 0.1,
        },
      })
    );
  return {
    cameraPos,
    cameraZoom,
    setCameraControls: set,
    orbitControls,
    color,
    number,
    size,
    speed,
    lifespan,
    isAutoModeEnabled: autoMode,
    autoModeInterval,
  };
};

export default useExplosionsControls;
