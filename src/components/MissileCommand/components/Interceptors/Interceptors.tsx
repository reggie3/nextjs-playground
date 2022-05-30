import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Interceptor } from "../../mcTypes";
import { MissileCommandRootState } from "../../redux/store";
import useInterceptors from "./useInterceptors";

export interface InterceptorsProps {}

const Interceptors = (props: InterceptorsProps) => {
  const interceptorMeshRefs = useRef<Record<string, THREE.Mesh>>({});
  const { interceptors } = useSelector(
    (state: MissileCommandRootState) => state.interceptorsState
  );

  useInterceptors({ interceptorMeshes: interceptorMeshRefs.current });

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
            args={[0.025]}
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
