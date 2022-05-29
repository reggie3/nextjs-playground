import { createTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#b0f89e",
    },
  },
});

export default theme;
