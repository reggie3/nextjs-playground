import { useContextBridge } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { OrthographicCamera } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { ForwardRefExoticComponent, RefAttributes, useRef } from "react";
import { ReactReduxContext } from "react-redux";

import { MissileCommandContent } from "./components/MissileCommandContent";
import { GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH } from "./missileCommandGlobals";
import useMissileCommandControl from "./useMissileCommandControls";

const MissileCommand = () => {
  const { cameraPos, cameraZoom } = useMissileCommandControl();
  type MissileCommandContentHandle = React.ElementRef<
    typeof MissileCommandContent
  >;

  const contentRef = useRef<MissileCommandContentHandle>(null);

  // Need this to make Redux work inside the canvas
  const ReduxProvider = useContextBridge(ReactReduxContext);

  const onClickCanvas = (event: unknown) => {
    console.log(event);
    if (contentRef.current) {
      contentRef.current.onClickCanvas();
    }
  };

  return (
    <Canvas dpr={[1, 2]} shadows onClick={onClickCanvas}>
      <ReduxProvider>
        <axesHelper args={[10]} />
        <OrthographicCamera
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
      {/* <OrbitControls /> */}
    </Canvas>
  );
};
export default MissileCommand;
