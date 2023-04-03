import { useCallback, useEffect, useRef } from "react";
import { useParticle } from "../useParticle";
import { Particle } from "../useParticle/useParticle";
import { useFlowFieldOneControls } from "../useFlowFieldOneControls";

interface InitParticlesArgs {
  canvasContext: CanvasRenderingContext2D;
  canvasSize: [number, number];
}

const useParticles = () => {
  const { numberOfParticles } = useFlowFieldOneControls();

  const particlesRef = useRef<Particle[]>([]);
  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const canvasSizeRef = useRef<[number, number]>([0, 0]);

  const { initParticle, updateParticle } = useParticle();

  const initParticles = useCallback(
    ({ canvasContext, canvasSize }: InitParticlesArgs) => {
      particlesRef.current = [];

      canvasContextRef.current = canvasContext;
      canvasSizeRef.current = canvasSize;

      for (let i = 0; i < numberOfParticles; i++) {
        particlesRef.current.push(initParticle(canvasSize));
      }
    },
    [initParticle, numberOfParticles]
  );

  useEffect(() => {
    initParticles({
      canvasContext: canvasContextRef.current,
      canvasSize: canvasSizeRef.current,
    });
  }, [initParticles, numberOfParticles]);

  const animate = () => {
    particlesRef.current.forEach((particle) => {
      updateParticle(canvasContextRef.current, particle);
    });
  };

  return { animate, initParticles };
};

export default useParticles;
