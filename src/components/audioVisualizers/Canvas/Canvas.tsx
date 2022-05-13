import React, { useCallback, useEffect, useRef } from "react";
import { PlaybackStatus } from "../PlaybackControls";
import styles from "./canvas.module.css";

type Props = {
  analyser: AnalyserNode | undefined;
  bufferLength: number | undefined;
  dataArray: Uint8Array | undefined;
  height: number;
  playbackStatus: PlaybackStatus | undefined;
  width: number;
};

const Canvas = ({
  analyser,
  bufferLength,
  dataArray,
  height,
  playbackStatus,
  width,
}: Props) => {
  console.log({ playbackStatus });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isCanvasInitialized, setIsCanvasInitialized] =
    React.useState<boolean>(false);
  const animationId = useRef<number>();

  const updateVisualizer = useCallback(() => {
    if (
      playbackStatus === "playing" &&
      analyser &&
      canvasContextRef.current &&
      dataArray &&
      bufferLength &&
      canvasRef.current
    ) {
      // console.log("in animate, time: ", time, " delta: ", delta);
      canvasContextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      analyser.getByteFrequencyData(dataArray);
      const barWidth = canvasRef.current.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        let barHeight = dataArray[i];
        canvasContextRef.current.fillStyle = `hsl(${
          (barHeight * 360) / bufferLength
        }, 100%, 50%)`;
        canvasContextRef.current.fillRect(
          x,
          canvasRef.current.height,
          barWidth,
          -1 * barHeight * 2
        );
        x += barWidth;
      }
    }
    requestAnimationFrame(updateVisualizer);
  }, [
    playbackStatus,
    analyser,
    canvasContextRef,
    dataArray,
    bufferLength,
    canvasRef,
  ]);

  // redraw the canvas on resize
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.height = height;
      canvasRef.current.width = width;
    }
  }, [width, height]);

  // initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && !isCanvasInitialized) {
      const context = canvas.getContext("2d");
      if (context) {
        canvasContextRef.current = context;
        setIsCanvasInitialized(true);
      }
    }
  }, [isCanvasInitialized]);

  useEffect(() => {
    if (playbackStatus === "playing" && !Boolean(animationId.current)) {
      updateVisualizer();
    }
  }, [updateVisualizer, playbackStatus]);

  return (
    <canvas
      id="canvas"
      data-testid="canvas"
      ref={canvasRef}
      className={styles.canvas}
    />
  );
};

export default Canvas;
