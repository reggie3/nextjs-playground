import { OrthographicCamera, OrbitControls, Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AxesHelper } from "three";
import { MissileCommandContent } from "./components/MissileCommandContent";
import { GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH } from "./missileCommandGlobals";
import useMissileCommandControl from "./useMissileCommandControls";

const MissileCommand = () => {
  const { cameraPos, cameraZoom } = useMissileCommandControl();

  console.log(Object.entries(cameraPos));

  return (
    <Canvas dpr={[1, 2]} shadows>
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
      <MissileCommandContent />
    </Canvas>
  );
};
export default MissileCommand;
