import React from "react";

import {Box, Button, Text, TextInput ,Meter, Stack, ResponsiveContext, Collapsible, Tabs, Tab} from "grommet";
import {AddCircle, Trash, CaretDown, CaretUp} from "grommet-icons";

const useStateWithLocalStorage = localStorageKey => {
    const [stock, setStock] = React.useState(
      JSON.parse(localStorage.getItem(localStorageKey)) || [{
        number : null,
        price: null
    }]
    );
   
    React.useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(stock));
    }, [stock]);
   
    return [stock, setStock];
  };
const useStateWithLocalStorageInt = localStorageKey => {
    const [value, setValue] = React.useState(
      JSON.parse(localStorage.getItem(localStorageKey)) || '')
   
    React.useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);
   
    return [value, setValue];
  };

const Savings = ({tsla, setSituation}) => {

    const [stock, setStock] = useStateWithLocalStorage('stock');
    const [goal, setGoal] = useStateWithLocalStorageInt('goal');
    const [current, setCurrent] =useStateWithLocalStorageInt('current');
    const [showSettings, setShowSettings]= useStateWithLocalStorageInt('settings');

    const size = React.useContext(ResponsiveContext);

    const onCalcul = () => {
        let result=0;
        
        if (stock[0].number){
        stock.map(item => {
            if( item.number && item.price) {
                result+=item.number*tsla
            }  
        })

        setCurrent(result);
        setSituation(result)
        }else {
            setCurrent('');
        setSituation('')
        }
    }

    React.useEffect(()=> {
        setSituation(current);
        onCalcul();
    }, [tsla])

    return (
        <Box margin="small" align="center" justify="center" gap="small">

            <Button icon={!showSettings ? <CaretDown color="brand" /> : <CaretUp color="brand" />} onClick={() => setShowSettings(!showSettings)}/>
            <Collapsible open={showSettings}>
                <Box align="center" justify="center">
                    <Text>Your Portfolio</Text> 

                    <Tabs>     
                        <Tab title="simple">
                            <Box margin="small" align="center" justify="center">
                                <Text>Number of stocks</Text>
                                <Box  margin="small" border={{color: "brand"}} round="xsmall" width={size !== "xsmall" ? "xsmall" : "xxsmall"} >
                                    
                                    <TextInput 
                                        fill
                                        plain
                                        type="number" 
                                        placeholder="Number of stocks"
                                        value={stock[0].number && stock[0].number}
                                        onChange={e => {
                                            const arr = [];
                                            arr.push({number: e.target.value, price : tsla})
                                            setStock(arr);
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Tab>      
                        <Tab title="detailed">
                            <Box margin="small" justify="center" align="center" gap="small">
                                {stock.map((item,i) => {
                                    
                                
                                return(
                                    <Box direction="row"  align="center" gap="small" >
                                        <Box border={{color: "brand"}} round="xsmall" width={size !== "small" ? "small" : "xsmall"} >
                                            <TextInput 
                                                fill
                                                plain
                                                type="number" 
                                                placeholder="Number of stocks"
                                                value={item.number && item.number}
                                                onChange={e => {
                                                    const arr = [...stock];
                                                    console.log(arr);
                                                    arr[i].number=e.target.value;
                                                    setStock(arr);
                                                }}
                                            />
                                        </Box> 
                                        <Text>at</Text>
                                        <Box border={{color: "brand"}} round="xsmall" width={size !== "small" ? "small" : "xsmall"} >
                                            <TextInput 
                                                fill
                                                plain
                                                type="number" 
                                                placeholder="price"
                                                value={item.price && item.price}
                                                onChange={e => {
                                                    const arr = [...stock];
                                                    arr[i].price=e.target.value;
                                                    setStock(arr);
                                                }}
                                            />
                                        </Box>
                                        {i !== 0 ? (
                                            <Button icon={<Trash color="brand" />} onClick={()=> {
                                                const arr = [];
                                                stock.map((item2,i2) => {i2!==i && arr.push(item2)} )
                                                setStock(arr);
                                            }} /> 
                                        ): (
                                            <Button icon={<Trash color="brand"/>} disabled/> 
                                        )}
                                    </Box>
                                )})} 
                                <Button icon={<AddCircle />} onClick={()=> {
                                    const arr = [...stock];
                                    arr.push({number: null, price: null})
                                    setStock(arr);
                                }} />
                            </Box>
                        </Tab>

                        
                    </Tabs>
                    
                    <Text>Your Goal</Text> 
                    <Box border={{color: "brand"}} round="xsmall" width="small" align="center" justify="center">    
                        <TextInput 
                            plain
                            type="number" 
                            placeholder="Amount"
                            value={goal}
                            onChange={e =>setGoal(e.target.value)}
                        />
                    </Box>

                
                    
                    <Button margin="small" label="Calcul" color="brand" primary onClick={()=> onCalcul()}/>
                    <Button icon={<Trash color="brand"/>} onClick={()=> {
                        setStock([{number: '', price: ''}]);
                        setCurrent('');
                        setGoal('');
                    }} /> 
                </Box>    
                
            </Collapsible>
            {current && goal && (
                
                <Box justify="center" align="center" margin="small" gap="small">
                     <Text>Your Situation</Text> 
                    <Stack anchor="center">
                        <Meter size="small" values={[{value : (current/goal)*100}]} type="circle" />
                        <Box>
                        <Text>{current && current.toString().match(/^\d+.\d{2}/g,'')} $</Text>
                        <Text>{((current/goal)*100).toString().match(/^\d+.\d{2}/g,'')} %</Text>
                        </Box>
                    </Stack>
                </Box>
            )}

           

           
           
        </Box>
    )
}

export default Savings;