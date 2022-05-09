import React from "react";
import { Mesh } from "three";
import LocationMarker, {
  LocationMarkerData,
} from "../LocationMarker/LocationMarker";

type Props = {
  globeRef: React.RefObject<Mesh>;
  locations: LocationMarkerData[];
};

const LocationMarkers = ({ globeRef, locations }: Props) => {
  return (
    <>
      {locations.map((location, index) => {
        return (
          <LocationMarker
            key={index}
            locationMarkerData={location}
            globeRef={globeRef}
          />
        );
      })}
    </>
  );
};

export default LocationMarkers;
