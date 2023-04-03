import { useRef } from "react";
import { useFlowField } from "../useFlowField";
import { useWindowSize } from "../../../hooks/useWindowSize";

export interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  speedModifier: number;
  positionHistory: [number, number][];
  trailLength: number;
  angle: number;
  timer: number;
}

const useParticle = () => {
  const { getCellProperties } = useFlowField();
  const particleRef = useRef<Particle>();
  const windowSize = useWindowSize();

  const initParticle = (canvasSize: [number, number]) => {
    const trailLength = Math.floor(Math.random() * 200 + 10);
    const particle = {
      x: Math.floor(Math.random() * canvasSize[0]),
      y: Math.floor(Math.random() * canvasSize[1]),
      speedX: Math.random() * 5 - 2.5,
      speedY: Math.random() * 5 - 2.5,
      speedModifier: Math.floor(Math.random() * 5 + 1),
      positionHistory: [],
      trailLength,
      angle: 0,
      timer: trailLength * 2,
    };

    particleRef.current = particle;
    return particle;
  };

  const updateParticle = (
    ctx: CanvasRenderingContext2D,
    particle: Particle
  ) => {
    const { angle } = getCellProperties([particle.x, particle.y]);

    if (!angle) return;

    particle.timer = Math.max(0, particle.timer - 1);
    if (particle.timer >= 1) {
      particle.angle = angle;

      particle.speedX = Math.cos(angle);
      particle.speedY = Math.sin(angle);

      const newPos: [number, number] = [
        particle.x + particle.speedX * particle.speedModifier,
        particle.y + particle.speedY * particle.speedModifier,
      ];

      particle.x = newPos[0];
      particle.y = newPos[1];

      particle.positionHistory.push(newPos);
      if (particle.positionHistory.length > particle.trailLength) {
        particle.positionHistory.shift();
      }
    } else if (particle.positionHistory.length > 1) {
      particle.positionHistory.shift();
    } else {
      resetParticle(particle);
    }

    animateParticle(ctx, particle);
  };

  const animateParticle = (
    ctx: CanvasRenderingContext2D,
    particle: Particle
  ) => {
    // draw the history trails
    if (particle.positionHistory.length) {
      ctx.beginPath();
      ctx.moveTo(
        particle.positionHistory[0][0],
        particle.positionHistory[0][1]
      );

      particle.positionHistory.forEach((historyItem) => {
        ctx.lineTo(historyItem[0], historyItem[1]);
      });

      ctx.stroke();
    }
  };

  const resetParticle = (particle: Particle) => {
    particle.x = Math.floor(Math.random() * windowSize[0]);
    particle.y = Math.floor(Math.random() * windowSize[1]);
    particle.positionHistory = [[particle.x, particle.y]];
  };

  return { initParticle, updateParticle };
};

export default useParticle;
