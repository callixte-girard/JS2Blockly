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
            // console.log(ex.stackTrace)
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

        let whole_xml = ""

        /////// do processing here
        // 1) make recursive
        for (let i=0 ; i<parsedContent.length ; i++) {

            let statementType = parsedContent[i].type
            // console.log(statementType)

            let blocklyType = this.getBlocklyTypeFromStatementType(statementType)
            // console.log("statement_" + i, blocklyType)

            // create block
            let block_xml = this.buildBlockXmlFromBlockyType(blocklyType, 10, 10)
            // appends it to whole xml
            whole_xml += block_xml
        }

        /////// end of processing
        return whole_xml
    }


    buildBlockXmlFromBlockyType(blockType, x, y) {

        let xml_block = <block
            type={blockType}
            id="pipou"
            x={x}
            y={y}
        ></block>
        // xml_block.setAttribute("type", "controls_if")

        // console.log(ReactDOMServer.renderToStaticMarkup(xml_block))
        return xml_block

        // assembles xml pieces
        // return xml_head + xml_body + xml_tail
    }


    getBlocklyTypeFromStatementType(statementType) {

        const statementTypeToBlocklyType = {
            // BlockStatement: ,
            // BreakStatement: ,
            // ContinueStatement: ,
            // DebuggerStatement: ,
            // DoWhileStatement: ,
            // EmptyStatement: ,
            // ExpressionStatement: ,
            ForStatement: "controls_for",
            // ForInStatement: ,
            // ForOfStatement: ,
            // FunctionDeclaration: ,
            IfStatement: "controls_if",
            // LabeledStatement: ,
            // ReturnStatement: ,
            // SwitchStatement: ,
            // ThrowStatement: ,
            // TryStatement: ,
            VariableDeclaration: "variables_set",
            WhileStatement: "controls_whileUntil",
            // WithStatement: ,
        };

        // for (let statementType in statementTypeToBlocklyType) {
        //     let blocklyType = statementTypeToBlocklyType[statementType];
        //     console.log(statementType, blocklyType);
        // }

        return statementTypeToBlocklyType[statementType]
    }


    generateBlocksFromParsedContent(parsedContent) {

        let xml = <xml xmlns='http://www.w3.org/1999/xhtml'>
            <variables></variables>
            {this.buildBlockXmlFromBlockyType("controls_if",50,50)}
        </xml>

        // assembles xml pieces
        // let xml_final = xml_head + xml_body + xml_tail

        console.log(ReactDOMServer.renderToStaticMarkup(xml))
        return (xml)
    }

}