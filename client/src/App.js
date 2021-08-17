import React from 'react';
import { Keypad } from './components/Keypad';
import { Display } from './components/Display';
import { Tape } from './components/Tape';
import { Navbar } from './components/Navbar';
import './App.css';

export const App = () => {
    return (
        <>
            <Navbar />
            <div className='calculator'>
                <Tape />
                <div className='main-calculator'>
                    <Display />
                    <Keypad />
                </div>
            </div>
        </>
    )
}
