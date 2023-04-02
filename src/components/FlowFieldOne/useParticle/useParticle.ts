import { useRef } from "react";

export interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  positionHistory: [number, number][];
  trailLength: number;
}

const useParticle = () => {
  const initParticle = (canvasSize: [number, number]) => {
    return {
      x: Math.floor(Math.random() * canvasSize[0]),
      y: Math.floor(Math.random() * canvasSize[1]),
      speedX: Math.random() * 5 - 2.5,
      speedY: Math.random() * 5 - 2.5,
      positionHistory: [],
      // trailLength: Math.floor(Math.random() * 15 + 10),
      trailLength: Infinity,
    };
  };

  const updateParticle = (
    ctx: CanvasRenderingContext2D,
    particle: Particle
  ) => {
    const newPos: [number, number] = [
      particle.x + particle.speedX + Math.random() * 3 - 1.5,
      particle.y + particle.speedY + Math.random() * 3 - 1.5,
    ];
    particle.x = newPos[0];
    particle.y = newPos[1];
    particle.positionHistory.push(newPos);
    if (particle.positionHistory.length > particle.trailLength) {
      particle.positionHistory.shift();
    }

    animateParticle(ctx, particle);
  };

  const animateParticle = (
    ctx: CanvasRenderingContext2D,
    particle: Particle
  ) => {
    ctx.fillRect(particle.x, particle.y, 10, 10);

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

  return { initParticle, updateParticle };
};

export default useParticle;
