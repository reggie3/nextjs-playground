import { Vector2, Vector3 } from "@react-three/fiber";

export type IncomingProjectileTypes = "standard";
interface Projectile {
  origin: Vector3;
  direction: Vector3;
  speed: number;
  id: string;
  type: IncomingProjectileTypes;
}

export interface IncomingProjectile extends Projectile {}

export interface ProjectileImpact {
  id: string;
  type: IncomingProjectileTypes;
  location: Vector3;
}
