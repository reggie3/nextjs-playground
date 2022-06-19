import { Stars, useContextBridge } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { ReactReduxContext } from "react-redux";

import { MissileCommandContent } from "./components/MissileCommandContent";
import { GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH } from "./missileCommandGlobals";
import sfx from "./soundEffects";
import useMissileCommandControls from "./useMissileCommandControls";
import { Howler } from "howler";
import { useRouter } from "next/router";

const MissileCommand = () => {
  const {
    cameraPos,
    cameraZoom,
    orbitControls: shouldUseOrbitControls,
    isMuted,
  } = useMissileCommandControls();
  type MissileCommandContentHandle = React.ElementRef<
    typeof MissileCommandContent
  >;
  const contentRef = useRef<MissileCommandContentHandle>(null);
  const cameraRef = useRef<THREE.Camera>();

  const { pathname, isReady } = useRouter();
  // Need this to make Redux work inside the canvas
  const ReduxProvider = useContextBridge(ReactReduxContext);

  const onClickCanvas = (event: unknown) => {
    console.log(event);
    if (contentRef.current) {
      contentRef.current.onClickCanvas();
    }
  };

  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 5.5, 5);
      cameraRef.current.lookAt(0, 5.5, 5);

      // @ts-ignore zoom does not exist on OrthographicCamera
      cameraRef.current.zoom = 55;
      // @ts-ignore updateProjectionMatrix does not exist on OrthographicCamera
      cameraRef.current.updateProjectionMatrix();
    }
  };

  useEffect(() => {
    console.log((isMuted ? "Muted" : "Unmuted") + " sound effects");
    Howler.mute(isMuted);
    sfx.toggleMute(isMuted);
  }, [isMuted]);

  useEffect(() => {
    if (pathname.indexOf("missile-command") !== -1 && isReady) {
      console.log("resetting camera");
      setTimeout(() => {
        resetCamera();
      }, 1000);
    }
  }, [pathname, isReady]);

  useEffect(() => {
    if (!shouldUseOrbitControls) {
      resetCamera();
    }
  }, [shouldUseOrbitControls]);

  return (
    <Canvas dpr={[1, 2]} shadows onClick={onClickCanvas}>
      <ReduxProvider>
        {/* <axesHelper args={[10]} /> */}
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
      <Stars
        radius={20}
        depth={10}
        count={5000}
        factor={2}
        saturation={0}
        fade
        speed={1}
      />
    </Canvas>
  );
};
export default MissileCommand;
