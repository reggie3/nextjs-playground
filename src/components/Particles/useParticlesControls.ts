import { useControls } from "leva";

const useMissileCommandControls = () => {
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
  const [{ color, number, size, speed, lifespan }] = useControls(
    "Particle Controls",
    // @ts-ignore
    () => ({
      color: "red",
      number: { value: 10, min: 1, max: 100, step: 1 },
      size: { value: 0.1, min: 0.01, max: 1, step: 0.05 },
      speed: { value: 0.005, step: 0.001 },
      lifespan: {
        label: "life span (s)",
        value: 1,
        min: 0.5,
        max: 10,
        step: 0.5,
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
  };
};

export default useMissileCommandControls;
