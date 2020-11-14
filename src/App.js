import React from "react";
import { Grommet, Box, Image, Button, Stack, ResponsiveContext } from "grommet";

import Tracker from './features/tracker/Tracker'
import Social from './features/social/Social'
import {Expand, Contract} from "grommet-icons";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import tesla from "./images/tesla.png";
import Savings from "./features/tracker/Savings";

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
  const [full, setFull] = React.useState(false);
  const [tsla, setTsla] = React.useState();
  const [situation, setSituation] = React.useState('');

  const size = React.useContext(ResponsiveContext);

  return (
    <Grommet theme={theme} full  background="dark-2">
      
        <Box fill="horizontal" align="center" justify="center" overflow="auto">
        {!full && (
               <Box fill="horizontal" margin="medium" >
               <Stack anchor="right">
                 <Box fill="horizontal" align="center" justify="center">
                   <Box height="xxsmall" width="xxsmall">
                     <Image src={tesla} fit="cover"/>
                   </Box>
                 </Box>
                 {!full && (
                 <Button icon={<Expand color="brand" onClick={() => {
                   handle.enter();
                   setFull(true);
                 }}/>} />
                 )}
               </Stack>
             </Box>
        )}

          
        <FullScreen handle={handle}>
        <Box fill align="center" justify="center" overflow="auto">
        {full && (
          <Box fill="horizontal" margin="medium" >
            <Stack anchor="right">
              <Box fill="horizontal" align="center" justify="center">
                <Box height="xxsmall" width="xxsmall">
                  <Image src={tesla} fit="cover"/>
                </Box>
              </Box>
              
            </Stack>
          </Box>
          )}
          
            <Tracker setTsla={setTsla} situation={situation} />
            </Box>
          </FullScreen>
          <Savings tsla={tsla} setSituation={setSituation} />
          <Social />
        
        </Box>
      
    </Grommet>
  );
}

export default App;
