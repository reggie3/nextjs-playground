import { useControls } from "leva";

const useGlowingPointLightControl = () => {
  const {
    luminanceThreshold,
    luminanceSmoothing,
    height,
    intensity,
    resolutionScale,
  } = useControls("Glowing Point Light Controls", {
    luminanceThreshold: {
      label: "lum. threshold",
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
    },
    luminanceSmoothing: {
      label: "lum. smoothing",
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
    },
    height: {
      label: "height",
      value: 1000,
      min: 0,
      max: 1000,
      step: 1,
    },
    intensity: {
      label: "intensity",
      value: 53,
      min: 0,
      max: 1000,
      step: 1,
    },
    resolutionScale: {
      label: "resolution scale",
      value: 190,
      min: 0,
      max: 1000,
      step: 1,
    },
  });

  return {
    luminanceThreshold,
    luminanceSmoothing,
    height,
    intensity,
    resolutionScale,
  };
};

export default useGlowingPointLightControl;
