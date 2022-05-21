import React from "react";
import { Vector3, Vector2 } from "three";
import { IncomingProjectile } from "../mcTypes";
import { v4 as uuidv4 } from "uuid";
import { GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH } from "../missileCommandGlobals";

interface GetProjectileProps {
  type?: "standard";
}

const getProjectile = ({
  type = "standard",
}: GetProjectileProps): IncomingProjectile => {
  const randomOriginX =
    Math.random() * GAME_FIELD_WIDTH * 1.25 - (GAME_FIELD_WIDTH * 1.25) / 2;
  const randomDestinationX =
    Math.random() * GAME_FIELD_WIDTH - GAME_FIELD_WIDTH / 2;
  console.log("randomOriginX", randomOriginX);
  const origin = new Vector3(randomOriginX, 10, 0);

  const direction = new Vector3(
    randomDestinationX - randomOriginX,
    -GAME_FIELD_HEIGHT,
    0
  ).normalize();

  return {
    origin,
    direction,
    speed: 0.025,
    id: uuidv4(),
  };
};

export default getProjectile;
