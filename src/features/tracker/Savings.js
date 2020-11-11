import React from "react";

import {Box, Button, Text, TextInput ,Meter, Stack, ResponsiveContext} from "grommet";
import {AddCircle, Trash} from "grommet-icons";

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

const Savings = ({tsla}) => {

    const [stock, setStock] = useStateWithLocalStorage('stock');
    const [goal, setGoal] = useStateWithLocalStorageInt('goal');
    const [current, setCurrent] =useStateWithLocalStorageInt('current');

    const size = React.useContext(ResponsiveContext);

    const onCalcul = () => {
        let result=0;

        stock.map(item => {
            if( item.number && item.price) {
                result+=item.number*tsla
            }  
        })

        setCurrent(result);
    }

    return (
        <Box margin="small" align="center" justify="center" gap="small">

            <Text>Your Portfolio</Text>            

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

           

            <Button icon={<Trash color="brand"/>} onClick={()=> {
                setStock([{number: '', price: ''}]);
                setCurrent('');
                setGoal('');
            }} /> 
           
        </Box>
    )
}

export default Savings;