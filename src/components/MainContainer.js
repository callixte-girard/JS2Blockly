import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Blockly from 'node-blockly/browser';

import {CodeContainer} from "./CodeContainer";
import {BlocklyContainer} from "./BlocklyContainer";
// import {CodeToBlock} from "./CodeToBlock";

const esprima = require('esprima');


export class MainContainer extends React.Component {

    constructor(props) {
        super(props)

        this.exampleCode = "put your js code here..."

        this.state = {
            parsedContent: null,
            xmlContent: ""
        }

        this.updateCode = this.updateCode.bind(this)
        this.updateBlocks = this.updateBlocks.bind(this)
    }

    updateCode(event) {

        let inputContent = event.target.value;

        // 1) splits line by line
        // let splitContent = MiscFunctions.splitLineByLine(inputContent);
        // console.log("splitInput: " , splitContent);

        // 2) patches lines into one big string
        // let codeToParse = MiscFunctions.patchUpStringArrayIntoOneBigString(splitContent, true);

        // processes JS <> Blockly conversion
        try {
            // ### VER 1 : lexical
            // let parsedContent = this.lexicalAnalysis(codeToParse);

            // ### VER 2 : syntaxic
            let parsedContent = this.syntaxicAnalysis(inputContent);

            // debug
            console.log("programBody: ", parsedContent);
            console.log("------------------------------------");

            let xmlContent = this.generateBlocksFromParsedContent(parsedContent);

            // **** ADDED (test) ****
            this.setState({
                parsedContent: parsedContent,
                xmlContent: xmlContent
            })

        } catch (ex) {
            console.log(ex.stackTrace)
            ////// maybe insert lexical analysis here
        }
    }

    updateBlocks() {


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


    lexicalAnalysis(codeRaw) {
        // console.log("codeRaw: " , codeRaw);

        let codeParsed
        try {
            codeParsed = esprima.tokenize(codeRaw);

            // Création du tableau contenant les mots parsés par esprima
            for (let i=0 ; i < codeParsed.length ; i++) {

            }
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


    parsedContentToXml(parsedContent) {

        const xml_head = "<block type='"
        const xml_tail = "'></block>"
        let xml_body = ""

        /////// do processing here
        // 1) make recursive
        // 2) call the JSON to corresponding blockly type
        for (let i=0 ; i<parsedContent.length ; i++) {

            let statementType = parsedContent[i].type
            // console.log(statementType)


        }

        xml_body += "controls_if"
        /////// end of processing

        // assembles xml pieces
        return xml_head + xml_body + xml_tail
    }


    generateBlocksFromParsedContent(parsedContent) {

        const xml_head = "<xml xmlns='http://www.w3.org/1999/xhtml'><variables></variables>"
        const xml_tail = "</xml>"

        // processes code into xml corresponding
        let xml_body = this.parsedContentToXml(parsedContent)
        // assembles xml pieces
        let xml_final = xml_head + xml_body + xml_tail

        return (xml_final)
    }

}