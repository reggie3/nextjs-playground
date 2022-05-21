import React from "react";
import { ChasingBlobs } from "../../components/ChasingBlobs";

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
    </div>
  );
};

export default index;
