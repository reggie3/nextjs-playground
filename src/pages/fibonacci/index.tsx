import Box from "@mui/material/Box";
import Link from "next/link";
import JSFib from "../../components/JSFib";
import RustFib from "../../components/RustFib";
// import helloWasmCrateInit, { greet as helloWasmCrateGreet } from "hello-wasm";

export default function Index() {
  // helloWasmCrateInit().then(() => {
  //   console.log("init hello wasm");
  //   helloWasmCrateGreet();
  // });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
      }}
    >
      <JSFib />
      <RustFib />
    </Box>
  );
}
