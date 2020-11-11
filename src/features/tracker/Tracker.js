import React from "react";

import {Box, Text, ResponsiveContext, Image} from "grommet";
import {LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";

import tesla from "../../images/tesla.png";

import Savings from "./Savings";

const Tracker = () => {
    
    const [data, setData] = React.useState();
    const [current, setCurrent] = React.useState();

    const API = 'DLTD6FNXRXZ8DWS3';
    const [timeSelected, setTimeSelected] = React.useState('D');
    const [time, setTime] = React.useState('DAILY');
    const [timeLabel, setTimeLabel] = React.useState('Time Series (Daily)');

    const size = React.useContext(ResponsiveContext);

    React.useEffect(() => {

        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${time}&symbol=TSLA&apikey=${API}`)
      .then(response => response.json())
      .then(data => {

        let dataRaw = []; 
        setCurrent(data[timeLabel][data["Meta Data"]["3. Last Refreshed"]]['4. close'])
        for (let key in data[timeLabel]) {
            dataRaw.push({name : key,value : data[timeLabel][key]['4. close']})
        }

        setData(dataRaw.reverse());
      });

      

    },[time, timeLabel])


    return( 
        <Box align="center"  gap="small" margin="large">

            <Box height="xxsmall" width="xxsmall">
                <Image src={tesla} fit="cover"/>
            </Box>
            
            <Box>
                <Text color="brand">{current && current.match(/^\d+\.\d{2}/g,'')}</Text>
            </Box>

            <Box>
                <LineChart width={size!=="small" ? 600 : 400} height={size!=="small" ? 400 : 300} data={data}
                margin={{top: 5, right: 30, left: 20}}>
                    <XAxis dataKey="name" hide interval="preserveStartEnd" tick={false} />
                    <YAxis tick={false} hide domain={[0, 3000]}/>
                    
                    <Tooltip contentStyle={{color: "#cc0000"}}/>
                    
                    <Line type="monotone" dataKey="value" stroke="#cc0000" dot={false}/>
                </LineChart>
            </Box>

            <Box direction="row" justify="center" align="center" gap="medium">
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime('MONTHLY');
                        setTimeLabel('Monthly Time Series');
                        setTimeSelected('M');
                    }}>
                    <Text color={timeSelected==='M' ? "ok" : "brand"}>M</Text>
                </Box>
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime('WEEKLY');
                        setTimeLabel('Weekly Time Series');
                        setTimeSelected('W')
                    }}>
                    <Text color={timeSelected==='W' ? "ok" : "brand"}>W</Text>
                </Box>
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime('DAILY');
                        setTimeLabel('Time Series (Daily)');
                        setTimeSelected('D')
                    }}>
                    <Text color={timeSelected==='D' ? "ok" : "brand"}>D</Text>
                </Box>
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime('INTRADAY&interval=60min');
                        setTimeLabel('Time Series (60min)');
                        setTimeSelected("H");
                    }}>
                    <Text color={timeSelected==='H' ? "ok" : "brand"}>H</Text>
                </Box>
            </Box>

            <Savings tsla={current}/>

        </Box>
    )
}


export default Tracker;