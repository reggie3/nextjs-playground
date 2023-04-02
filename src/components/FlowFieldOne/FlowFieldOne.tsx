import { useRef } from "react";

export interface FlowFieldOneProps {}
const FlowFieldOne = (props: FlowFieldOneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  return (
    <div data-testid="flow-field-one">
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};
export default FlowFieldOne;
