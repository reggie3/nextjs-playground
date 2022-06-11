import { ThreeEvent, useThree } from "@react-three/fiber";
import ParticlesClickableBackground from "../ExplosionsClickableBackground/ExplosionsClickableBackground";
import { Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import useParticlesControls from "../../useExplosionsControls";
import { Explosion } from "../../particleExplosionsTypes";
import { activateExplosion } from "../../redux/explosionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ExplosionsRootState } from "../../redux/store";
import ExplosionComponent from "../Explosion/Explosion";

const ParticlesContent = () => {
  const { isAutoModeEnabled, autoModeInterval } = useParticlesControls();
  const lastParticleTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const dispatch = useDispatch();
  const { explosions } = useSelector(
    (state: ExplosionsRootState) => state.explosionsState
  );

  const { clock } = useThree();

  const getNewExplosion = (
    x: number,
    y: number
  ): Omit<Explosion, "id" | "isActive"> => {
    return {
      position: [x, y, 0],
      createdAtSeconds: lastParticleTimeRef.current,
    };
  };

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    lastParticleTimeRef.current = clock.getElapsedTime();
    const newExplosion = getNewExplosion(event.point.x, event.point.y);

    dispatch(activateExplosion(newExplosion));
  };

  useEffect(() => {
    if (isAutoModeEnabled) {
      intervalRef.current = setInterval(() => {
        const newParticle = getNewExplosion(
          Math.random() * 4 - 2,
          Math.random() * 4 - 2
        );
        console.log("creating auto");
        lastParticleTimeRef.current = clock.getElapsedTime();
        dispatch(activateExplosion(newParticle));
      }, autoModeInterval * 1000);
    }

    if (!isAutoModeEnabled && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isAutoModeEnabled, autoModeInterval, clock, dispatch]);

  return (
    <group name="content">
      <Stars />
      <ParticlesClickableBackground onClick={onClick} />
      {explosions.map((explosion) => {
        if (!explosion.isActive) return null;
        return <ExplosionComponent key={explosion.id} id={explosion.id} />;
      })}
    </group>
  );
};
export default ParticlesContent;
