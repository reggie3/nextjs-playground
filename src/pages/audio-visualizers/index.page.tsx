import { Box, TextField } from "@mui/material";
import useResizeObserver from "use-resize-observer";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import Canvas from "../../components/audioVisualizers/Canvas/Canvas";
import {
  PlaybackControlsEvent,
  PlaybackControls,
  PlaybackStatus,
} from "../../components/audioVisualizers/PlaybackControls";

type Props = {};

const AudioVisualizers = (props: Props) => {
  const [audioFile, setAudioFile] = useState<File>();
  const [isAudioPlayable, setIsAudioPlayable] = useState<boolean>(false);
  const audioContext = useRef<AudioContext>();
  const playableSound = useRef<AudioBufferSourceNode>();
  const audioAnalyzer = useRef<AnalyserNode>();
  const [audio, setAudio] = useState<AudioBuffer>();
  const [playbackStatus, setPlaybackStatus] =
    useState<PlaybackStatus>("stopped");
  const {
    ref: containerRef,
    width = 100,
    height = 100,
  } = useResizeObserver<HTMLDivElement>();
  const [bufferLength, setBufferLength] = useState<number>();
  const [dataArray, setDataArray] = useState<Uint8Array>();

  useEffect(() => {
    // @ts-ignore Property 'webkitAudioContext' does not exist on type 'Window & typeof globalThis'.ts(2339)
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    audioContext.current = new AudioContext();
  }, []);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    !!event.target.files?.length && setAudioFile(event.target.files[0]);
  };

  useEffect(() => {
    const loadFile = async () => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(audioFile!);
      fileReader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const decodedAudio = await audioContext.current!.decodeAudioData(
          arrayBuffer
        );
        setAudio(decodedAudio);
        setIsAudioPlayable(true);
      };
    };
    if (audioContext.current && audioFile) {
      loadFile();
    }
  }, [audioFile]);

  const playAudio = () => {
    if (audioContext.current && audio) {
      playableSound.current = audioContext.current.createBufferSource();
      playableSound.current.buffer = audio;
      audioAnalyzer.current = audioContext.current.createAnalyser();
      playableSound.current.connect(audioAnalyzer.current);
      playableSound.current.connect(audioContext.current.destination);
      audioAnalyzer.current.fftSize = 512;

      // always half the fft size
      setBufferLength(audioAnalyzer.current.frequencyBinCount);
      setDataArray(new Uint8Array(audioAnalyzer.current.frequencyBinCount));

      playableSound.current!.start();
      setPlaybackStatus("playing");
    }
  };

  const onClickControls = (event: PlaybackControlsEvent) => {
    switch (event) {
      case "pause":
        playableSound.current!.stop();
        setPlaybackStatus("paused");
        break;
      case "play":
        playAudio();
        break;
      case "stop":
        playableSound.current!.stop();
        setPlaybackStatus("stopped");
        break;
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
      }}
      ref={containerRef}
    >
      <Box sx={{ position: "relative", flex: 1 }}>
        <Canvas
          analyser={audioAnalyzer.current}
          bufferLength={bufferLength}
          dataArray={dataArray}
          height={height}
          playbackStatus={playbackStatus}
          width={width}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "rgb(255, 255, 255, .25)",

          display: "flex",
          bottom: 0,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          padding: 0.5,
        }}
      >
        <TextField
          id="filled-basic"
          variant="outlined"
          type="file"
          inputProps={{
            sx: { color: "white" },
            accept: "audio/*",
          }}
          onChange={onFileChange}
        />
        <PlaybackControls
          isAudioPlayable={isAudioPlayable}
          playbackStatus={playbackStatus}
          onClickControls={onClickControls}
        />
      </Box>
    </Box>
  );
};

export default AudioVisualizers;
