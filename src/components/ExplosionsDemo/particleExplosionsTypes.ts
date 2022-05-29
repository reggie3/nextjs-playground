import { Vector3 } from "three";

export interface Explosion {
  id: string;
  position: [number, number, number];
  createdAtSeconds: number;
  isActive: boolean;
}
