import { useControls } from "leva";

const useFlowFieldOneControls = () => {
  const [
    {
      centerColor,
      colorWidth,
      curve,
      flowFieldCellSize,
      isDebug,
      numberOfParticles,
      zoom,
    },
    set,
  ] = useControls("Flow Field Controls", () => ({
    numberOfParticles: {
      label: "Num. Particles",
      value: 500,
      min: 1,
      max: 2000,
      step: 10,
    },
    curve: {
      label: "Curve",
      value: 1,
      min: 0.01,
      max: 5,
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
    isDebug: {
      label: "Debug",
      value: false,
    },
    centerColor: {
      label: "HSL Center",
      value: "#f0f",
    },
    colorWidth: {
      label: "Color Width",
      value: 20,
      min: 1,
      max: 180,
    },
  }));

  return {
    centerColor,
    colorWidth,
    isDebug,
    curve,
    flowFieldCellSize,
    numberOfParticles,
    setFlowFieldControls: set,
    zoom,
  };
};

export default useFlowFieldOneControls;
