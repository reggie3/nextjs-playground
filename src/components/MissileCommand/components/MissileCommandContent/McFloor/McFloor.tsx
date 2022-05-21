import { Box } from "@react-three/drei";
import { GAME_FIELD_WIDTH } from "../../../missileCommandGlobals";

const FLOOR_THICKNESS = 1;
const McFloor = () => {
  return (
    <group name="mc-floor">
      <Box
        args={[GAME_FIELD_WIDTH * 2, FLOOR_THICKNESS, 0.5]}
        position={[0, FLOOR_THICKNESS / -2, 0]}
      >
        <meshPhongMaterial attach="material" color="#11cc11" />
      </Box>
    </group>
  );
};
export default McFloor;
