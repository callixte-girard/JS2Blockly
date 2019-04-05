import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Blockly from 'node-blockly/browser';

import {CodeContainer} from "./CodeContainer";
import {BlocklyContainer} from "./BlocklyContainer";
import {CodeToBlockly} from "./CodeToBlockly";
import {MiscFunctions} from "../functions/MiscFunctions";

const esprima = require('esprima');


export class MainContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            parsedContent: null,
            xmlContent: ""
        }

        this.updateCode = this.updateCode.bind(this)
    }

    updateCode(event) {

        let inputContent = event.target.value;

        // processes JS <> Blockly conversion
        try {
            // const split_content = MiscFunctions.splitLineByLine(inputContent);

            // ### VER 1 : lexical
            // let parsedContent = this.lexicalAnalysis(codeToParse);
            // ### VER 2 : syntaxic
            let parsedContent = this.syntaxicAnalysis(inputContent);

            console.log("programBody: ", parsedContent);
            let xmlContent = CodeToBlockly.generateBlocksFromParsedContent(parsedContent);

            this.setState({
                parsedContent: parsedContent,
                xmlContent: xmlContent
            });

        } catch (ex) {////// maybe insert lexical analysis here

            this.setState({
                parsedContent: null,
                xmlContent: "" // ### Comment or uncomment to try ### Choose the one you prefer, both work :)
            });
        }
        MiscFunctions.dispStar()
    }

    lexicalAnalysis(codeRaw) {
        // console.log("codeRaw: " , codeRaw);

        let codeParsed
        try {
            codeParsed = esprima.tokenize(codeRaw);
            return codeParsed
        } catch (ex) {
        }
    }

    syntaxicAnalysis(codeRaw) {
        // console.log("codeRaw: " , codeRaw);

        let codeParsed
        try {
            codeParsed = esprima.parse(codeRaw);
            return codeParsed.body
        } catch (ex) {
        }
    }


    render() {
        return (
            <div>
                <CodeContainer
                    exampleCode={this.exampleCode}
                    updateCode={this.updateCode}
                />
                
                <BlocklyContainer
                    xmlContent={this.state.xmlContent}
                />
            </div>
        )
    }
}