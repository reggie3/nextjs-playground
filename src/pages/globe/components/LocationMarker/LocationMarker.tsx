import React, { useEffect, useRef, useState } from "react";
import { Box, Html } from "@react-three/drei";
import { EARTH_RADIUS_KM_EQUATOR } from "../Globe/globeConstants";
import * as THREE from "three";
import { Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import styles from "./LocationMarker.module.css";

console.log(styles);
export interface LocationMarkerData {
  coords: [number, number];
  name?: string;
  color?: string;
}

type Props = {
  globeRef: React.RefObject<Mesh>;

  locationMarkerData: LocationMarkerData;
};

const getPositionFromLatLong = (latitude: number, longitude: number) => {
  const x = EARTH_RADIUS_KM_EQUATOR * Math.cos(latitude) * Math.sin(longitude);
  const y = EARTH_RADIUS_KM_EQUATOR * Math.sin(latitude);
  const z = EARTH_RADIUS_KM_EQUATOR * Math.cos(latitude) * Math.cos(longitude);

  return [x, y, z] as [number, number, number];
};

const MARKER_HEIGHT = 5;

const LocationMarker = ({ globeRef, locationMarkerData }: Props) => {
  const [markerRef, setMarkerRef] = useState<Mesh>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { coords, color = "#3BF7FF", name = "unknown" } = locationMarkerData;
  const [isPointerOver, setIsPointerOver] = useState<boolean>(false);

  const delay = useRef<number>(Math.random() + 0.5);

  const position = getPositionFromLatLong(
    (coords[0] / 180) * Math.PI,
    (coords[1] / 180) * Math.PI
  );

  useEffect(() => {
    if (markerRef && !isInitialized) {
      const origin = new Vector3(0, 0, 0);

      markerRef.lookAt(origin);
      markerRef.geometry.applyMatrix4(
        new THREE.Matrix4().makeTranslation(0, 0, -MARKER_HEIGHT / 2)
      );
    }
    setIsInitialized(true);
  }, [isInitialized, markerRef]);

  useFrame((state) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();
    //console.log(time);
    if (markerRef) {
      markerRef.scale.z = Math.sin(elapsedTime * 2 * delay.current) + 1.1;
    }
  });

  return (
    <group name={`location-marker-${name}`}>
      <Box
        args={[1, 1, MARKER_HEIGHT]}
        position={position}
        ref={setMarkerRef}
        onPointerEnter={() => setIsPointerOver(true)}
        onPointerLeave={() => setIsPointerOver(false)}
      >
        <meshBasicMaterial color={color} />

        <Html
          as="div" // Wrapping element (default: 'div')
          //   wrapperClass={styles.locationMarkerWrapper}
          center
          occlude={[globeRef]}
          visible={isPointerOver}
          style={{
            color: "#008",
            backgroundColor: "antiquewhite",
            display: "flex",
            padding: " 4px",
            fontSize: "12px",
            borderRadius: "4px",
            border: "1px solid #008",
          }}
        >
          <span>{name}</span>
        </Html>
      </Box>
    </group>
  );
};

export default LocationMarker;
