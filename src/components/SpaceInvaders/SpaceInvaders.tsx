import { Box } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { SpaceInvadersContent } from "./components/SpaceInvadersContent";

const SpaceInvaders = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <Canvas dpr={[1, 2]}>
        <SpaceInvadersContent />
      </Canvas>
    </Box>
  );
};

export default SpaceInvaders;
