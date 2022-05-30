import { Stars, useContextBridge } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { OrthographicCamera } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Selection,
} from "@react-three/postprocessing";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
} from "react";
import { ReactReduxContext } from "react-redux";

import { MissileCommandContent } from "./components/MissileCommandContent";
import { GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH } from "./missileCommandGlobals";
import sfx from "./soundEffects";
import useMissileCommandControls from "./useMissileCommandControls";
import { Howl, Howler } from "howler";

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
  // Need this to make Redux work inside the canvas
  const ReduxProvider = useContextBridge(ReactReduxContext);

  const onClickCanvas = (event: unknown) => {
    console.log(event);
    if (contentRef.current) {
      contentRef.current.onClickCanvas();
    }
  };

  useEffect(() => {
    console.log((isMuted ? "Muted" : "Unmuted") + " sound effects");
    Howler.mute(isMuted);
    sfx.toggleMute(isMuted);
  }, [isMuted]);

  useEffect(() => {
    if (!shouldUseOrbitControls && cameraRef.current) {
      cameraRef.current.position.set(0, 5.5, 5);
      cameraRef.current.lookAt(0, 5.5, 5);

      // @ts-ignore zoom does not exist on OrthographicCamera
      cameraRef.current.zoom = 55;
      // @ts-ignore updateProjectionMatrix does not exist on OrthographicCamera
      cameraRef.current.updateProjectionMatrix();
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
        <Selection>
          <MissileCommandContent ref={contentRef} />
        </Selection>
        {/* <EffectComposer> */}
        {/* <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          /> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        {/* <Noise opacity={0.5} /> */}
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
        {/* </EffectComposer> */}
      </ReduxProvider>
      {shouldUseOrbitControls && <OrbitControls />}
      <Stars
        radius={25}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </Canvas>
  );
};
export default MissileCommand;
