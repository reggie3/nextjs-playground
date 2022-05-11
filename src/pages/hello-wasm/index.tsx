import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import helloWasmCrateInit, { greet as helloWasmCrateGreet } from "hello-wasm";

async function init() {
  const wasm = await import("hello-wasm");

  // console.log("wasm", wasm);
  return {
    wasmInit: wasm.default,
    wasmGreet: wasm.greet,
  };
}

const HelloWasm = () => {
  // helloWasmCrateInit().then(() => {
  //   console.log("init hello wasm");
  //   helloWasmCrateGreet();
  // });
  useEffect(() => {
    init().then(({ wasmInit, wasmGreet }) => {
      console.log(wasmGreet);
      wasmGreet();
    });
  }, []);

  return <Typography>Check the console</Typography>;
};

export default HelloWasm;

/**
 *
  return {
    helloWasmCrateInit: wasm.default,
    helloWasmCrateGreet: wasm.greet,
  };
 */
