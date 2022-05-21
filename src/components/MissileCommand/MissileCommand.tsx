import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MissileCommandContent } from "./components/MissileCommandContent";
import { GAME_WIDTH } from "./missileCommandGlobals";
import useMissileCommandControl from "./useMissileCommandControls";

const MissileCommand = () => {
  const { cameraPos, cameraZoom } = useMissileCommandControl();

  console.log(Object.entries(cameraPos));

  return (
    <Canvas dpr={[1, 2]} shadows>
      <OrthographicCamera
        args={[
          -GAME_WIDTH / 2,
          GAME_WIDTH / 2,
          GAME_WIDTH / 2,
          -GAME_WIDTH / 2,
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
