import React from "react";
import { Grommet, Box, Image, Button, Stack } from "grommet";

import Tracker from './features/tracker/Tracker'
import Social from './features/social/Social'
import {Expand} from "grommet-icons";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import tesla from "./images/tesla.png";

const theme = {
  global: {
    
    colors: {
      brand: '#cc0000',
      ok: '#00C781',
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    }
  },
};

function App() {
  const handle = useFullScreenHandle();
  return (
    <Grommet theme={theme} full  background="dark-2">
      <FullScreen handle={handle}>
        <Box fill="horizontal" align="center" justify="center" overflow="auto">

          
        
          <Box fill="horizontal" margin="medium" >
            <Stack anchor="right">
              <Box fill="horizontal" align="center" justify="center">
                <Box height="xxsmall" width="xxsmall">
                  <Image src={tesla} fit="cover"/>
                </Box>
              </Box>
              <Button icon={<Expand color="brand" onClick={handle.enter}/>} />
            </Stack>
          </Box>
              
          <Tracker />
          <Social />
        
        </Box>
      </FullScreen>
    </Grommet>
  );
}

export default App;
