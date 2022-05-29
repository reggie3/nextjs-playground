import { useSelector } from "react-redux";
import { MissileCommandRootState } from "../../redux/store";
import ParticleExplosion from "./ParticleExplosion/ParticleExplosion";

const ParticleExplosions = () => {
  const { particleExplosions } = useSelector(
    (state: MissileCommandRootState) => state.particleExplosionsState
  );

  return (
    <group name="particle-explosions">
      {particleExplosions.map((explosion) => {
        if (!explosion.isActive) return null;
        return <ParticleExplosion key={explosion.id} id={explosion.id} />;
      })}
    </group>
  );
};
export default ParticleExplosions;
