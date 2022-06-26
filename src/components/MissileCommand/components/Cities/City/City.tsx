import { useEffect, useState } from "react";
import { HealthBar } from "../../../../HealthBar";
import { HEALTH_BAR_WIDTH } from "../../../../HealthBar/HealthBar";
import { CityData, NumVec3 } from "../../../mcTypes";
import { CityBuilding } from "./CityBuilding";
import { BUILDING_MAX_HEIGHT } from "./CityBuilding/CityBuilding";

export interface CityProps {
  cityData: CityData;
}

const City = ({ cityData }: CityProps) => {
  const { health, numBuildings, position } = cityData;
  const [healthBarValue, setHealthBarValue] = useState(health / 100);

  const healthBarPosition: NumVec3 = [
    position[0] + HEALTH_BAR_WIDTH / 4,
    BUILDING_MAX_HEIGHT + 0.16,
    position[2],
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHealthBarValue((prev) => Math.max(prev - 0.1, 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <group name="city">
      <HealthBar position={healthBarPosition} healthValue={healthBarValue} />
      {Array(numBuildings)
        .fill(0)
        .map((_, index) => {
          return <CityBuilding key={index} position={position} />;
        })}
    </group>
  );
};
export default City;
