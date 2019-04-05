import React from 'react';
import {MiscFunctions} from "../functions/MiscFunctions";
import ReactDOMServer from "react-dom/server";
import {CodeToBlockly} from "./CodeToBlockly";


export class StatementParse extends React.Component {

    // ## README ## voici les deux méthodes dont tu as besoin pour finaliser ta fonction parser.
    // 1) CodeToBlockly.buildBlockXmlFromBlocklyType
    // ex : pour construire un bloc sans l'écrire avec les strings. Inspire-toi de parseVariableDeclaration
    // 2) this.getBlocklyTypeFromStatementType(statType)
    // ex : this.getBlocklyTypeFromStatementType("VariableDeclaration") returns : "variables_set"

    static parseVariableDeclaration(stat) {

        let xml_out = []
        for (let i=0 ; i<stat['declarations'].length ; i++)
        {
            let decl = stat['declarations'][i]
            let statType = stat['type']

            let varName, varValue, varType
            try {
                varName = decl['id']['name'] // var name : always set (or throw ex)

                if (decl['init'] != null) {
                    varValue = decl['init']['value'] // var value : can be null
                    varType = decl['init']['type'] // var type : is it another variable's value or a new value ?
                }
                else {
                    varValue = null
                    varType = null
                }

                console.log(varName, varValue, varType)
                // COOOL IT WORKS :D now we can create xml.

                let xml_decl = [
                    // LEFT PART
                    CodeToBlockly.buildBlockXmlFromBlocklyType(
                        this.getBlocklyTypeFromStatementType(statType),
                        CodeToBlockly.buildFieldXmlFromFieldTypeAndVarName("VAR", varName),
                    ),
                    // RIGHT PART
                    CodeToBlockly.buildValueXml(
                        null
                    )
                ];

                // console.log(ReactDOMServer.renderToStaticMarkup(xml_decl))
                xml_out.push(xml_decl);

            } catch {}
        }
        return xml_out
    }


    static parseForStatement(stat) {
        /// #TO-DO
    }

    ////////////////////////////


    static getXmlFromStatement(stat) {

        // doit aiguiller vers la bonne fonction.
        let statType = stat['type']
        MiscFunctions.dispLine()
        console.log(">" + statType)

        let xml_list_stats = []
        switch (statType) {
            case "VariableDeclaration":
                xml_list_stats.push(this.parseVariableDeclaration(stat))
            case "ForStatement":
                xml_list_stats.push(this.parseForStatement(stat))
        }
        return xml_list_stats
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