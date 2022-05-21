import { useControls } from "leva";

const useHomePageVisualizationControl = () => {
  const {
    // @ts-ignore
    pointLightIntensity,
    // @ts-ignore
    pointLightDistance,
    // @ts-ignore
    pointLightDecay,
    // @ts-ignore
    pointLightPos,
    // @ts-ignore
    pointLightColor,
    // @ts-ignore
    pointLightRadius,
  } = useControls("Point Light Controls", {
    pointLightIntensity: {
      label: "Intensity",
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    pointLightDistance: {
      label: "Distance",

      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    pointLightDecay: {
      label: "Decay",
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    // @ts-ignore
    pointLightPos: { label: "Position", x: 0, y: 2, z: 0 },
    pointLightColor: { label: "Color", value: "#ffffff" },
    pointLightRadius: {
      value: 10,
      min: 0,
      max: 25,
      step: 0.25,
      label: "Radius",
    },
  });

  const { boxColor } = useControls("Box Controls", {
    boxColor: { label: "Color", value: "#366796" },
  });
  const { sphereColor } = useControls("Sphere Controls", {
    sphereColor: { label: "Color", value: "#b0f89e" },
  });
  return {
    boxColor,
    pointLightIntensity,
    pointLightDistance,
    pointLightDecay,
    pointLightPos,
    pointLightColor,
    pointLightRadius,
    sphereColor,
  };
};

export default useHomePageVisualizationControl;
