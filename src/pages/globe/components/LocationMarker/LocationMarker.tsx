import React, { useEffect, useRef, useState } from "react";
import { Box, Sphere } from "@react-three/drei";
import { EARTH_RADIUS_KM_EQUATOR } from "../Globe/globeConstants";
import * as THREE from "three";
import { Material, Mesh, PointLight, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import styles from "./LocationMarker.module.css";
import { LocationMarkerLabel } from "../LocationMakerLabel";
import { INITIAL_EARTH_ARGS } from "../Globe/Globe";

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
const MARKER_COLOR = "#3BF7FF";
const SELECTED_MARKER_COLOR = "#ffcc00";

const LocationMarker = ({ globeRef, locationMarkerData }: Props) => {
  const [markerRef, setMarkerRef] = useState<Mesh>();
  const [pointLightRef, setPointLightRef] = useState<PointLight>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isPointLightInitialized, setIsPointLightInitialized] =
    useState<boolean>(false);
  const { coords, color = MARKER_COLOR, name = "unknown" } = locationMarkerData;
  const [isPointerOver, setIsPointerOver] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const initialPointLightVectorRef = useRef<Vector3>();

  const delay = useRef<number>(Math.random() + 0.5);

  const position = getPositionFromLatLong(
    (coords[0] / 180) * Math.PI,
    (coords[1] / 180) * Math.PI
  );

  useEffect(() => {
    if (markerRef && pointLightRef && !isInitialized) {
      const origin = new Vector3(0, 0, 0);

      // move the base of the marker to the surface of the sphere
      markerRef.lookAt(origin);
      markerRef.geometry.applyMatrix4(
        new THREE.Matrix4().makeTranslation(0, 0, -MARKER_HEIGHT / 2)
      );

      pointLightRef.lookAt(origin);
      const markerRefLength = markerRef.position.length();
      const lightVector = markerRef.position.clone();
      lightVector.setLength(markerRefLength);
      pointLightRef.position.copy(lightVector);
      initialPointLightVectorRef.current = lightVector;
    }
    setIsInitialized(true);
  }, [isInitialized, markerRef, pointLightRef]);

  useFrame((state) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();
    //console.log(time);
    if (markerRef) {
      markerRef.scale.z = Math.sin(elapsedTime * 2 * delay.current) + 1.1;

      if (isSelected || isPointerOver) {
        (markerRef.material as Material).opacity = isSelected ? 1 : 0.6;
        // @ts-ignore Property 'color' does not exist on type 'Material'.
        (markerRef.material as Material).color = new THREE.Color(
          SELECTED_MARKER_COLOR
        );
      } else {
        (markerRef.material as Material).opacity = 0.4;
        // @ts-ignore Property 'color' does not exist on type 'Material'.
        (markerRef.material as Material).color = new THREE.Color(color);
      }
    }

    if (pointLightRef && initialPointLightVectorRef.current) {
      const newLightVector = initialPointLightVectorRef.current.clone();
      newLightVector.setLength(
        Math.max(
          initialPointLightVectorRef.current.length(),
          initialPointLightVectorRef.current.length() +
            MARKER_HEIGHT * 1.5 * Math.sin(elapsedTime * 2 * delay.current) +
            1.2
        )
      );
      pointLightRef.position.copy(newLightVector);
      if (isSelected || isPointerOver) {
        pointLightRef.color = new THREE.Color(SELECTED_MARKER_COLOR);
      } else {
        pointLightRef.color = new THREE.Color(MARKER_COLOR);
      }
    }
  });

  const onCloseLocationMarker = () => {
    setIsSelected(false);
  };

  return (
    <group name={`location-marker-${name}`}>
      <Box
        args={[1.5, 1.5, MARKER_HEIGHT]}
        position={position}
        ref={setMarkerRef}
        onPointerEnter={() => setIsPointerOver(true)}
        onPointerLeave={() => setIsPointerOver(false)}
        onClick={() => setIsSelected(!isSelected)}
      >
        <meshPhongMaterial color={color} opacity={0.25} transparent />
        {isSelected && (
          <LocationMarkerLabel
            globeRef={globeRef}
            name={name}
            onClose={onCloseLocationMarker}
          />
        )}
      </Box>
      <pointLight
        ref={setPointLightRef}
        args={[MARKER_COLOR, 1, 100]}
        position={position}
      >
        <Sphere args={[1, 10]}>
          <meshBasicMaterial color="green" visible={false} />
        </Sphere>
      </pointLight>
    </group>
  );
};

export default LocationMarker;
