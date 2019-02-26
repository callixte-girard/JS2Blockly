import React from 'react';
import ReactDOM from 'react-dom';

const esprima = require('esprima');

const line = "--------------------------------------------------------------";

export class RawCodeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleConversion = this.handleConversion.bind(this);
    }

    handleChange(event) {

        let inputContent = event.target.value ;

        this.setState({codeRaw: inputContent});
        // console.log(event.target.value);

        this.handleConversion(inputContent);
    }


    handleConversion(codeRaw) {

        console.log("codeRaw: " , codeRaw);

        let codeParsed = esprima.tokenize(codeRaw);
        console.log("codeParsed: " , codeParsed);

        console.log(line);
    }


    render() {
        return (
            <textarea id="code-raw"
                      rows="20"
                      cols="80"
                      onChange={this.handleChange}>
            ></textarea>
        );
    }

}