import { useCallback, useEffect, useRef, useState } from "react";
import { useParticles } from "./useParticles";
import styles from "./flowFieldOne.module.css";
import { useFlowField } from "./useFlowField";
import { FlowField } from "./useFlowField/useFlowField";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useFlowFieldOneControls } from "./useFlowFieldOneControls";

export const NUMBER_OF_PARTICLES = 100;

const FlowFieldOne = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [areElementsInitialized, setAreElementsInitialized] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const windowSize = useWindowSize();

  const { animate: animateParticles, initParticles } = useParticles();
  const { animate: animateFlowField, initFlowField } = useFlowField();

  const requestAnimationRef = useRef<number>(null);

  useEffect(() => {
    if (canvas && !isInitialized && windowSize) {
      canvasContextRef.current = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasContextRef.current.strokeStyle = "white";
      canvasContextRef.current.fillStyle = "white";

      if (!areElementsInitialized) {
        initParticles({
          canvasContext: canvasContextRef.current,
          canvasSize: windowSize,
        });
        initFlowField({
          canvasContext: canvasContextRef.current,
        });
        setAreElementsInitialized(true);
      }

      setIsInitialized(true);
    }
  }, [
    areElementsInitialized,
    canvas,
    initFlowField,
    initParticles,
    isInitialized,
    windowSize,
  ]);

  // const drawCircle = (ctx: CanvasRenderingContext2D) => {
  //   ctx.arc(100, 100, 50, 0, Math.PI * 2);
  //   ctx.fill();
  // };

  const eraseCanvas = useCallback(() => {
    canvasContextRef.current.clearRect(0, 0, windowSize[0], windowSize[1]);
  }, [windowSize]);

  useEffect(() => {
    return () => {
      console.log("-- stopping animation");
      requestAnimationRef.current &&
        cancelAnimationFrame(requestAnimationRef.current);
      setIsAnimationStarted(false);
    };
  }, []);

  useEffect(() => {
    const animate = (delta: number) => {
      eraseCanvas();
      animateFlowField();
      animateParticles();
      requestAnimationRef.current = requestAnimationFrame(animate);
    };

    if (isInitialized && !isAnimationStarted) {
      console.log("++ starting animation");
      requestAnimationRef.current = requestAnimationFrame(animate);
      setIsAnimationStarted(true);
    }
  }, [
    animateFlowField,
    animateParticles,
    eraseCanvas,
    isAnimationStarted,
    isInitialized,
  ]);

  return (
    <canvas
      id="canvas"
      data-testid="flow-field-one-canvas"
      className={styles.canvas}
      ref={setCanvas}
    />
  );
};
export default FlowFieldOne;
