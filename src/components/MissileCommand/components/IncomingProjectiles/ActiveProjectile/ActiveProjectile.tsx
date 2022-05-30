import { Sphere } from "@react-three/drei";
import { IncomingProjectile } from "../../../mcTypes";

export interface ActiveProjectileProps {
  incomingProjectile: IncomingProjectile;
  setProjectileMeshRef: (ref: THREE.Mesh, id: string) => void;
}

const ActiveProjectile = ({
  incomingProjectile,
  setProjectileMeshRef,
}: ActiveProjectileProps) => {
  return (
    <Sphere
      ref={(ref: THREE.Mesh) => {
        setProjectileMeshRef(ref, incomingProjectile.id);
      }}
      key={incomingProjectile.id}
      args={[0.035]}
      position={incomingProjectile.position}
    >
      <meshStandardMaterial attach="material" color="red" />
    </Sphere>
  );
};
export default ActiveProjectile;
