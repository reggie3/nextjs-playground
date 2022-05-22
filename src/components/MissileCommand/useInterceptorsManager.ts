import { useFrame, Vector3 } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IncomingProjectile } from "./mcTypes";
import { addIncomingProjectile } from "./redux/incomingProjectilesSlice";
import { MissileCommandRootState } from "./redux/store";
import getProjectile from "./utilities/getProjectile";

type Props = {};

const useInterceptorsManager = (props: Props) => {
  const dispatch = useDispatch();
  // const { interceptors } = useSelector(
  //   (state: MissileCommandRootState) => state.interceptorsState
  // );

  const lastMissileTimeSeconds = useRef<number>(0);

  useFrame(({ clock }) => {
    // create new missiles if time
    if (clock.getElapsedTime() - lastMissileTimeSeconds.current > 0.15) {
      // lastMissileTimeSeconds.current = clock.getElapsedTime();
      // const newMissile: IncomingProjectile = getProjectile({});
      // dispatch(addIncomingProjectile(newMissile));
    }
  });

  return {};
};

export default useInterceptorsManager;
