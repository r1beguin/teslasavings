import React from "react";

import {Box, Text, ResponsiveContext, Image} from "grommet";
import {LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";


import secret from "../../secret.json";

import Savings from "./Savings";

const Tracker = ({setTsla, situation}) => {
    const hour='interval=5min&range=1d'
    const day= 'interval=15min&range=5d';
    const week='interval=60min&range=1mo';
    const month= 'interval=1d&range=1y';
    const max='interval=1d&range=max';
    
    const [data, setData] = React.useState();
    const [current, setCurrent] = React.useState();

    
    const [timeSelected, setTimeSelected] = React.useState('M');
    const [time, setTime] = React.useState(month);

    const size = React.useContext(ResponsiveContext);

    


    React.useEffect(() => {
        fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?${time}&symbol=TSLA&region=US`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": secret,
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
                }
            })
            .then(response => response.json())
            .then(data => { 
                const arr = [];
                data.chart.result[0].indicators.quote[0].close.map((item,i) => {
                    let unix_timestamp = data.chart.result[0].timestamp[i]
                    var date = new Date(unix_timestamp * 1000);
                    var formattedTime = date.toLocaleString('en-GB', { timeZone: 'UTC' });
                    arr.push({x: formattedTime, close: item})
    
            })
                setData(arr)
            })

            fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=TSLA&region=US", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "396c8c801cmsh03d8aa703d5356cp10f6bfjsneeb135511ccb",
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
        .then(response => 
            response.json()
            
        )
        .then(data => {setCurrent(data.quoteResponse.result[0].ask);
        setTsla(data.quoteResponse.result[0].ask)})
    
        try {
        setInterval( async() => {
            
            
    
          fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=TSLA&region=US", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "396c8c801cmsh03d8aa703d5356cp10f6bfjsneeb135511ccb",
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
        .then(response => 
            response.json()
            
        )
        .then(data => {setCurrent(data.quoteResponse.result[0].ask);
        setTsla(data.quoteResponse.result[0].ask)})
        }, 30000);
        } catch (e){
            console.log(e)
        }

       

    },[time])


    return( 
        <Box fill="horizontal" align="center"  gap="small">

         
            <Box align="center">
                <Text color="brand">{current}</Text>
                {situation && (
                    <Text color="brand">{situation.toString()}$</Text>
                )}
                
            </Box>

            <Box>
                <LineChart width={size!=="small" ? 600 : 400} height={size!=="small" ? 400 : 300} data={data}
                margin={{top: 5, right: 30, left: 20}}>
                    <XAxis dataKey="x" hide interval="preserveStartEnd" tick={false} />
                    <YAxis tick={false} hide />
                    
                    <Tooltip contentStyle={{color: "#cc0000"}}/>
                    
                    <Line dataKey="close" type="monotone"  stroke="#cc0000" dot={false}/>
                </LineChart>
            </Box>

            <Box direction="row" justify="center" align="center" gap="medium">
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime(max);
                        setTimeSelected('A');
                    }}>
                    <Text color={timeSelected==='A' ? "ok" : "brand"}>A</Text>
                </Box>
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime(month);
                        setTimeSelected('M');
                    }}>
                    <Text color={timeSelected==='M' ? "ok" : "brand"}>M</Text>
                </Box>
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime(week);
                        setTimeSelected('W')
                    }}>
                    <Text color={timeSelected==='W' ? "ok" : "brand"}>W</Text>
                </Box>
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime(day);
                        setTimeSelected('D')
                    }}>
                    <Text color={timeSelected==='D' ? "ok" : "brand"}>D</Text>
                </Box>
                <Box 
                    as="a" 
                    onClick={() => { 
                        setTime(hour);
                        setTimeSelected("H");
                    }}>
                    <Text color={timeSelected==='H' ? "ok" : "brand"}>H</Text>
                </Box>
            </Box>

           

        </Box>
    )
}


export default Tracker;