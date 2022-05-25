import { Sphere } from "@react-three/drei";
import { IncomingProjectile } from "../../../mcTypes";

export interface InterceptedProjectileProps {
  incomingProjectile: IncomingProjectile;
  setProjectileMeshRef: (ref: THREE.Mesh, id: string) => void;
}

const InterceptedProjectile = ({
  incomingProjectile,
  setProjectileMeshRef,
}: InterceptedProjectileProps) => {
  return (
    <Sphere
      ref={(ref: THREE.Mesh) => {
        setProjectileMeshRef(ref, incomingProjectile.id);
      }}
      key={incomingProjectile.id}
      args={[0.1]}
      position={incomingProjectile.position}
    >
      <meshStandardMaterial attach="material" color="purple" />
    </Sphere>
  );
};

export default InterceptedProjectile;
