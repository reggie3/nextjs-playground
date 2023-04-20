import { Typography, styled } from "@mui/material";

export interface InformationBoxProps {
  children: JSX.Element;
}
const InformationBox = ({ children }: InformationBoxProps) => {
  return (
    <StyledInformationBox data-testid="information-box">
      {children}
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
  gap: theme.spacing(0.5),

  backgroundColor: "rgba(255,255,255,.15)",
  margin: theme.spacing(1),
  borderRadius: theme.spacing(1),
}));
