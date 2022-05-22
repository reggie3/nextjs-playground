import { Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vector3 } from "three";
import { Explosion, Interceptor } from "../../mcTypes";
import { GAME_FIELD_HEIGHT } from "../../missileCommandGlobals";
import { addExplosion } from "../../redux/explosionsSlice";
import { removeInterceptor } from "../../redux/interceptorsSlice";
import { MissileCommandRootState } from "../../redux/store";

export interface InterceptorsProps {}

const Interceptors = (props: InterceptorsProps) => {
  const dispatch = useDispatch();
  const interceptorMeshRefs = useRef<Record<string, THREE.Mesh>>({});
  const { clock } = useThree();
  const { interceptors } = useSelector(
    (state: MissileCommandRootState) => state.interceptorsState
  );

  useFrame(() => {
    Object.values(interceptors).map((interceptor: Interceptor) => {
      const interceptorMesh = interceptorMeshRefs.current[interceptor.id];

      if (interceptor) {
        // remove any interceptors that have gone off the screen
        if (interceptorMesh.position.y > GAME_FIELD_HEIGHT) {
          dispatch(removeInterceptor(interceptor.id));
          delete interceptorMeshRefs.current[interceptor.id];
          return;
        }

        // TODO: explode any interceptors that reach their target
        const distanceToTarget = interceptorMesh.position.distanceTo(
          new Vector3().fromArray(interceptor.targetLocation)
        );
        if (distanceToTarget < 0.1) {
          console.log({ distanceToTarget });

          dispatch(removeInterceptor(interceptor.id));
          delete interceptorMeshRefs.current[interceptor.id];
          let interceptorHit: Explosion = {
            location: [
              interceptorMesh.position.x,
              interceptorMesh.position.y,
              0,
            ],
            id: interceptor.id,
            type: interceptor.type,
            time: clock.getElapsedTime(),
          };
          dispatch(addExplosion(interceptorHit));
          return;
        }

        // move the interceptor towards its target
        const { direction, speed } = interceptor;
        const movementVector = new Vector3()
          .fromArray(direction)
          .multiplyScalar(speed);
        const newPosition = interceptorMesh.position
          .clone()
          .add(movementVector);
        interceptorMesh.position.set(
          newPosition.x,
          newPosition.y,
          newPosition.z
        );
      }
    });
  });

  console.log("interceptors", Object.keys(interceptors).length);
  return (
    <group name="interceptors">
      {Object.values(interceptors).map((interceptor: Interceptor) => {
        return (
          <Sphere
            ref={(ref: THREE.Mesh) => {
              if (ref) {
                interceptorMeshRefs.current[interceptor.id] = ref;
              }
            }}
            key={interceptor.id}
            args={[0.075]}
            position={interceptor.origin}
          >
            <meshStandardMaterial color="yellow" />
          </Sphere>
        );
      })}
    </group>
  );
};
export default Interceptors;
