import { useContextBridge } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { OrthographicCamera } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
} from "react";
import { ReactReduxContext } from "react-redux";

import { MissileCommandContent } from "./components/MissileCommandContent";
import { GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH } from "./missileCommandGlobals";
import useMissileCommandControl from "./useMissileCommandControls";

const MissileCommand = () => {
  const {
    cameraPos,
    cameraZoom,
    orbitControls: shouldUseOrbitControls,
  } = useMissileCommandControl();
  type MissileCommandContentHandle = React.ElementRef<
    typeof MissileCommandContent
  >;

  const contentRef = useRef<MissileCommandContentHandle>(null);
  const cameraRef = useRef<THREE.Camera>();
  // Need this to make Redux work inside the canvas
  const ReduxProvider = useContextBridge(ReactReduxContext);

  const onClickCanvas = (event: unknown) => {
    console.log(event);
    if (contentRef.current) {
      contentRef.current.onClickCanvas();
    }
  };

  useEffect(() => {
    if (!shouldUseOrbitControls && cameraRef.current) {
      cameraRef.current.position.set(0, 5.5, 5);
      cameraRef.current.lookAt(0, 5.5, 5);
    }
  }, [shouldUseOrbitControls]);

  return (
    <Canvas dpr={[1, 2]} shadows onClick={onClickCanvas}>
      <ReduxProvider>
        <axesHelper args={[10]} />
        <OrthographicCamera
          ref={cameraRef}
          args={[
            -GAME_FIELD_WIDTH / 2,
            GAME_FIELD_WIDTH / 2,
            GAME_FIELD_HEIGHT / 2,
            -GAME_FIELD_HEIGHT / 2,
          ]}
          position={[cameraPos.x, cameraPos.y, cameraPos.z]}
          makeDefault
          zoom={cameraZoom}
        />
        <MissileCommandContent ref={contentRef} />
      </ReduxProvider>
      {shouldUseOrbitControls && <OrbitControls />}
    </Canvas>
  );
};
export default MissileCommand;
