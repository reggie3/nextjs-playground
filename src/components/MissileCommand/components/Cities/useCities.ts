import { useDispatch } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { randomIntFromInterval } from "../../../../utils/getRandomIntFromInterval";
import { CityData } from "../../mcTypes";
import { GAME_FIELD_WIDTH, Z_CITIES } from "../../missileCommandGlobals";
import { setCities } from "../../redux/citiesSlice";

const useCities = () => {
  const dispatch = useDispatch();

  const createCities = (numCities: number) => {
    const cities: Record<string, CityData> = {};
    for (let i = 0; i < numCities; i++) {
      const cityId = uuidV4();

      // 0 +/- 75% of half the game filed width
      // + 75% of half the game field width - half the game field width
      const xPos =
        Math.random() * 0.75 * GAME_FIELD_WIDTH - GAME_FIELD_WIDTH * 0.5;

      cities[cityId] = {
        id: cityId,
        position: [xPos, 0, Z_CITIES],
        createdAtSeconds: Date.now() / 1000,
        health: 100,
        numBuildings: randomIntFromInterval(3, 8),
      };
    }

    dispatch(setCities(cities));
  };

  return {
    createCities,
  };
};

export default useCities;
