import { Plane } from "@react-three/drei";
import { Box } from "@react-three/drei";
import { GAME_FIELD_WIDTH, Z_GROUND } from "../../../missileCommandGlobals";

const FLOOR_THICKNESS = 8;

const McFloor = () => {
  return (
    <group name="mc-floor">
      <Plane
        args={[GAME_FIELD_WIDTH * 2, FLOOR_THICKNESS, 6]}
        position={[0, FLOOR_THICKNESS / -2, Z_GROUND]}
      >
        <meshStandardMaterial attach="material" color="#11cc11" />
      </Plane>
    </group>
  );
};
export default McFloor;
