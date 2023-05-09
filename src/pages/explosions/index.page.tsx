import React from "react";
import { Provider } from "react-redux";
import { Explosions } from "../../components/ExplosionsDemo";
import { explosionsStore } from "../../components/ExplosionsDemo/redux/store";
import { Typography } from "@mui/material";
import { CustomLink } from "../../components/CustomLink";
import { InformationBox } from "../../components/InformationBox";

const ExplosionsHome = () => {
  return (
    <Provider store={explosionsStore}>
      <Explosions />
      <InformationBox>
        <Typography>Three JS Particle System Demo</Typography>
        <Typography variant="body2">
          Click on the screen to create a particle explosion made up of Three JS
          planes created using the&nbsp;
          <CustomLink href="https://github.com/pmndrs/drei" color="secondary">
            react-three/drei
          </CustomLink>
          &nbsp; library.
        </Typography>
      </InformationBox>
    </Provider>
  );
};

export default ExplosionsHome;
