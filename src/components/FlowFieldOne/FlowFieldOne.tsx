import { useEffect, useRef, useState } from "react";
import { useParticles } from "./useParticles";
import styles from "./flowFieldOne.module.css";

export const NUMBER_OF_PARTICLES = 100;

const FlowFieldOne = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [areParticlesInitialized, setAreParticlesInitialized] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const { animate: animateParticles, initParticles } = useParticles();

  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const canvasSizeRef = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    if (canvas && !isInitialized) {
      canvasContextRef.current = canvas.getContext("2d");
      canvasSizeRef.current = [window.innerWidth, window.innerHeight];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasContextRef.current.strokeStyle = "white";
      canvasContextRef.current.fillStyle = "white";

      if (!areParticlesInitialized) {
        initParticles({
          canvasContext: canvasContextRef.current,
          canvasSize: canvasSizeRef.current,
        });
        setAreParticlesInitialized(true);
      }

      setIsInitialized(true);
    }
  }, [areParticlesInitialized, canvas, initParticles, isInitialized]);

  // const drawCircle = (ctx: CanvasRenderingContext2D) => {
  //   ctx.arc(100, 100, 50, 0, Math.PI * 2);
  //   ctx.fill();
  // };

  const eraseCanvas = () => {
    canvasContextRef.current.clearRect(
      0,
      0,
      canvasSizeRef.current[0],
      canvasSizeRef.current[1]
    );
  };

  useEffect(() => {
    let ref: number;

    const animate = (delta: number) => {
      eraseCanvas();
      animateParticles();
      ref = requestAnimationFrame(animate);
    };
    if (!isAnimationStarted) {
      ref = requestAnimationFrame(animate);
      setIsAnimationStarted(true);
    }

    return () => {
      // cancelAnimationFrame(ref);
    };
  }, [animateParticles, isAnimationStarted]);

  return (
    <div data-testid="flow-field-one" className={styles.flowFieldOneContainer}>
      <canvas
        id="canvas"
        data-testid="flow-field-one-canvas"
        className={styles.canvas}
        ref={setCanvas}
      />
    </div>
  );
};
export default FlowFieldOne;
