import { OrbitControls, useContextBridge } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { ReactReduxContext } from "react-redux";
import { ExplosionsContent } from "./components/ExplosionsContent";
import useExplosionsControls from "./useExplosionsControls";

const Explosions = () => {
  const cameraRef = useRef<Camera>();

  const {
    cameraPos,
    cameraZoom,
    orbitControls: shouldUseOrbitControls,
  } = useExplosionsControls();

  const ReduxProvider = useContextBridge(ReactReduxContext);

  return (
    <Canvas>
      <ReduxProvider>
        <ExplosionsContent />
        {shouldUseOrbitControls && <OrbitControls />}
      </ReduxProvider>
    </Canvas>
  );
};
export default Explosions;
