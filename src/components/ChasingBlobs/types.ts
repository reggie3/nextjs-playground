import { Vector3 } from "@react-three/fiber";

export interface ClickPoint {
  color: Vector3;
  id: string;
  position: Vector3;
}
export interface Jellyfish {
  color: Vector3;
  creationTime: number;
  id: string;
  position: Vector3;
  speed: number;
  lifespanSeconds: number;
  isDead: boolean;
}
