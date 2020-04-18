import React from 'react';
import Header from './components/header/Header'
import Display from './components/display/Display';
import Buttons from './components/buttons/Buttons';
import './App.css';
var ReactFitText = require('react-fittext');

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: '0',
            numbers: [],
            operators: [],
            isInitial: true
        }
        this.returnData = this.returnData.bind(this);
    }

    returnData(data, numbers, operators, isInitial) {
        this.setState({
            data: data,
            numbers: numbers,
            operators: operators,
            isInitial: isInitial,
        });
    }

    render() {
        const {data, numbers, operators, isInitial} = this.state;
        let block;

        if(numbers.length === 2 && operators.length === 2) {
            console.log('Calling Display')
            block = <Display numbers={numbers} operators={operators} returnData={this.returnData} isInitial={isInitial} />
        }
        else {
            let number;
            if(!isNaN(data)) {
                number = Number(data);
            }
            else {
                number = data;
            }
            block = <p>{number.toLocaleString('en')}</p>
        }

        return (
          <div>
              <Header />
              <div className='calculator'>
              <ReactFitText compressor={2.10}>
                  {block}
              </ReactFitText>
              <Buttons
                data={data}
                isInitial={isInitial}
                returnData={this.returnData}
              />
              </div>
          </div>
        );
    }
}
