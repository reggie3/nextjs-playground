import { Plane } from "@react-three/drei";
import { Box } from "@react-three/drei";
import { GAME_FIELD_WIDTH, Z_GROUND } from "../../../missileCommandGlobals";

const FLOOR_THICKNESS = 1.25;

const McFloor = () => {
  return (
    <group name="mc-floor">
      <Plane
        args={[GAME_FIELD_WIDTH * 2, FLOOR_THICKNESS, 6]}
        position={[0, FLOOR_THICKNESS / -2, Z_GROUND]}
      >
        <meshBasicMaterial attach="material" color="#11cc11" />
      </Plane>
      <Plane
        args={[GAME_FIELD_WIDTH * 2, FLOOR_THICKNESS, 6]}
        position={[
          0,
          FLOOR_THICKNESS / -2 + FLOOR_THICKNESS / -2,
          Z_GROUND + 0.1,
        ]}
      >
        <meshBasicMaterial attach="material" color="#D2691E" />
      </Plane>
    </group>
  );
};
export default McFloor;
