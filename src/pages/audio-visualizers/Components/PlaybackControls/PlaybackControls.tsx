import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";

export type PlaybackStatus = "playing" | "paused" | "stopped";
export type PlaybackControlsEvent = "play" | "pause" | "stop";

type PlaybackControlsProps = {
  isAudioPlayable: boolean;
  playbackStatus: PlaybackStatus;
  onClickControls: (event: PlaybackControlsEvent) => void;
};

const PlaybackControlsContents = ({
  playbackStatus,
  onClickControls,
}: Omit<PlaybackControlsProps, "isAudioPlayable">) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <IconButton
        aria-label="pause"
        onClick={() => onClickControls("pause")}
        disabled={playbackStatus !== "playing"}
        color="primary"
      >
        <PauseCircleIcon />
      </IconButton>
      <IconButton
        aria-label="stop"
        onClick={() => onClickControls("stop")}
        disabled={playbackStatus !== "playing"}
        color="primary"
      >
        <StopCircleIcon />
      </IconButton>
      <IconButton
        aria-label="play"
        onClick={() => onClickControls("play")}
        disabled={playbackStatus === "playing"}
        color="primary"
      >
        <PlayCircleIcon />
      </IconButton>
    </Box>
  );
};

const PlaybackControls = (props: PlaybackControlsProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {!props.isAudioPlayable ? (
        <Typography>No file loaded</Typography>
      ) : (
        <PlaybackControlsContents {...props} />
      )}
    </Box>
  );
};

export default PlaybackControls;
