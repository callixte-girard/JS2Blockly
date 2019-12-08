import React from 'react';
import ReactDOMServer from 'react-dom/server';
import jsx2str from 'jsx-to-string';

import {CodeContainer} from "./CodeContainer";
import {BlocklyContainer} from "./BlocklyContainer";
import {MainLogic} from "../parse/MainLogic";

import {splitLineByLine} from "../../static/methods";
import {line, star} from "../../static/constants";

const esprima = require('esprima');


export class MainContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            parsedContent: null,
            xmlContent: ""
        };

        this.updateCode = this.updateCode.bind(this)
    }

    updateCode(event) {
        let inputContent = event.target.value;

        // processes JS <> Blockly conversion
        try {
            // const split_content = splitLineByLine(inputContent);

            // ### VER 1 : lexical
            // let parsedContent = this.lexicalAnalysis(codeToParse);
            // ### VER 2 : syntaxic
            let parsedContent = this.syntaxicAnalysis(inputContent);

            console.log(star);
            console.log("programBody:", parsedContent);
            console.log(star);

            const xmlContent_jsx = MainLogic.generateBlocksFromParsedContent(parsedContent);
            // !!! this jsx --> str conversion with ReactDOMServer.RenderToStaticMarkup
            // !!! is ONLY for the final output (to avoid space that jsx-to-string woulg add)
            const xmlContent_str = ReactDOMServer.renderToStaticMarkup(xmlContent_jsx);
            // console.log("xmlContent_str:", xmlContent_str);

            this.setState({
                parsedContent: parsedContent,
                xmlContent: xmlContent_str
            });

        } catch (ex) { // this means invalid program syntax
            ////// maybe insert lexical analysis here

            this.setState({
                parsedContent: null,
                xmlContent: "" // ### Comment or uncomment to try ### Choose the one you prefer, both work :)
            });
        }
    }

    syntaxicAnalysis(codeRaw) {
        // console.log("codeRaw: " , codeRaw);

        let codeParsed;
        try {
            codeParsed = esprima.parse(codeRaw);
            return codeParsed.body
        } catch (ex) {
        }
    }

    lexicalAnalysis(codeRaw) {
        // console.log("codeRaw: " , codeRaw);

        let codeParsed;
        try {
            codeParsed = esprima.tokenize(codeRaw);
            return codeParsed
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