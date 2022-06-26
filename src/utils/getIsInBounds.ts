import { NumVec3 } from "../components/MissileCommand/mcTypes";

export interface Bounds {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

const isInBounds = (bounds: Bounds, position: NumVec3): boolean => {
  const { top, right, bottom, left } = bounds;
  const [x, y, z] = position;
  return x < right && x > left && y < top && y > bottom;
};

export default isInBounds;
