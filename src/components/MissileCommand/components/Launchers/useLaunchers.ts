import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { MissileCommandRootState } from "../../redux/store";
import { IncomingProjectiles } from "../IncomingProjectiles";
import { IncomingProjectile, Interceptor, Launcher } from "../../mcTypes";
import { Vector3 } from "three";
import launcherData from "../../gameData/launchers.json";
import interceptorData from "../../gameData/interceptors.json";
import { addInterceptor } from "../../redux/interceptorsSlice";

const useLaunchers = () => {
  const firingTimes = useRef<Record<string, number>>({});
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
        const distance = new Vector3()
          .fromArray(projectile.position)
          .distanceTo(new Vector3().fromArray(launcher.position));
        if (distance < detectionRange) {
          const direction = new Vector3()
            .fromArray(projectile.position)
            .sub(new Vector3().fromArray(launcher.position));
          const normalizedDirection = direction.normalize();
          const normalizedDirectionArray = normalizedDirection.toArray();
          const newInterceptor: Interceptor = {
            id: uuidV4(),
            targetLocation: projectile.position,
            projectileType: "interceptor",
            interceptorType: "interceptor1",
            origin: launcher.position,
            speed: interceptorData.interceptor1.speed,
            direction: normalizedDirectionArray as [number, number, number],
            position: launcher.position,
          };
          dispatch(addInterceptor(newInterceptor));
        }
      });
    });
    //   lastFiringCheckTime.current = clock.getElapsedTime();
    // }
  });

  return;
};

export default useLaunchers;
