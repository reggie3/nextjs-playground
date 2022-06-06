import React from "react";
import { Provider } from "react-redux";
import { MissileCommand } from "../../components/MissileCommand";
import { missileCommandStore } from "../../components/MissileCommand/redux/store";

const MissileCommandHome = () => {
  return (
    <Provider store={missileCommandStore}>
      <MissileCommand />
    </Provider>
  );
};

export default MissileCommandHome;
