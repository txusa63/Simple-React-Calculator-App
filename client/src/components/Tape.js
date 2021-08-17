import React, { useContext, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ScrollToBottom from 'react-scroll-to-bottom';
import CalculatorContext from '../context/CalculatorContext';
import {css} from '@emotion/css'

const ROOT_CSS = css({overflowY: 'scroll', height: '200px', position: 'relative'})

export const Tape = () => {
    const {result, setResult} = useContext(CalculatorContext);
    const {data, loadData} = useContext(CalculatorContext)

    useEffect(() => {
        loadData();
    }, []);

    const addToDisplay = (value) => {
        if(result !== '0' && result.indexOf('=') === -1) {
            setResult(result + value);
        }
        else {
            setResult(value);
        }
    }

    const mapData = () => {
        return data.map(elem => {
            return (
                <ListGroupItem key={elem._id} onClick={() => addToDisplay(elem.result)}>
                    {elem.operation}={elem.result}
                </ListGroupItem>
            )
        })
    }
    return (
        <ScrollToBottom className={ROOT_CSS}  >
            <div  >
                <ListGroup>
                    {data ? (mapData()): null}

                </ListGroup>
            </div>
        </ScrollToBottom>
    )
}
