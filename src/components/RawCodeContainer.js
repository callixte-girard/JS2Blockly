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

        // 1) splits line by line
        // let splitContent = MiscFunctions.splitLineByLine(inputContent);
        // console.log("splitInput: " , splitContent);

        // 2) patches lines into one big string
        // let codeToParse = MiscFunctions.patchUpStringArrayIntoOneBigString(splitContent, true);

        // processes JS <> Blockly conversion
        try {
            // ### VER 1 : lexical
            // const parsedContent = CodeToBlock.lexicalAnalysis(codeToParse);

            // ### VER 2 : syntaxic
            let parsedContent = CodeToBlock.syntaxicAnalysis(inputContent);

            // debug
            console.log("programBody: ", parsedContent);
            console.log("------------------------------------");

            CodeToBlock.generateBlocksFromParsedContent(parsedContent);

        } catch (ex) {
            console.log(ex.stackTrace)
            ////// maybe insert lexical analysis here
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