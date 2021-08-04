import React from 'react';
import './Buttons.css'

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            digits: '',
            numbers: [],
            operators: []
        }
        this.processData = this.processData.bind(this);
        this.runCallback = this.runCallback.bind(this);
    };

    processData(val) {
        const {digits, numbers, operators} = this.state;
        let str;

        if(this.props.isInitial === false) {
            str = this.props.data;
        }
        else {
            str = digits;
        }

        if(isNaN(val) && val !== '.') {
            if(digits.endsWith('.')) {
                str+='0'
            }
            if(val === 'AC') {
                this.setState({
                    digits: 'AC',
                }, () => {this.runCallback()});
            }
            if(val === '%') {
                let percent;
                percent = Number(digits);
                percent = percent/100;
                this.setState({
                    digits: percent.toString()
                }, () => {this.runCallback()})
            }
            if(val === '+/-' && this.props.data !== '0') {
                let newString;
                if(str.startsWith('-')) {
                    newString = str.replace('-', '')
                }
                if(!str.startsWith('-')) {
                    newString = str.padStart(str.length+1, '-');
                }
                this.setState({
                    digits: newString
                }, () => {this.runCallback()})
            }
            if((val === '+' || val === '-' || val === '/' || val === 'x') && !operators.includes(val) ) {
                console.log(val)
                if(operators[0] === '+' || operators[0] === '-' || operators[0] === '/' || operators[0] === 'x') {
                    this.setState({
                        operators: val
                    })
                }
                else {
                    this.setState({
                        operators: operators.concat(val),
                        numbers: numbers.concat(str),
                        digits: '',
                    });
                }

            }
            if(val === '=' && !operators.includes('=') && operators.length === 1) {
                this.setState({
                    operators: operators.concat(val),
                    numbers: numbers.concat(str),
                    digits: ''
                }, () => {this.runCallback()});
            }
        }

        if(!isNaN(val) || val === '.') {
            console.log(val)
            const {digits} = this.state;
            this.setState({
                digits: digits.concat(val)
            }, () => {this.runCallback()})
        }
    }


    runCallback() {
        const {digits, numbers, operators} = this.state;
        if((numbers.length === 2 && operators.length === 2)) {
            console.log("Calling App with full array", this.state)
            this.props.returnData(digits, numbers, operators, false);
            this.setState({
                numbers: [],
                operators: []
            });
        }
        else if(digits === 'AC') {
            this.props.returnData('0', numbers, operators, false);
            this.setState({
                numbers: [],
                operators: [],
                digits: ''
            })
        }
        else {
            console.log("Calling App with a single value", this.state)
            this.props.returnData(digits, numbers, operators);
        }
    }

    render() {
        return (
            <div className=''>
            {console.log("State in render", this.state)}
            {console.log("props in render ", this.props)}
            <table >
                <tbody>
                    <tr>
                        <td>
                            <button onClick={() => {this.processData('AC')}}>AC</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('+/-')}}>+/-</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('%')}}>%</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('/')}}>/</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => {this.processData('7')}}>7</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('8')}}>8</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('9')}}>9</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('x')}}>x</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => {this.processData('4')}}>4</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('5')}}>5</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('6')}}>6</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('-')}}>-</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => {this.processData('1')}}>1</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('2')}}>2</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('3')}}>3</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('+')}}>+</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => {this.processData('0')}}>0</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('.')}}>.</button>
                        </td>
                        <td>
                            <button onClick={() => {this.processData('=')}}>=</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}
