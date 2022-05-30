import { useControls } from "leva";

const useGlowingPointLightControl = () => {
  const {
    radiance,

    intensity,
  } = useControls("Glowing Point Light Controls", {
    radiance: {
      label: "radiance",
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
    },
    intensity: {
      label: "intensity",
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  return {
    radiance,

    intensity,
  };
};

export default useGlowingPointLightControl;
