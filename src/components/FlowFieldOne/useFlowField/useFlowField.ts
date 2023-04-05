import { useCallback, useEffect, useRef } from "react";
import { useFlowFieldOneControls } from "../useFlowFieldOneControls";
import { useWindowSize } from "../../../hooks/useWindowSize";

interface InitFlowFieldArgs {
  canvasContext?: CanvasRenderingContext2D;
}

export type FlowField = number[];
let flowField: FlowField = [];

const useFlowField = () => {
  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const windowSize = useWindowSize();
  const { isDebug, curve, flowFieldCellSize, zoom } = useFlowFieldOneControls();

  const numColsRowsRef = useRef<{ cols: number; rows: number }>({
    cols: 0,
    rows: 0,
  });

  const flowFieldCellSizeRef = useRef(flowFieldCellSize);
  const isDebugRef = useRef(isDebug);
  const zoomRef = useRef(zoom);
  const curveRef = useRef(curve);

  const initFlowField = useCallback(
    ({ canvasContext }: InitFlowFieldArgs) => {
      if (canvasContext) {
        canvasContextRef.current = canvasContext;
      }
      if (!windowSize || !canvasContextRef.current) return null;

      flowField = [];

      flowFieldCellSizeRef.current = flowFieldCellSize;
      zoomRef.current = zoom;
      curveRef.current = curve;

      numColsRowsRef.current = {
        cols: Math.floor(windowSize[0] / flowFieldCellSizeRef.current),
        rows: Math.floor(windowSize[1] / flowFieldCellSizeRef.current),
      };

      for (let y = 0; y < numColsRowsRef.current.rows; y++) {
        for (let x = 0; x < numColsRowsRef.current.cols; x++) {
          let angle =
            (Math.cos(x * zoomRef.current) + Math.sin(y * zoomRef.current)) *
            curveRef.current;
          flowField.push(angle);
        }
      }

      console.log({ flowField });
      return flowField;
    },
    [curve, flowFieldCellSize, windowSize, zoom]
  );

  useEffect(() => {
    initFlowField({});
  }, [curve, flowFieldCellSize, initFlowField, windowSize, zoom]);

  useEffect(() => {
    if (windowSize) {
      flowFieldCellSizeRef.current = flowFieldCellSize;

      numColsRowsRef.current = {
        cols: Math.floor(windowSize[0] / flowFieldCellSizeRef.current),
        rows: Math.floor(windowSize[1] / flowFieldCellSizeRef.current),
      };
    }
  }, [flowFieldCellSize, windowSize]);

  useEffect(() => {
    isDebugRef.current = isDebug;
  }, [isDebug]);

  const drawFlowField = () => {
    for (let c = 0; c < numColsRowsRef.current.cols; c++) {
      const canvasContext = canvasContextRef.current;
      canvasContext.beginPath();
      canvasContext.moveTo(flowFieldCellSizeRef.current * c, 0);
      canvasContext.lineTo(flowFieldCellSizeRef.current * c, windowSize[1]);
      canvasContext.stroke();
    }
    for (let r = 0; r < numColsRowsRef.current.rows; r++) {
      const canvasContext = canvasContextRef.current;
      canvasContext.beginPath();
      canvasContext.moveTo(0, flowFieldCellSizeRef.current * r);
      canvasContext.lineTo(windowSize[0], flowFieldCellSizeRef.current * r);
      canvasContext.stroke();
    }
  };

  const animate = () => {
    if (isDebugRef.current) {
      drawFlowField();
    }
  };

  const getCellProperties = (particlePos: [number, number]) => {
    let x = Math.floor(particlePos[0] / flowFieldCellSize);
    let y = Math.floor(particlePos[1] / flowFieldCellSize);
    const index = y * numColsRowsRef.current.cols + x;

    const angle = flowField[index];
    return { angle };
  };

  return { animate, getCellProperties, initFlowField };
};

export default useFlowField;
