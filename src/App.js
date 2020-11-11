import React from "react";
import { Grommet, Box,  } from "grommet";

import Tracker from './features/tracker/Tracker'
import Social from './features/social/Social'


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
  return (
    <Grommet theme={theme} full  background="dark-2">
      <Box  align="center" justify="center" overflow="auto">
        <Tracker />
        <Social />
      </Box>
  
    </Grommet>
  );
}

export default App;
