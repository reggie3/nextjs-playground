import { Plane } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree, Vector3 } from "@react-three/fiber";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import { v4 as uuidV4 } from "uuid";
import { Interceptor, Launcher } from "../../mcTypes";
import { addInterceptor } from "../../redux/interceptorsSlice";
import interceptorData from "../../gameData/interceptors.json";
import { MissileCommandRootState } from "../../redux/store";
import { addLauncher } from "../../redux/launchersSlice";

type McClickableBackgroundProps = {};

const McClickableBackground = ({}: McClickableBackgroundProps) => {
  const planeRef = useRef<THREE.Mesh>();
  const { camera } = useThree();
  const dispatch = useDispatch();
  const { indicatorMode } = useSelector(
    (state: MissileCommandRootState) => state.mcMouseIndicatorState
  );

  useFrame(() => {
    if (planeRef) {
      // rotate the plane so that it is always facing the camera
      planeRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const fireInterceptor = (event: ThreeEvent<MouseEvent>) => {
    const interceptorOrigin = new THREE.Vector3(0, 0, 0);
    const targetPosition = new THREE.Vector3().fromArray([
      event.point.x,
      event.point.y,
      0,
    ]);

    const direction = targetPosition.sub(interceptorOrigin);
    const normalizedDirection = direction.normalize();
    const normalizedDirectionArray = normalizedDirection.toArray();

    const newInterceptor: Interceptor = {
      id: uuidV4(),
      targetLocation: event.point.toArray() as [number, number, number],
      projectileType: "interceptor",
      origin: interceptorOrigin.toArray() as [number, number, number],
      speed: interceptorData.interceptor1.speed,
      direction: normalizedDirectionArray as [number, number, number],
      interceptorType: "interceptor1",
    };
    dispatch(addInterceptor(newInterceptor));
  };

  const createNewLauncher = (event: ThreeEvent<MouseEvent>) => {
    const newLauncher: Launcher = {
      id: uuidV4(),
      location: [event.point.x, 0, -1],
      type: "launcher1",
    };

    dispatch(addLauncher(newLauncher));
  };

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    if (indicatorMode === "interceptor") {
      fireInterceptor(event);
    } else if (indicatorMode === "launcher_placement") {
      createNewLauncher(event);
    }
  };

  return (
    <group name="clickable-plane">
      <Plane
        args={[100, 100, 20, 20]}
        position={[0, 0, 0]}
        ref={planeRef}
        onClick={onClick}
      >
        <meshBasicMaterial
          transparent
          opacity={0.15}
          color="cyan"
          visible={false}
        />
      </Plane>
    </group>
  );
};

export default McClickableBackground;
