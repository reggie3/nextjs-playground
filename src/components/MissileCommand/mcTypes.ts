export type IncomingProjectileTypes = "standard";
export type InterceptorProjectileTypes = "proximity";

interface Projectile {
  origin: [number, number, number];
  direction: [number, number, number];
  speed: number;
  id: string;
}

export interface IncomingProjectile extends Projectile {
  type: IncomingProjectileTypes;
}

export interface Interceptor extends Projectile {
  type: InterceptorProjectileTypes;
  targetLocation: [number, number, number];
}

export interface ProjectileImpact {
  id: string;
  type: IncomingProjectileTypes;
  location: [number, number, number];
}

export interface Explosion {
  id: string;
  type: IncomingProjectileTypes | InterceptorProjectileTypes;
  location: [number, number, number];
  time: number;
}
