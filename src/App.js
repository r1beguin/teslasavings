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
    <Grommet theme={theme} full>
      <Box fill align="center" justify="center" background="dark-2">
        <Tracker />
        <Social />
      </Box>
  
    </Grommet>
  );
}

export default App;
