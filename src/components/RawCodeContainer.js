import React from 'react';

import {style} from '../App.js';

const esprima = require('esprima');


export class RawCodeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.exampleCode = props.exampleCode;

        // bindings
        this.handleChange = this.handleChange.bind(this);
        this.handleConversion = this.handleConversion.bind(this);
    }

    handleChange(event) {

        let inputContent = event.target.value ;
        let index = inputContent.indexOf("/");

        let splitContent = inputContent.split(/\r?\n/);
        console.log("splitInput: " , splitContent);

        this.setState({codeRaw: splitContent});

        // converts code for parsing
        this.handleConversion(inputContent);

        // warns the other Component to refresh himself.
        // or gives the raw data to another Component that wil ParseCode.
        ///////
    }


    handleConversion(codeRaw) {

        // console.log("codeRaw: " , codeRaw);

        try {
            let codeParsed = esprima.tokenize(codeRaw);
            console.log("codeParsed: " , codeParsed);

            for (let i=0 ; i < codeParsed.length ; i++) {

                let word = codeParsed[i];
                console.log(word);
            }

        } catch {
            console.log("codeParsed: " , "!ERROR TO HANDLE!");
        }

        console.log("------------------------------------");
    }


    render() {

        return (
            <textarea id="code-raw"
                      style={{style}}
                      rows="40"
                      cols="80"
                      placeholder={this.exampleCode}
                      onChange={this.handleChange}
            >
            </textarea>
        );
    }

}