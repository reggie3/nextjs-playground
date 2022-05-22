import { Vector3 } from "three";
import { IncomingProjectile } from "../mcTypes";
import { v4 as uuidv4 } from "uuid";
import { GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH } from "../missileCommandGlobals";
import { randomNumberFromInterval } from "../../../utils/getRandomIntFromInterval";

const MAX_HORIZONTAL_TRAVEL_DISTANCE = 4;

interface GetProjectileProps {
  type?: "standard";
}

const getProjectile = ({
  type = "standard",
}: GetProjectileProps): IncomingProjectile => {
  // pick a random number between negative and positive half the game field size
  const randomOriginX =
    Math.random() * GAME_FIELD_WIDTH * 1.25 - (GAME_FIELD_WIDTH * 1.25) / 2;

  const minDestX = Math.max(
    randomOriginX + MAX_HORIZONTAL_TRAVEL_DISTANCE,
    GAME_FIELD_WIDTH / -2
  );
  const maxDestX = Math.min(
    randomOriginX - MAX_HORIZONTAL_TRAVEL_DISTANCE,
    GAME_FIELD_WIDTH / 2
  );

  const randomDestinationX = randomNumberFromInterval(minDestX, maxDestX);

  const origin = [randomOriginX, GAME_FIELD_HEIGHT * 1.25, 0] as [
    number,
    number,
    number
  ];

  const directionVector = new Vector3(
    randomDestinationX - randomOriginX,
    -GAME_FIELD_HEIGHT * 1.25,
    0
  ).normalize();

  return {
    origin,
    direction: [directionVector.x, directionVector.y, directionVector.z],
    speed: 0.025,
    id: uuidv4(),
    type,
  };
};

export default getProjectile;
