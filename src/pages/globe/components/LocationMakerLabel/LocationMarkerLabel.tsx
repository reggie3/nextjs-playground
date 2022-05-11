import { Html } from "@react-three/drei";
import React from "react";
import { Mesh } from "three";

type Props = {
  globeRef: React.RefObject<Mesh>;
  name: string;
  onClose: () => void;
};

const LocationMarkerLabel = ({ globeRef, name, onClose }: Props) => {
  return (
    <Html
      as="div" // Wrapping element (default: 'div')
      //   wrapperClass={styles.locationMarkerWrapper}
      center
      occlude={[globeRef]}
    >
      <div
        style={{
          color: "white",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          padding: " 4px",
          fontSize: "12px",
          borderRadius: 2,
          position: "relative",
        }}
      >
        <span>{name}</span>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            top: -6,
            right: -6,
            backgroundColor: "rgba(0,0,0,0.5)",
            fontSize: 10,
            textAlign: "center",
            position: "absolute",
            cursor: "pointer",
            pointerEvents: "all",
          }}
          onClick={onClose}
        >
          x
        </div>
      </div>
    </Html>
  );
};

export default LocationMarkerLabel;
