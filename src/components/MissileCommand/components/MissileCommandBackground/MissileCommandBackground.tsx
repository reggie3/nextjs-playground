import { Plane } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree, Vector3 } from "@react-three/fiber";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import { v4 as uuidV4 } from "uuid";
import { Interceptor } from "../../mcTypes";
import { addInterceptor } from "../../redux/interceptorsSlice";
import interceptorData from "../../gameData/interceptors.json";

type MissileCommandBackgroundProps = {};

const MissileCommandBackground = ({}: MissileCommandBackgroundProps) => {
  const planeRef = useRef<THREE.Mesh>();
  const { camera } = useThree();
  const dispatch = useDispatch();

  useFrame(() => {
    if (planeRef) {
      // rotate the plane so that it is always facing the camera
      planeRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    console.log("onClick", event.point);
    const interceptorOrigin = new THREE.Vector3(0, 0, 0);
    const targetPosition = new THREE.Vector3().fromArray([
      event.point.x,
      event.point.y,
      0,
    ]);

    const direction = targetPosition.sub(interceptorOrigin);
    const normalizedDirection = direction.normalize();
    const normalizedDirectionArray = normalizedDirection.toArray();

    debugger;

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

    console.log("newInterceptor", newInterceptor);
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

export default MissileCommandBackground;
