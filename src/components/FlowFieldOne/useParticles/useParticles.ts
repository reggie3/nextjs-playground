import { useRef } from "react";
import { NUMBER_OF_PARTICLES } from "../FlowFieldOne";
import { useParticle } from "../useParticle";
import { Particle } from "../useParticle/useParticle";

interface InitParticlesArgs {
  canvasContext: CanvasRenderingContext2D;
  canvasSize: [number, number];
}

const useParticles = () => {
  const particlesRef = useRef<Particle[]>([]);
  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const canvasSizeRef = useRef<[number, number]>([0, 0]);

  const { initParticle, updateParticle } = useParticle();

  const initParticles = ({ canvasContext, canvasSize }: InitParticlesArgs) => {
    console.count("initializing particles");
    canvasContextRef.current = canvasContext;
    canvasSizeRef.current = canvasSize;

    for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
      particlesRef.current.push(initParticle(canvasSize));
    }
  };

  const updateParticles = () => {
    particlesRef.current.forEach((particle) => {
      updateParticle(canvasContextRef.current, particle);
    });
  };

  const animate = () => {
    updateParticles();
  };

  return { animate, initParticles };
};

export default useParticles;
