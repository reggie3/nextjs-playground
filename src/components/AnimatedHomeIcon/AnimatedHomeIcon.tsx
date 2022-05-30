import { Box, useTheme } from "@mui/material";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const HomeOutlinedIcon = dynamic(
  () => import("@mui/icons-material/HomeOutlined")
);
const HomeIcon = dynamic(() => import("@mui/icons-material/Home"));

const ICON_SIZE = "1.75rem";

const AnimatedHomeIcon = () => {
  const router = useRouter();
  const isHome = router.asPath === "/";
  const theme = useTheme();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <Box
      data-testid="animated-home-icon"
      sx={{
        position: "absolute",
        top: theme.spacing(0.75),
        left: theme.spacing(1),
      }}
    >
      <Box
        sx={{
          position: "absolute",
        }}
      >
        <HomeOutlinedIcon
          style={{ fontSize: ICON_SIZE }}
          color={isHome ? "secondary" : "primary"}
        />
      </Box>
      <motion.div
        style={{
          position: "absolute",
          overflow: "hidden",
        }}
        animate={{ width: isHome ? ICON_SIZE : "0rem" }}
      >
        {isReady && (
          <HomeIcon
            style={{ fontSize: ICON_SIZE, color: theme.palette.secondary.dark }}
          />
        )}
      </motion.div>
    </Box>
  );
};

export default AnimatedHomeIcon;
