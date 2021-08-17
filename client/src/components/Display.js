import React, { useContext, useEffect } from 'react'
import CalculatorContext from '../context/CalculatorContext'

export const Display = () => {
    const {result, setResult, loadData} = useContext(CalculatorContext);

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <input type='text' className='calc-numbers' value={result} onChange={(e) => setResult(e.target.value)}/>
        </div>
    )
}
