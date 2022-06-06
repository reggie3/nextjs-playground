import React from "react";
import { Provider } from "react-redux";
import { Explosions } from "../../components/ExplosionsDemo";
import { explosionsStore } from "../../components/ExplosionsDemo/redux/store";

const ExplosionsHome = () => {
  return (
    <Provider store={explosionsStore}>
      <Explosions />
    </Provider>
  );
};

export default ExplosionsHome;
