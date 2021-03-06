import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { ShaderMaterial } from "three";
import { ExplosionMaterial } from "../../../../Materials/ExplosionMaterial";
import { Explosion } from "../../mcTypes";
import { MissileCommandRootState } from "../../redux/store";

import useExplosions from "./useExplosions";
import { InterceptorExplosionMaterial } from "../../../../Materials/InterceptorExplosionMaterial";

export type ExplosionMeshRefs = Record<
  string,
  { shell: THREE.Mesh; core: THREE.Mesh }
>;

const Explosions = () => {
  const lightRef = useRef();

  const { explosions } = useSelector(
    (state: MissileCommandRootState) => state.explosionsState
  );
  const explosionMeshRefs = useRef<ExplosionMeshRefs>({});

  const { getExplosionColor, getExplosionRadius, getExplosionLifeSpan } =
    useExplosions({
      explosionMeshes: explosionMeshRefs.current,
    });

  return (
    <group name="explosions">
      <directionalLight
        color="#ffffff"
        intensity={1}
        position={[1, 2, 3]}
        ref={lightRef}
      />
      {Object.values(explosions).map((explosion: Explosion) => {
        const radius = getExplosionRadius(
          explosion.type,
          explosion.specificType
        );
        const color = getExplosionColor(
          explosion.type,
          explosion.specificType
        ).toArray();
        const threeColor = new THREE.Color(...color);

        const explosionLifeSpan = getExplosionLifeSpan(
          explosion.type,
          explosion.specificType
        );

        return (
          <group key={explosion.id}>
            <Sphere
              name="explosion-shell"
              position={[
                explosion.position[0],
                explosion.type === "incoming" ? 0 : explosion.position[1],
                -1 * radius,
              ]}
              ref={(ref: THREE.Mesh) => {
                if (ref) {
                  // ref.material.transparent = true;
                  explosionMeshRefs.current[explosion.id] = {
                    shell: ref,
                    core: null,
                  };
                }
              }}
              args={[radius, 10]}
            >
              {/* <meshStandardMaterial
                  attach="material"
                  color={getExplosionColor(
                    explosion.type,
                    explosion.specificType
                  )}
                  transparent
                  opacity={0.25}
                /> */}
              {explosion.type === "incoming" && (
                //  @ts-ignore Property 'explosionMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
                <explosionMaterial
                  key={ExplosionMaterial.key}
                  v3Color={color}
                  uExplosionLifeSpan={explosionLifeSpan}
                />
              )}
              {explosion.type === "interceptor" && (
                // @ts-ignore Property 'interceptorExplosionMaterial' does not exist on type 'JSX.IntrinsicElements'.
                <interceptorExplosionMaterial
                  key={InterceptorExplosionMaterial.key}
                  v3Color={color}
                  uExplosionLifeSpan={explosionLifeSpan}
                />
              )}
            </Sphere>
            {explosion.type === "incoming" && (
              <Sphere
                name="explosion-core"
                position={[
                  explosion.position[0],
                  explosion.type === "incoming" ? 0 : explosion.position[1],
                  -3 * radius,
                ]}
                ref={(ref: THREE.Mesh) => {
                  if (ref) {
                    // ref.material.transparent = true;
                    explosionMeshRefs.current[explosion.id].core = ref;
                  }
                }}
                args={[radius * 0.95, 10]}
              >
                {/* @ts-ignore Property 'interceptorExplosionMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
                {/* <explosionMaterial
                key={ExplosionMaterial.key}
                v3Color={[1, 1, 1]}
                uExplosionLifeSpan={explosionLifeSpan}
              /> */}
                <meshBasicMaterial
                  transparent
                  opacity={0.4}
                  color={[1, 1, 0]}
                />
              </Sphere>
            )}
            {explosion.type === "incoming" && (
              <pointLight
                args={[threeColor, 1, 100]}
                position={[explosion.position[0], 0, -1 * radius]}
              />
            )}
          </group>
        );
      })}
    </group>
  );
};
export default Explosions;
