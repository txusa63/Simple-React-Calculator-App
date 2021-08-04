import React from 'react';

export default class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {data, numbers, operators, isInitial} = this.props;
        let a = Number(numbers[0]);
        let b = Number(numbers[1]);
        let result;

        if(operators[0] === '+') {
            result = a + b;
        }
        if(operators[0] === '-') {
            result = a - b;
        }
        if(operators[0] === 'x') {
            result = a * b;
        }
        if(operators[0] === '/') {
            result = a / b;
        }

        this.props.returnData(result.toString(), [], [], false);
    }

    render() {
        return (
            <div>
                <p>Something went wrong...</p>
            </div>
        )
    }
}
