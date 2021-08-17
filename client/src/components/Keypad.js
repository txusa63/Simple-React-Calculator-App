import React, { useContext, useState, } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import CalculatorContext from '../context/CalculatorContext';
import runOperation, { isInvalid } from '../utils/utils';

export const Keypad = () => {
    const {result, setResult, loadData} = useContext(CalculatorContext);
    const [deleteModal, setDeleteModal] = useState(false);
    const [invalidModal, setInvalidModal] = useState(false);
    let finalResult = '0';
    
    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    const toggleInvalidModal = () => {
        setInvalidModal(!invalidModal);
    };

    const save = async (e) => {
        try {
            const calculationData = {
                operation: result,
                result: finalResult
            };

            await axios.post('/calculations/save', calculationData);
            await loadData();
        } 
        
        catch (err) {
            console.error(err);
        }
        
    };

    const deleteAll = async () => {
        try {
            await axios.delete('/calculations/delete');
            toggleDeleteModal();
            await loadData();
        } 
        
        catch (err) {
            console.error(err);
        }
    }

    const handleClick = (value) => {
        if(result.indexOf('=') === -1) {
            if(value === 'AC') {
                console.log('Tape preparing to clear')
            }

            else if(value === 'C') {
                setResult('0');
                console.log('cleared')
            }

            else if(value === '=') {
                if(result !== '0') {
                    if(isInvalid(result) === false) {
                        finalResult = runOperation(result+value);
                        setResult(result + value + String(finalResult));
                        save()
                    }
                    else {
                        toggleInvalidModal()
                    }
                }
            }

            else if(value === '<-') {
                if(result !== '0') {
                    if(result.length === 1) {
                        setResult(result.slice(0, -1));
                        setResult('0')
                    }
                    else {
                        setResult(result.slice(0, -1))
                    }
                
                }

                if(result === '') {
                    setResult('0')
                }

                if(result[0] === '-') {
                    setResult('0')
                }
            }

            else {
                if(result === '0') {
                    if(value === '.') {
                        setResult(result + value)
                    }
                
                    else {
                        setResult(result.replace(result, '' + value))
                    }
                }
                else {
                    setResult(result + value)
                }
            }
        }

        else {
            if(value === '+' || value === '-' || value === 'x' || value === '/') {
                const oldResult = result.slice(result.indexOf('=') + 1);
                setResult(String(oldResult) + value);
            }
            else if(value !== '<-' && value !== 'C' && value !== 'AC') {
                setResult(result.replace(result, '' + value))
            }

            else if(value === 'C' || value === '<-' || value === 'AC') {
                setResult('0')
            }

            else {
                setResult('0')
            }
        }
    }

    return (
        <div className='calculator-buttons'>
            <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
                <ModalHeader toggle={toggleDeleteModal}>Deletion Warning</ModalHeader>
                <ModalBody>Do you wish to delete all entries on the tape?</ModalBody>
                <ModalFooter>
                    <Button color='success' onClick={deleteAll}>Accept</Button>
                    <Button color='danger' onClick={toggleDeleteModal}>Reject</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={invalidModal} toggle={toggleInvalidModal}>
                <ModalHeader toggle={toggleInvalidModal}>Invalid Form</ModalHeader>
                <ModalBody>The input is invalid. Check for errors.</ModalBody>
                <ModalFooter>
                    <Button color='info' onClick={toggleInvalidModal}>Ok</Button>
                </ModalFooter>
            </Modal>
            <button className="button is-clear orange operator" onClick={() => {handleClick('AC'); toggleDeleteModal()}}>AC</button>
            <button className="button is-clear orange operator" onClick={() => handleClick('C')}>C</button>
            <button className="button orange operator" onClick={() => handleClick('<-')}>&#9746;</button>
            <button className="button orange operator" onClick={() => handleClick('/')}>&divide;</button>
            <button className="button" onClick={() => handleClick('7')}>7</button>
            <button className="button" onClick={() => handleClick('8')}>8</button>
            <button className="button" onClick={() => handleClick('9')}>9</button>
            <button className="button orange operator" onClick={() => handleClick('x')}>x</button>
            <button className="button" onClick={() => handleClick('4')}>4</button>
            <button className="button" onClick={() => handleClick('5')}>5</button>
            <button className="button" onClick={() => handleClick('6')}>6</button>
            <button className="button orange" onClick={() => handleClick('-')}> -</button>
            <button className="button" onClick={() => handleClick('1')}>1</button>
            <button className="button" onClick={() => handleClick('2')}>2</button>
            <button className="button" onClick={() => handleClick('3')}>3</button>
            <button className="button orange operator" onClick={() => handleClick('+')}>+</button>
            <button className="button span-2" onClick={() => handleClick('0')}>0</button>
            <button className="button " onClick={() => handleClick('.')}>.</button>
            <button className="button orange operator" onClick={() => {handleClick('=')}}> =</button>
        </div>
    )
}
