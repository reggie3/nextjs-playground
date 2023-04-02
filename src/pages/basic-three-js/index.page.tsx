import React from "react";
import { BasicThreeJSBlockAndTwoBalls } from "../../components/BasicThreeJSBlockAndTwoBalls";

type Props = {};

const BasicThreeJsPage = (props: Props) => {
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
      <BasicThreeJSBlockAndTwoBalls />
    </div>
  );
};

export default BasicThreeJsPage;
