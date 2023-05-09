import React from "react";
import { ChasingBlobs } from "../../components/ChasingBlobs";
import { Typography } from "@mui/material";
import { CustomLink } from "../../components/CustomLink";
import { InformationBox } from "../../components/InformationBox";

type Props = {};

const index = (props: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <ChasingBlobs />
      <InformationBox>
        <Typography>Three JS Particle System Demo</Typography>
        <Typography variant="body2">
          Click on the screen to create some 3D blobs, and then move your mouse
          to make the blobs chase it.
        </Typography>
        <Typography variant="body2">
          Don&apos;t make them angry or they might fly out of the screen at you.
        </Typography>
      </InformationBox>
    </div>
  );
};

export default index;
