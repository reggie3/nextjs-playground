import { Plane } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { NumVec3 } from "../../../../mcTypes";

export interface CityBuildingProps {
  position: NumVec3;
}

export const BUILDING_MAX_HEIGHT = 0.55;
const BUILDING_MAX_WIDTH = 0.35;
const X_POS_JITTER = 0.5;

const CityBuilding = ({ position }: CityBuildingProps) => {
  const buildingHeight = useRef(
    BUILDING_MAX_HEIGHT - Math.random() * BUILDING_MAX_HEIGHT * 0.5
  );

  const buildingWidth = useRef(
    BUILDING_MAX_WIDTH - Math.random() * BUILDING_MAX_WIDTH * 0.5
  );

  const buildingColor = useRef(
    new THREE.Color(`hsl(${Math.floor(255 * Math.random())}, 100%, 35%)`)
  );

  const yPos = useRef(position[1] + buildingHeight.current / 2);
  const xPos = useRef(position[0] + Math.random() * X_POS_JITTER);

  return (
    <Plane
      args={[buildingWidth.current, buildingHeight.current, 2]}
      position={[xPos.current, yPos.current, position[2]]}
    >
      <meshBasicMaterial color={buildingColor.current} />
    </Plane>
  );
};
export default CityBuilding;
