import { Box } from "@mui/material";
import NavBar from "./NavBar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <main style={{ display: "flex", flex: 1 }}>{children}</main>
      </Box>
    </Box>
  );
}
