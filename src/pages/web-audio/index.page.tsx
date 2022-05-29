import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";

type Props = {};

function WebAudio({}: Props) {
  const audioContext = useRef<AudioContext>();

  useEffect(() => {
    // @ts-ignore Property 'webkitAudioContext' does not exist on type 'Window & typeof globalThis'.ts(2339)
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    audioContext.current = new AudioContext();
  }, []);

  const playSound = (oscillatorType: OscillatorType) => {
    if (audioContext.current) {
      const oscillator = audioContext.current.createOscillator();
      oscillator.type = oscillatorType;
      oscillator.connect(audioContext.current.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 1000);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" paddingY={1}>
        WebAudio Demos
      </Typography>
      <Box gap={1} display="flex" flexDirection="row" alignItems="center">
        <Typography>Oscillator Types</Typography>
        <Button onClick={() => playSound("sine")} variant="contained">
          Play Sine
        </Button>
        <Button onClick={() => playSound("square")} variant="contained">
          Play Square
        </Button>
        <Button onClick={() => playSound("sawtooth")} variant="contained">
          Play Sawtooth
        </Button>
        <Button onClick={() => playSound("triangle")} variant="contained">
          Play Triangle
        </Button>
      </Box>
    </Container>
  );
}

export default WebAudio;
