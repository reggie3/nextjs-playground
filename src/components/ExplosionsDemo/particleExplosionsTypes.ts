import { NumVec3 } from "../MissileCommand/mcTypes";

export interface Explosion {
  id: string;
  position: NumVec3;
  createdAtSeconds: number;
  isActive: boolean;
}
