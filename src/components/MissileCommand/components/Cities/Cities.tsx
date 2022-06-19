import { useSelector } from "react-redux";
import { MissileCommandRootState } from "../../redux/store";
import { useRef } from "react";
import { City } from "./City";
import { CityData } from "../../mcTypes";

const Cities = () => {
  const citiesMeshRefs = useRef<
    Record<string, { launcher: THREE.Mesh; detectionRangeRing: THREE.Mesh }>
  >({});

  const { cities } = useSelector(
    (state: MissileCommandRootState) => state.citiesState
  );

  return (
    <group name="cities">
      {Object.values(cities).map((city: CityData) => {
        return <City key={city.id} cityData={city} />;
      })}
    </group>
  );
};
export default Cities;
