import jsx2str from 'jsx-to-string';
import ReactDOMServer from 'react-dom/server';


export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function splitLineByLine(toSplit) {
    return toSplit.split(/\r?\n/)
}

export function convertJsxArrayIntoJsx2StrArray(jsxArray) {
    let jsx2str_array = [];

    for (let i=0 ; i<jsxArray.length ; i++) { jsx2str_array[i] = jsx2str(jsxArray[i]); }
    return jsx2str_array
}

export function convertJsxArrayIntoStringArray(jsxArray) {
    let str_array = [];

    for (let i=0 ; i<jsxArray.length ; i++) { str_array[i] = ReactDOMServer.renderToStaticMarkup(jsxArray[i]); }
    return str_array
}

export function patchUpStringArrayIntoOneBigString(stringArray, delimiter) {

    let big_string = "";

    for (let i=0 ; i<stringArray.length ; i++) {
        big_string += stringArray[i]
        if (delimiter !== undefined) {
            big_string += delimiter
        }
    }

    return big_string
}