import React from 'react';
import ReactDOMServer from "react-dom/server";
import {MiscFunctions} from "../functions/MiscFunctions";

export class ConvertCodeToBlockly extends React.Component {


    static buildBlockXmlFromBlocklyType(blockType, x, y) {

        let xml_block =
            <block
                type={blockType}
                id={MiscFunctions.getRandomInt(100)}
                x={x}
                y={y}
            ></block>

        console.log(ReactDOMServer.renderToStaticMarkup(xml_block))
        return xml_block
    }


    static buildBodyXmlFromParsedContent(parsedContent) {

        let xml_full = [];

        for (let i=0 ; i<parsedContent.length ; i++) {

            let statementType = parsedContent[i].type;
            let blocklyType = this.getBlocklyTypeFromStatementType(statementType);
            console.log(statementType, blocklyType)

            // little bug to correct here : should not concatenate
            xml_full.push(
                this.buildBlockXmlFromBlocklyType(blocklyType,50,50 * (1 + i))
            );
        }

        // console.log(xml_full);
        return xml_full;
    }


    static generateBlocksFromParsedContent(parsedContent) {

        let xml =
            <xml xmlns='http://www.w3.org/1999/xhtml'>
                <variables></variables>
                {this.buildBodyXmlFromParsedContent(parsedContent)}
            </xml>

        console.log(ReactDOMServer.renderToStaticMarkup(xml))
        return (xml)
    }


    static getBlocklyTypeFromStatementType(statementType) {

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

        return statementTypeToBlocklyType[statementType]
    }

}