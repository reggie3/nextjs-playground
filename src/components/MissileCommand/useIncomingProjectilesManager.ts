import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { IncomingProjectile } from "./mcTypes";
import { addIncomingProjectile } from "./redux/incomingProjectilesSlice";
import getProjectile from "./utilities/getProjectile";

type Props = {};

const INTERVAL = 10;
const useIncomingProjectilesManager = (props: Props) => {
  const dispatch = useDispatch();

  const lastMissileTimeSeconds = useRef<number>(0);

  useFrame(({ clock }) => {
    // create new missiles if time
    if (
      !lastMissileTimeSeconds.current ||
      clock.getElapsedTime() - lastMissileTimeSeconds.current > INTERVAL
    ) {
      lastMissileTimeSeconds.current = clock.getElapsedTime();

      const newMissile: IncomingProjectile = getProjectile({});
      dispatch(addIncomingProjectile(newMissile));
    }
  });

  return {};
};

export default useIncomingProjectilesManager;
