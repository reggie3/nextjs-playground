import { Box, useTheme } from "@mui/material";
import { CustomLink } from "../../../CustomLink";
import { motion, AnimatePresence, Variants } from "framer-motion";

const links = [
  {
    href: "/audio-visualizers",
    label: "Audio Viz",
  },
  {
    href: "/web-audio",
    label: "Web Audio",
  },
  {
    href: "/globe",
    label: "3D Globe",
  },
  {
    href: "/chasing-blobs",
    label: "Chasing Blobs",
  },
  {
    href: "/trigger-example",
    label: "Trigger Example",
    isDisabled: true,
  },
  {
    href: "/space-invaders",
    label: "Space Shooter",
    isDisabled: true,
  },
  { href: "/missile-command", label: "Missile Command" },
];

const containerVariants: Variants = {
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.125,
    },
  },
  exit: { y: -200, opacity: 0 },
};

const childVariants: Variants = {
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -20,
    opacity: 0,
  },
};

export interface NavbarExpandedMenuProps {
  isVisible: boolean;
}
const NavbarExpandedMenu = ({ isVisible }: NavbarExpandedMenuProps) => {
  const theme = useTheme();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-testid="navbar-expanded-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(1),
            gap: theme.spacing(0.5),

            backgroundColor: "rgba(255,255,255,.15)",
            margin: theme.spacing(1),
            borderRadius: theme.spacing(1),
          }}
          variants={containerVariants}
          initial="exit"
          animate="enter"
          exit="exit"
        >
          {links.map(({ href, label, isDisabled }, index) => {
            if (isDisabled) return null;
            return (
              <motion.div key={href} variants={childVariants}>
                <CustomLink href={href} key={index} color="secondary">
                  {label}
                </CustomLink>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default NavbarExpandedMenu;
