import { Box, useTheme, IconButton } from "@mui/material";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { NavbarExpandedMenu } from "./components/NavbarExpandedMenu";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";

const AnimatedHomeIcon = dynamic(
  () => import("../AnimatedHomeIcon").then((mod) => mod.AnimatedHomeIcon),
  {
    ssr: false,
  }
);

const MoreIcon = ({ isOpen }: { isOpen: boolean }) => {
  const theme = useTheme();
  return (
    <motion.div
      animate={{
        rotate: isOpen ? 1620 : 0,
        color: isOpen
          ? theme.palette.secondary.dark
          : theme.palette.primary.main,
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KeyboardDoubleArrowDownIcon />
    </motion.div>
  );
};

function NavBar(): ReactElement {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box
      sx={{
        zIndex: 100,
        position: "fixed",
      }}
      data-testid="nav-bar"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: theme.spacing(0.5),
          alignItems: "center",
          px: 1,
          py: 0,
          backgroundColor: "rgba(255,255,255,.15)",
          margin: 1,
          borderRadius: 2,
          width: "10rem",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Link href="/" data-testid="home-link">
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
            <AnimatedHomeIcon />
          </Box>
        </Link>
        <IconButton
          aria-label={isOpen ? "close more menu" : "close more menu"}
          color="primary"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <MoreIcon isOpen={isOpen} />
        </IconButton>
        {/* <Link href="/fibonacci">
                <a>Fibonacci</a>
              </Link>
              <Link href="/hello-wasm">
                <a>Hello WASM</a>
              </Link> */}
      </Box>
      <NavbarExpandedMenu isVisible={isOpen} />
    </Box>
  );
}

export default NavBar;
