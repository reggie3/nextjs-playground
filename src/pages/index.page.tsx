import Head from "next/head";
import { ReactElement } from "react";
import { Box } from "@mui/material";
import { HomePageVisualization } from "../components/HomePageVisualization";

// async function init() {
//   const rustModule = await import("../wasm/add.wasm");

//   console.log("rustModule", rustModule);
//   const value = rustModule.add_one(14);

//   console.log("value", value);
// }

// const RustComponent = dynamic({
//   loader: async () => {
//     // Import the wasm module
//     const rustModule = await import("../add.wasm");

//     console.log(rustModule);
//     // Return a React component that calls the add_one method on the wasm module
//     return (props) => <div>{rustModule.add_one(props.number)}</div>;
//   },
// });

function Home() {
  //init();
  return (
    <>
      <Head>
        <title>{`Reggie's Next.js Playground`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <HomePageVisualization />
      </Box>
    </>
  );
}

export default Home;

Home.getLayout = (page: ReactElement) => page;
