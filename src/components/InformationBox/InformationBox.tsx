import { SxProps, Typography, styled } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import IconButton from "@mui/material/IconButton";
import { MouseEventHandler, useEffect, useState } from "react";
import { useAtom } from "jotai";
import InformationButton, {
  shouldShowButtonAtom,
} from "../InformationButton/InformationButton";
import CloseIcon from "@mui/icons-material/Close";

export interface InformationBoxProps {
  children: JSX.Element | JSX.Element[];
  style?: SxProps;
}
const InformationBox = ({ children, style = {} }: InformationBoxProps) => {
  const [shouldShowButton, setShouldShowButton] = useAtom(shouldShowButtonAtom);

  const onClickClose = () => {
    setShouldShowButton(true);
  };

  if (shouldShowButton) return <InformationButton />;

  return (
    <StyledInformationBox data-testid="information-box" sx={style}>
      {children}
      <StyledCloseButton onClick={onClickClose}>
        <CloseIcon fontSize="small" />
      </StyledCloseButton>
    </StyledInformationBox>
  );
};

export default InformationBox;

const StyledInformationBox = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 10,
  bottom: 10,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(5),
  gap: theme.spacing(0.5),
  backgroundColor: "rgba(255,255,255,.15)",
  margin: theme.spacing(1),
  borderRadius: theme.spacing(1),
}));

const BUTTON_SIZE = 24;
const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  left: theme.spacing(1),
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  padding: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "rgba(0,0,0)",
  border: "1px white solid",
}));
