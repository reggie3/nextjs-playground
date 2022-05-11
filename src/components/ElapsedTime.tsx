import { Box, Fade, Typography } from "@mui/material";
import React, { ReactElement } from "react";

interface Props {
  timeEndMillis: number | undefined;
  timeStartMillis: number | undefined;
}

function ElapsedTime({
  timeEndMillis,
  timeStartMillis,
}: Props): ReactElement | null {
  return (
    <Box>
      <Fade in={!!timeStartMillis && !!timeEndMillis}>
        <Typography variant="body1" py={2}>
          ElapsedTime: {(timeEndMillis ?? 0) - (timeStartMillis ?? 0)} ms
        </Typography>
      </Fade>
    </Box>
  );
}

export default ElapsedTime;
