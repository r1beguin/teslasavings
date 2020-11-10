import React from "react";

import {Box, Button} from "grommet";
import {Github, Twitter} from "grommet-icons";

const Social = () => {

    return( 
        <Box direction="row" justify="center" align="center" gap="small">
            <Button icon={<Github />} target="_blank" onClick={() => window.open('https://github.com/r1beguin/teslasavings')} />       
            <Button icon={<Twitter />} target="_blank" onClick={() => window.open('https://twitter.com/ErwanBeguin')} />       
        </Box>
    )
}


export default Social;