import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

const CalculatorContext = createContext();

export const CalculatorContextProvider = (props) => {
    const [result, setResult] = useState('0');
    const [data, setData] = useState(undefined)

    const loadData = async () => {
        const loadDataRes = await axios.get('/calculations/');
        if(loadDataRes.data) {
            setData(loadDataRes.data);
        }
    };

    useEffect(() => {
        loadData()
    }, []);

    return (
        <CalculatorContext.Provider value={{result, setResult, data, loadData}} >
            {props.children}
        </CalculatorContext.Provider>
    )
};

export default CalculatorContext;