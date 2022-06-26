import launcherData from "./gameData/launchers.json";
import interceptorProjectileData from "./gameData/interceptors.json";
import incomingProjectileData from "./gameData/incomingProjectiles.json";
import { IncomingProjectileStatus } from "./redux/incomingProjectilesSlice";

export type LauncherTypes = keyof typeof launcherData;
export type InterceptorTypes = keyof typeof interceptorProjectileData;
export type IncomingProjectileTypes = keyof typeof incomingProjectileData;
export type ProjectileTypes = "incoming" | "interceptor";
export type NumVec3 = [number, number, number];

interface Projectile {
  origin: NumVec3;
  direction: NumVec3;
  speed: number;
  id: string;
  projectileType: ProjectileTypes;
  position: NumVec3;
}

export interface IncomingProjectile extends Projectile {
  incomingType: IncomingProjectileTypes;
  status: IncomingProjectileStatus;
}

export interface Interceptor extends Projectile {
  interceptorType: InterceptorTypes;
  targetPosition: NumVec3;
}

export interface ProjectileImpact {
  id: string;
  type: IncomingProjectileTypes;
  position: NumVec3;
}

export interface Explosion {
  id: string;
  type: ProjectileTypes;
  specificType: IncomingProjectileTypes | InterceptorTypes;
  position: NumVec3;
  time: number;
}

export interface Launcher {
  id: string;
  position: NumVec3;
  type: LauncherTypes;
  targetId?: string;
}

export interface ParticleExplosion {
  id: string;
  position: NumVec3;
  createdAtSeconds: number;
  isActive: boolean;
}

export interface CityData {
  id: string;
  position: NumVec3;
  createdAtSeconds: number;
  health: number;
  numBuildings: number;
}
