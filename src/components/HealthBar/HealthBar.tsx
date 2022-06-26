import { Plane } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { NumVec3 } from "../MissileCommand/mcTypes";
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface HealthBarProps {
  position: NumVec3;
  healthValue: number;
}

export const HEALTH_BAR_HEIGHT = 0.16;
export const HEALTH_BAR_WIDTH = 1;

const INSET_BACKGROUND_HEIGHT = HEALTH_BAR_HEIGHT - 0.04;
const INSET_BACKGROUND_WIDTH = HEALTH_BAR_WIDTH - 0.04;

const HealthBar = ({ position, healthValue }: HealthBarProps) => {
  const healthBarValueBarRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (healthBarValueBarRef.current) {
      const xPos =
        (INSET_BACKGROUND_WIDTH - healthValue * INSET_BACKGROUND_WIDTH) / 2;

      // healthBarValueBarRef.current.position.x = Math.min(-1 * xPos, 0.04);
      const targetScale = new THREE.Vector3(healthValue, 1, 1);

      const tween = new TWEEN.Tween(healthBarValueBarRef.current.scale)
        .to(targetScale)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();

      tween.onUpdate(function () {
        console.log(
          "healthBarValueBarRef.current.scale.x",
          healthBarValueBarRef.current.scale.x
        );
        healthBarValueBarRef.current.scale.x =
          healthBarValueBarRef.current.scale.x;
      });
    }
  }, [healthValue]);

  useFrame(() => {
    TWEEN.update();
  });

  return (
    <group name="health-bar">
      <Plane
        name="health-bar-background"
        args={[HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT, 2]}
        position={position}
      >
        <Plane
          name="health-bar-empty"
          args={[INSET_BACKGROUND_WIDTH, INSET_BACKGROUND_HEIGHT, 2]}
          position={[0, 0, 0.01]}
        >
          <meshBasicMaterial color="red" />
        </Plane>
        <Plane
          name="health-bar-value-bar"
          args={[INSET_BACKGROUND_WIDTH, INSET_BACKGROUND_HEIGHT, 2]}
          ref={healthBarValueBarRef}
          position={[0, 0, 0.02]}
        >
          <meshBasicMaterial color="green" />
        </Plane>
      </Plane>
    </group>
  );
};
export default HealthBar;
