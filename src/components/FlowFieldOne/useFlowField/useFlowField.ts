import { useCallback, useEffect, useRef } from "react";
import { useFlowFieldOneControls } from "../useFlowFieldOneControls";
import { useWindowSize } from "../../../hooks/useWindowSize";

interface InitFlowFieldArgs {
  canvasContext: CanvasRenderingContext2D;
}

export type FlowField = number[];
let flowField: FlowField = [];

const useFlowField = () => {
  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const windowSize = useWindowSize();
  const { curve, flowFieldCellSize, zoom } = useFlowFieldOneControls();

  const numColsRowsRef = useRef<{ cols: number; rows: number }>({
    cols: 0,
    rows: 0,
  });

  const flowFieldCellSizeRef = useRef(10);

  const setFlowFieldValues = useCallback(() => {
    for (let y = 0; y < numColsRowsRef.current.rows; y++) {
      for (let x = 0; x < numColsRowsRef.current.cols; x++) {
        let angle = (Math.cos(x * zoom) + Math.sin(y * zoom)) * curve;
        flowField.push(angle);
      }
    }
  }, [curve, zoom]);

  const initFlowField = useCallback(
    ({ canvasContext }: InitFlowFieldArgs) => {
      if (!windowSize || !canvasContext) return null;

      console.log({ curve });
      console.log({ zoom });
      flowField = [];

      canvasContextRef.current = canvasContext;

      numColsRowsRef.current = {
        cols: Math.floor(windowSize[0] / flowFieldCellSize),
        rows: Math.floor(windowSize[1] / flowFieldCellSize),
      };

      setFlowFieldValues();

      return flowField;
    },
    [curve, flowFieldCellSize, setFlowFieldValues, windowSize, zoom]
  );

  useEffect(() => {
    initFlowField({
      canvasContext: canvasContextRef.current,
    });
  }, [curve, initFlowField, zoom]);

  useEffect(() => {
    if (windowSize) {
      flowFieldCellSizeRef.current = flowFieldCellSize;

      numColsRowsRef.current = {
        cols: Math.floor(windowSize[0] / flowFieldCellSizeRef.current),
        rows: Math.floor(windowSize[1] / flowFieldCellSizeRef.current),
      };
    }
  }, [flowFieldCellSize, windowSize]);

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
    drawFlowField();
  };

  const getCellProperties = (particlePos: [number, number]) => {
    let x = Math.floor(particlePos[0] / flowFieldCellSize);
    let y = Math.floor(particlePos[1] / flowFieldCellSize);
    const index = y * numColsRowsRef.current.cols + x;

    const angle = flowField[index];
    return { angle };
  };

  return { animate, initFlowField, getCellProperties };
};

export default useFlowField;
