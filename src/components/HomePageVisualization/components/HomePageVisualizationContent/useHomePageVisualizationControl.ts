import { useControls } from "leva";

const useHomePageVisualizationControl = () => {
  const { ambientIntensity } = useControls("Ambient Light Controls", {
    ambientIntensity: {
      label: "ambient intensity",
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

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
      label: "intensity",
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    pointLightDistance: {
      label: "distance",
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    pointLightDecay: {
      label: " decay",
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    // @ts-ignore
    pointLightPos: { label: "Position", x: 0, y: 2, z: 0 },
    pointLightColor: { label: "Color", value: "#ff99ff" },
    pointLightRadius: {
      value: 3,
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
    ambientIntensity,
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
