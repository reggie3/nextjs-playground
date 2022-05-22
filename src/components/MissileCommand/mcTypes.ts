import launcherData from "./gameData/launchers.json";
import interceptorProjectileData from "./gameData/interceptors.json";
import incomingProjectileData from "./gameData/incomingProjectiles.json";

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
}

export interface IncomingProjectile extends Projectile {
  incomingType: IncomingProjectileTypes;
}

export interface Interceptor extends Projectile {
  interceptorType: InterceptorTypes;
  targetLocation: [number, number, number];
}

export interface ProjectileImpact {
  id: string;
  type: IncomingProjectileTypes;
  location: [number, number, number];
}

export interface Explosion {
  id: string;
  type: ProjectileTypes;
  specificType: IncomingProjectileTypes | InterceptorTypes;
  location: [number, number, number];
  time: number;
}

export interface Launcher {
  id: string;
  location: [number, number, number];
  type: LauncherTypes;
}
