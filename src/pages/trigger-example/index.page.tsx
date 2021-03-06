import React from "react";
import { TriggerExample } from "../../components/TriggerExample";

type Props = {};

const TriggerExamplePage = (props: Props) => {
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
      <TriggerExample />
    </div>
  );
};

export default TriggerExamplePage;
