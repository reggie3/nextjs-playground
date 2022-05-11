import { Box, Button, Fade, TextField, Typography } from "@mui/material";
import React, { ReactElement, useRef, useState } from "react";
import ElapsedTime from "./ElapsedTime";

function JSFib(): ReactElement {
  const [fibSequence, setFibSequence] = useState<string[]>([]);
  const [timeEndMillis, setTimeEndMillis] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>();

  const getFibonacciSequence = (
    num: number
  ): Promise<{ fibs: string[]; endMillis: number }> => {
    return new Promise((resolve) => {
      const fibs: string[] = [];
      let a = BigInt(1),
        b = BigInt(0),
        temp;

      while (num >= 0) {
        temp = BigInt(a);
        a = BigInt(a) + BigInt(b);
        b = BigInt(temp);
        num--;
        fibs.push(b + ", ");
      }
      resolve({ fibs, endMillis: new Date().getTime() });
    });
  };

  const onClickGo = async () => {
    if (inputRef.current) {
      console.time("fibonacci");
      startTimeRef.current = new Date().getTime();
      const { fibs, endMillis } = await getFibonacciSequence(
        inputRef.current.valueAsNumber
      );
      console.timeEnd("fibonacci");
      setFibSequence(fibs);
      setTimeEndMillis(endMillis);
    }
  };

  return (
    <Box
      sx={{
        border: "1px dashed green",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Typography variant="h4" pb={1}>
        JS Fibonacci
      </Typography>

      <ElapsedTime
        timeStartMillis={startTimeRef.current}
        timeEndMillis={timeEndMillis}
      />

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="number"
          inputRef={inputRef}
          defaultValue={75000}
        />
        <Button variant="contained" color="primary" onClick={onClickGo}>
          Go!
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "scroll",
          margin: 2,
          background: "aliceblue",
          padding: 2,
          width: "100%",
          wordBreak: "break-all",
        }}
      >
        <Typography variant="caption">
          {fibSequence[fibSequence.length - 1]}
        </Typography>
      </Box>
    </Box>
  );
}

export default JSFib;
