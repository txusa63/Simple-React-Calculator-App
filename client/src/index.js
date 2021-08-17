import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CalculatorContextProvider } from './context/CalculatorContext';

ReactDOM.render(
    <React.StrictMode>
        <CalculatorContextProvider>
            <App />
        </CalculatorContextProvider>
    </React.StrictMode>, 
    document.getElementById('root')
);
