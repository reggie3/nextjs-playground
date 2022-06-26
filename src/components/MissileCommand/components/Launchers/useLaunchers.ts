import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { MissileCommandRootState } from "../../redux/store";
import { Interceptor, Launcher, NumVec3 } from "../../mcTypes";
import { Vector3 } from "three";
import launcherData from "../../gameData/launchers.json";
import interceptorData from "../../gameData/interceptors.json";
import { addInterceptor } from "../../redux/interceptorsSlice";
import { Z_INTERCEPTORS } from "../../missileCommandGlobals";
import sfx from "../../soundEffects";

type Props = {
  explosionMeshes: Record<string, THREE.Mesh>;
};

const useLaunchers = () => {
  const firingTimes = useRef<Record<string, number>>({});
  const targetTable = useRef<Record<string, string>>({});

  const { launchers } = useSelector(
    (state: MissileCommandRootState) => state.launchersState
  );
  const { incomingProjectiles } = useSelector(
    (state: MissileCommandRootState) => state.incomingProjectilesState
  );
  const lastFiringCheckTime = useRef<number>(0);
  const dispatch = useDispatch();

  useFrame(({ clock }) => {
    const currentTime = clock.getElapsedTime();
    // if (currentTime - lastFiringCheckTime.current > 2) {
    Object.values(incomingProjectiles).map((projectile) => {
      Object.values(launchers).map((launcher: Launcher) => {
        const { detectionRange } = launcherData[launcher.type];

        // don't shoot at projectiles if they are not active
        if (projectile.status !== "active") return;

        // don't do collision detection of the projectile is beyond the max range
        if (projectile.position[1] > detectionRange) {
          return;
        }
        // don't do collision detection if projectile is outside the horizontal detection range
        if (
          projectile.position[0] < launcher.position[0] - detectionRange ||
          projectile.position[0] > launcher.position[0] + detectionRange
        ) {
          return;
        }

        // don't do collision detection if the launcher is still cooling down
        const coolDownSeconds =
          launcherData[launcher.type].coolDownMillis / 1000;
        const lastFiredTime = currentTime - firingTimes.current[launcher.id];
        if (coolDownSeconds > lastFiredTime) {
          return;
        }
        const xDistance = Math.abs(
          projectile.position[0] - launcher.position[0]
        );
        const yDistance = Math.abs(
          projectile.position[1] - launcher.position[1]
        );
        const squaredDistance = xDistance * xDistance + yDistance * yDistance;
        if (squaredDistance < detectionRange * detectionRange) {
          const direction = new Vector3()
            .fromArray(projectile.position)
            .sub(new Vector3().fromArray(launcher.position));
          const normalizedDirection = direction.normalize();
          const normalizedDirectionArray = normalizedDirection.toArray();
          const newInterceptor: Interceptor = {
            id: uuidV4(),
            targetPosition: projectile.position,
            projectileType: "interceptor",
            interceptorType: "interceptor1",
            origin: [
              launcher.position[0],
              launcher.position[1],
              Z_INTERCEPTORS,
            ],
            speed: interceptorData.interceptor1.speed,
            direction: normalizedDirectionArray as NumVec3,
            position: launcher.position,
          };
          dispatch(addInterceptor(newInterceptor));
          sfx.flakShot.play();
          firingTimes.current[launcher.id] = currentTime;
        }
      });
    });
    //   lastFiringCheckTime.current = clock.getElapsedTime();
    // }
  });

  return;
};

export default useLaunchers;
