export function isInvalid(str) {
    let index = 0;

    if(str.indexOf('.') !== -1) {
        index = str.indexOf('.');
        if(str[index + 1] === '.' || str[index + 1] === '-' || str[index + 1] === '+' || str[index + 1] === 'x' || str[index + 1] === '/') {
            return true
        }
    }
    
    if(str.indexOf('+') !== -1) {
        index = str.indexOf('+');
        if(str[index + 1] === '+' || str[index + 1] === '/' || str[index + 1] === 'x') {
            return true
        }
    }

    if(str.indexOf('-') !== -1) {
        index = str.indexOf('-');
        if(str[index + 1] === '/' || str[index + 1] === 'x') {
            return true
        }
    }

    if(str.indexOf('x') !== -1) {
        index = str.indexOf('x');
        if(str[index + 1] === '+' || str[index + 1] === '/' || str[index + 1] === 'x') {
            return true
        }
    }

    if(str.indexOf('/') !== -1) {
        index = str.indexOf('/');
        if(str[index + 1] === '+' || str[index + 1] === '/' || str[index + 1] === 'x') {
            return true;
        }
        if(str[index + 1] === '0') {
            return true;
        }
    }

    
    return false;
}

function stringToArray(str) {
    let data = []
    let temp = ''

    for(let i=0; i<str.length; i++) {
        if(!isNaN(str[i]) || str[i] === '.') {
            temp += str[i]
        }

        else if((str[i] === '-' && i === 0) || (str[i] === '-' && isNaN(str[i-1]))) {
            temp += str[i]
        }

        else if(isNaN(str[i]) && str[i] !== '.') {
            data.push(temp);
            temp = '';
            data.push(str[i]);
        }

        else {
            data.push(temp);
            temp = '';
        }
    }

    return data;
};


function calculation(data) {
    let index = undefined;
    let result = 0;

    while(data.indexOf('x') !== -1 || data.indexOf('/') !== -1) {
        for(let i=0; i<data.length; i++) {
            if(data[i] === 'x') {
                index = data.indexOf('x');
                result = Number(data[index - 1]) * Number(data[index + 1]);
                data.splice(index-1, 1, result);
                data.splice(index, 2);
                break;
            }
            if(data[i] === '/') {
                index = data.indexOf('/');
                result = Number(data[index - 1]) / Number(data[index + 1]);
                data.splice(index-1, 1, result);
                data.splice(index, 2);
                break;
            }
        }
        
    }

    while(data.indexOf('+') !== -1 || data.indexOf('-') !== -1) {
        for(let i=0; i<data.length; i++) {
            if(data[i] === '+') {
                index = data.indexOf('+');
                result = Number(data[index - 1]) + Number(data[index + 1]);
                data.splice(index-1, 1, result);
                data.splice(index, 2);
                break;
            }

            if(data[i] === '-') {
                index = data.indexOf('-');
                result = Number(data[index - 1]) - Number(data[index + 1]);
                data.splice(index-1, 1, result);
                data.splice(index, 2);
                break;
            }
        }

    }

    return data[0];
}

export default function runOperation(str) {
    const data = stringToArray(str);
    const current = calculation(data)
    
    return current;
}