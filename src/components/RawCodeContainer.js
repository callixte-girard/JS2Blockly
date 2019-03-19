import React from 'react';

import {style} from '../App.js';

import {CodeToBlock} from './CodeToBlock.js';
import {MiscFunctions} from '../functions/MiscFunctions';

export class RawCodeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.exampleCode = props.exampleCode;

        // bindings
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {

        let inputContent = event.target.value;
        // let index = inputContent.indexOf("/");

        let splitContent = MiscFunctions.splitLineByLine(inputContent);
        console.log("splitInput: " , splitContent);

        // warns the other Component to refresh himself.
        // or gives the raw data to another Component that wil ParseCode.
        ///////
        this.setState({
            codeRaw: splitContent
        });

        // processes conversion
        try {
            const parsedContent = CodeToBlock.lexicalAnalysis(inputContent);
            CodeToBlock.generateXmlFromParsedContent(parsedContent);

        } catch {
            //////
        }


    }


    render() {

        return (
            <textarea id="code-raw"
                      rows="40"
                      cols="60"
                      placeholder={this.exampleCode}
                      onChange={this.handleChange}
            >
            </textarea>
        );
    }

}