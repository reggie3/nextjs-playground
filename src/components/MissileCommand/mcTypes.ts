import launcherData from "./gameData/launchers.json";
import interceptorProjectileData from "./gameData/interceptors.json";
import incomingProjectileData from "./gameData/incomingProjectiles.json";
import { IncomingProjectileStatus } from "./redux/incomingProjectilesSlice";

export type LauncherTypes = keyof typeof launcherData;
export type InterceptorTypes = keyof typeof interceptorProjectileData;
export type IncomingProjectileTypes = keyof typeof incomingProjectileData;

export type ProjectileTypes = "incoming" | "interceptor";

interface Projectile {
  origin: [number, number, number];
  direction: [number, number, number];
  speed: number;
  id: string;
  projectileType: ProjectileTypes;
  position: [number, number, number];
}

export interface IncomingProjectile extends Projectile {
  incomingType: IncomingProjectileTypes;
  status: IncomingProjectileStatus;
}

export interface Interceptor extends Projectile {
  interceptorType: InterceptorTypes;
  targetPosition: [number, number, number];
}

export interface ProjectileImpact {
  id: string;
  type: IncomingProjectileTypes;
  position: [number, number, number];
}

export interface Explosion {
  id: string;
  type: ProjectileTypes;
  specificType: IncomingProjectileTypes | InterceptorTypes;
  position: [number, number, number];
  time: number;
}

export interface Launcher {
  id: string;
  position: [number, number, number];
  type: LauncherTypes;
  targetId?: string;
}

export interface ParticleExplosion {
  id: string;
  position: [number, number, number];
  createdAtSeconds: number;
  isActive: boolean;
}
