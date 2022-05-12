import { Box, AppBar, Toolbar } from "@mui/material";
import Link from "next/link";
import React, { ReactElement } from "react";

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
                <a>Home</a>
              </Link>
              {/* <Link href="/fibonacci">
                <a>Fibonacci</a>
              </Link>
              <Link href="/hello-wasm">
                <a>Hello WASM</a>
              </Link> */}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
