import React from "react";
import { useSelector } from "react-redux";
import { ParticleExplosion } from "../../../mcTypes";
import { MissileCommandRootState } from "../../../redux/store";
import { ParticleExplosionPlanes } from "../ParticleExplosionPlanes";

export interface ParticleExplosionProps {
  id: string;
}

const ParticleExplosionComponent = ({ id }: ParticleExplosionProps) => {
  const particleExplosion: ParticleExplosion = useSelector(
    (state: MissileCommandRootState) =>
      state.particleExplosionsState.particleExplosions[id]
  );

  return (
    <group name="particle-explosion">
      <ParticleExplosionPlanes
        key={particleExplosion.id}
        pos={[particleExplosion.position[0], particleExplosion.position[1]]}
        particleExplosionCreatedAtSeconds={particleExplosion.createdAtSeconds}
        particleExplosion={particleExplosion}
      />
    </group>
  );
};

export default React.memo(ParticleExplosionComponent);
