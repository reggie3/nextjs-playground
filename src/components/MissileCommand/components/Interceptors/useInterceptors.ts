import { useFrame, useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { Vector3 } from "three";
import { Explosion, Interceptor } from "../../mcTypes";
import { GAME_FIELD_HEIGHT } from "../../missileCommandGlobals";
import { addExplosion } from "../../redux/explosionsSlice";
import { removeInterceptor } from "../../redux/interceptorsSlice";
import { MissileCommandRootState } from "../../redux/store";
import interceptorData from "../../gameData/interceptors.json";

type Props = {
  interceptorMeshes: Record<string, THREE.Mesh>;
};

const useInterceptors = ({ interceptorMeshes }: Props) => {
  const dispatch = useDispatch();
  const { clock } = useThree();
  const { interceptors } = useSelector(
    (state: MissileCommandRootState) => state.interceptorsState
  );

  const killInterceptor = (interceptor: Interceptor) => {
    dispatch(removeInterceptor(interceptor.id));
    delete interceptorMeshes[interceptor.id];
  };

  const makeExplosion = (
    interceptor: Interceptor,
    interceptorMesh: THREE.Mesh
  ) => {
    let interceptorHit: Explosion = {
      location: [interceptorMesh.position.x, interceptorMesh.position.y, 0],
      id: interceptor.id,
      type: "interceptor",
      specificType: interceptor.interceptorType,
      time: clock.getElapsedTime(),
    };
    dispatch(addExplosion(interceptorHit));
  };

  useFrame(() => {
    Object.values(interceptors).map((interceptor: Interceptor) => {
      const interceptorMesh = interceptorMeshes[interceptor.id];

      if (interceptor) {
        // remove any interceptors that have gone off the screen
        if (interceptorMesh.position.y > GAME_FIELD_HEIGHT) {
          killInterceptor(interceptor);
          return;
        }

        // explode the interceptor if it is beyond max range
        const distanceTraveled = interceptorMesh.position.distanceTo(
          new Vector3().fromArray(interceptor.origin)
        );
        if (
          distanceTraveled >
          interceptorData[interceptor.interceptorType].maxRange
        ) {
          killInterceptor(interceptor);
          makeExplosion(interceptor, interceptorMesh);
          return;
        }

        //  explode any interceptors that reach their target
        const distanceToTarget = interceptorMesh.position.distanceTo(
          new Vector3().fromArray(interceptor.targetLocation)
        );
        if (distanceToTarget < 0.1) {
          killInterceptor(interceptor);
          makeExplosion(interceptor, interceptorMesh);
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

  return {};
};

export default useInterceptors;
