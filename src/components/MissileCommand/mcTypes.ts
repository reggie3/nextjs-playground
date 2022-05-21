import { Vector2, Vector3 } from "@react-three/fiber";

interface Projectile {
  origin: Vector3;
  direction: Vector3;
  speed: number;
  id: string;
}

export interface IncomingProjectile extends Projectile {}
