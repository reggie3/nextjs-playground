import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React, { ReactElement } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { CustomLink } from "../CustomLink";

function NavBar(): ReactElement {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
              }}
            >
              <Link href="/">
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <HomeOutlinedIcon />
                  <a>
                    <Typography>Home</Typography>
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
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
