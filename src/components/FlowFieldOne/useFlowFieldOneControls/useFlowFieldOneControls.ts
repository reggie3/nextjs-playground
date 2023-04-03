import { useControls } from "leva";

const useFlowFieldOneControls = () => {
  const [{ curve, flowFieldCellSize, numberOfParticles, zoom }, set] =
    useControls("Flow Field Controls", () => ({
      numberOfParticles: {
        label: "Num. Particles",
        value: 1,
        min: 1,
        max: 500,
        step: 2,
      },
      curve: {
        label: "Curve",
        value: 1,
        min: 0.01,
        max: 3,
        step: 0.05,
      },
      flowFieldCellSize: {
        label: "Cell Size",
        value: 20,
        min: 1,
        max: 50,
        step: 1,
      },
      zoom: {
        label: "Zoom",
        value: 0.5,
        min: 0.01,
        max: 5,
        step: 0.01,
      },
      debug: {
        label: "Debug",
        value: true,
      },
    }));

  return {
    curve,
    flowFieldCellSize,
    numberOfParticles,
    setFlowFieldControls: set,
    zoom,
  };
};

export default useFlowFieldOneControls;
