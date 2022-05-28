import { Box, AppBar, Toolbar, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React, { ReactElement } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { CustomLink } from "../CustomLink";

function NavBar(): ReactElement {
  const theme = useTheme();
  return (
    <div style={{ zIndex: 100 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <Link href="/">
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    cursor: "pointer",
                    color: theme.palette.text.primary,
                    textDecoration: "underline",
                  }}
                >
                  <HomeOutlinedIcon style={{ fontSize: "1.75rem" }} />
                  <a>
                    <Typography style={{ fontSize: "1.25rem" }}>
                      Home
                    </Typography>
                  </a>
                </Box>
              </Link>
              {/* <Link href="/fibonacci">
                <a>Fibonacci</a>
              </Link>
              <Link href="/hello-wasm">
                <a>Hello WASM</a>
              </Link> */}
              <CustomLink href="/audio-visualizers">Audio Viz</CustomLink>
              <CustomLink href="/web-audio">Web Audio</CustomLink>
              <CustomLink href="/globe">3D Globe</CustomLink>
              <CustomLink href="/chasing-blobs">Chasing Blobs</CustomLink>
              {/* <CustomLink href="/trigger-example">Trigger Example</CustomLink> */}
              {/* <CustomLink href="/space-invaders">Space Shooter</CustomLink> */}
              <CustomLink href="/missile-command">Missile Command</CustomLink>
              <CustomLink href="/particles">Explosions</CustomLink>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
