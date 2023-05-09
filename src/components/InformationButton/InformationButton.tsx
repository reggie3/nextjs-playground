import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { atom, useAtom } from "jotai";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

export const shouldShowButtonAtom = atom(false);

export interface InformationButtonProps {}

const InformationButton = (props: InformationButtonProps) => {
  const [shouldShowButton, setShouldShowButton] = useAtom(shouldShowButtonAtom);

  const onClick = () => {
    setShouldShowButton(false);
  };

  if (!shouldShowButton) return null;

  return (
    <StyledInfoButton onClick={onClick} data-testid="information-button">
      <TipsAndUpdatesIcon fontSize="small" />
    </StyledInfoButton>
  );
};
export default InformationButton;

const StyledInfoButton = styled(IconButton)({
  position: "absolute",
  bottom: 10,
  left: 10,
  width: 48,
  height: 48,
  padding: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "rgba(0,0,0)",
  border: "2px white solid",
});
