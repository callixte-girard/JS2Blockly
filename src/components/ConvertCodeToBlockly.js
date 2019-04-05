import React from 'react';
import ReactDOMServer from "react-dom/server";
import {MiscFunctions} from "../functions/MiscFunctions";

export class ConvertCodeToBlockly extends React.Component {


    static getXmlFromStatement(stat) {

        // doit aiguiller vers la bonne fonction.
        let statType = stat['type']
        MiscFunctions.dispLine()
        console.log(statType)

        let xml_list_stats = []
        switch (statType) {
            case "VariableDeclaration":
                xml_list_stats.push(this.parseVariableDeclaration(stat))
            case "ForStatement":
                xml_list_stats.push(this.parseForStatement(stat))
        }
        return xml_list_stats
    }


    static parseVariableDeclaration(stat) {

        let xml_out = []
        for (let i=0 ; i<stat['declarations'].length ; i++)
        {
            let decl = stat['declarations'][i]
            let statType = stat['type']

            let varName, varValue, varType
            // var type : is it another variable's value or a new value ? #TO-DO
            // varType = decl['init']['type']

            try {
                // var name : always set (or throw ex)
                varName = decl['id']['name']
                // var value : can be null
                if (decl['init'] != null) varValue = decl['init']['value']
                else varValue = null

                console.log(varName, varValue)
                // COOOL :D now we can create xml.

                let xml_decl = this.buildBlockXmlFromBlocklyType(
                    this.getBlocklyTypeFromStatementType(statType),
                    null,
                    50,
                    50 * (1 + i)
                )

                console.log(ReactDOMServer.renderToStaticMarkup(xml_decl))
                xml_out.push(xml_decl);

            } catch {}
        }
        return xml_out
    }


    static parseForStatement(stat) {


    }


    static buildBlockXmlFromBlocklyType(blockType, children, x, y) {

        let xml_block =
            <block
                type={blockType}
                id={MiscFunctions.getRandomInt(100)}
                x={x}
                y={y}
            >{children}</block>

        console.log(ReactDOMServer.renderToStaticMarkup(xml_block))
        return xml_block
    }


    static buildBodyXmlFromParsedContent(parsedContent) {

        let xml_full = [];
        for (let i=0 ; i<parsedContent.length ; i++) {

            let statement = parsedContent[i];
            // let statementType = parsedContent[i].type;
            // let blocklyType = this.getBlocklyTypeFromStatementType(statementType);
            // console.log(statementType, blocklyType)

            // little fix to add : must parse one more than just parent
            let xml_sublist = this.getXmlFromStatement(statement)

            for (let xml_index=0 ; xml_index < xml_sublist.length ; xml_index ++) {
                xml_full.push(
                    xml_sublist[xml_index]
                    // this.buildBlockXmlFromBlocklyType(blocklyType, null, 50,50 * (1 + i))
                );
            }
        }
        // console.log(ReactDOMServer.renderToStaticMarkup(xml_full[0]))
        return xml_full;
    }


    static generateBlocksFromParsedContent(parsedContent) {

        let xml_main =
            <xml xmlns='http://www.w3.org/1999/xhtml'>
                <variables></variables>
                {this.buildBodyXmlFromParsedContent(parsedContent)}
            </xml>

        MiscFunctions.dispLine()
        console.log(ReactDOMServer.renderToStaticMarkup(xml_main))
        return (xml_main)
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