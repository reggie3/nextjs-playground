import { Plane } from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import { CityData } from "../../../mcTypes";
import { CityBuilding } from "./CityBuilding";

export interface CityProps {
  cityData: CityData;
}

const City = ({ cityData }: CityProps) => {
  const { numBuildings, position } = cityData;

  console.log("City", numBuildings, position);
  return (
    <group name="city">
      {Array(cityData.numBuildings)
        .fill(0)
        .map((_, index) => {
          console.log("CityBuilding index", index);
          return <CityBuilding key={index} position={position} />;
        })}
    </group>
  );
};
export default City;
