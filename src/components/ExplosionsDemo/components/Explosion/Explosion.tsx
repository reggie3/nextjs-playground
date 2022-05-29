import { useSelector } from "react-redux";
import { Explosion } from "../../explosionsTypes";
import { ExplosionsRootState } from "../../redux/store";
import { ExplosionPlanes } from "../ExplosionPlanes";
import React from "react";

export interface ExplosionProps {
  id: string;
}

const ExplosionComponent = ({ id }: ExplosionProps) => {
  const explosion: Explosion = useSelector(
    (state: ExplosionsRootState) => state.explosionsState.explosions[id]
  );

  return (
    <group name="explosion">
      <ExplosionPlanes
        key={explosion.id}
        pos={[explosion.position[0], explosion.position[1]]}
        explosionCreatedAtSeconds={explosion.createdAtSeconds}
        explosion={explosion}
      />
    </group>
  );
};

export default React.memo(ExplosionComponent);
