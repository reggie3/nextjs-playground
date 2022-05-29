import React from "react";
import { Provider } from "react-redux";
import { Particles } from "../../components/ExplosionsDemo";
import { explosionsStore } from "../../components/ExplosionsDemo/redux/store";

const ParticlesHome = () => {
  return (
    <Provider store={explosionsStore}>
      <Particles />
    </Provider>
  );
};

export default ParticlesHome;
