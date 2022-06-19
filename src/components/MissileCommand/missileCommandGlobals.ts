// each unit = 1 km

export const GAME_FIELD_WIDTH = 20;
export const GAME_FIELD_HEIGHT = (GAME_FIELD_WIDTH * 9) / 16;
export const CAMERA_Y_POS = 5.5;

// z-indices
export const Z_GROUND = 0;
export const Z_LAUNCHERS = -1;
export const Z_INTERCEPTORS = -1;
export const Z_CITIES = -1.25;
export const Z_INCOMING_PROJECTILES = -1;
export const Z_INTERCEPTOR_EXPLOSIONS = -4;
export const Z_INCOMING_PROJECTILE_EXPLOSIONS = -5;

export const PARTICLE_EXPLOSIONS = {
  color: "rgb(255, 255, 0)",
  number: 12,
  size: 0.05,
  lifespan: 0.75,
  speed: 0.04,
};
