import React from 'react';
import {MiscFunctions} from "../functions/MiscFunctions";
import ReactDOMServer from "react-dom/server";
import {CodeToBlockly} from "./CodeToBlockly";


let varNameToId = {};

export class StatementParse extends React.Component {

    // ## README ## voici les deux méthodes dont tu as besoin pour finaliser ta fonction parser.
    // 1) CodeToBlockly.buildBlockXml
    // ex : pour construire un bloc sans l'écrire avec les strings. Inspire-toi de parseVariableDeclaration
    // 2) this.getBlocklyTypeFromStatType(statType)
    // ex : this.getBlocklyTypeFromStatType("VariableDeclaration") returns : "variables_set"

    static parseVariableDeclaration(stat) {

        let xml_out = []
        for (let i=0 ; i<stat['declarations'].length ; i++)
        {
            let decl = stat['declarations'][i]
            let statType = stat['type']

            let varName, varValue, varType, varJsType
            try {
                varName = decl['id']['name'] // var name : always set (or throw ex)

                if (decl['init'] != null) {
                    // var type : is it another variable's value or a new value ?
                    varType = decl['init']['type']

                    // var value : can be null
                    if (varType === 'Identifier') {
                        varValue = decl['init']['name']
                    } else if (varType === 'Literal') {
                        varValue = decl['init']['value']
                    }
                }
                else {
                    varValue = null;
                    varType = null;
                }
                varJsType = (typeof varValue);

                console.log(varName, varValue, varJsType, varType);
                // COOOL IT WORKS :D now we can create xml.


                let pipou;
                // variables already exists in the scope ??
                if (varNameToId.hasOwnProperty(varValue)) {

                    if (varType === 'Identifier') {

                        console.log(varNameToId.hasOwnProperty(varValue))

                        pipou = varNameToId[varValue];
                    } else {
                        // if (varType === "Identifier") {
                        // records variable in var_scope
                        varNameToId[varName] = MiscFunctions.getRandomInt(1000);
                        console.log(varNameToId);
                        // } else {
                        // }
                        pipou = varNameToId[varName];
                    }
                }


                let xml_decl = [
                    CodeToBlockly.buildBlockXml(
                        this.getBlocklyTypeFromStatType(statType),
                        [
                            // LEFT PART
                            CodeToBlockly.buildFieldXml(
                                "VAR",
                                varName,
                                MiscFunctions.getRandomInt(1000)
                            ),
                            // RIGHT PART
                            CodeToBlockly.buildValueXml(
                                CodeToBlockly.buildBlockXml(
                                    this.getBlocklyTypeFromVarType(varJsType, varType),
                                    CodeToBlockly.buildFieldXml(
                                        this.getFieldTypeFromVarType(varJsType, varType),
                                        varValue,
                                        pipou
                                    )
                                )
                            )
                        ]
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

    static getFieldTypeFromVarType(jsVarType, varType) {

        const jsVarTypeToFieldType = {
            "number": "NUM",
            "string": "TEXT",
            "boolean": "BOOL",
            // "undefined": "VAR"
        };

        if (varType === "Identifier") {
            return "VAR"
        } else if (varType === "Literal") {
            return jsVarTypeToFieldType[jsVarType]
        }
    }

    static getBlocklyTypeFromVarType(jsVarType, varType) {

        const jsVarTypeToBlocklyType = {
            "number": "math_number",
            "string": "text",
            "boolean": "logic_boolean",
            // "undefined": "variables_get"
        };
        if (varType === "Identifier") {
            return "variables_get"
        } else if (varType === "Literal") {
            return jsVarTypeToBlocklyType[jsVarType]
        }
    }

    static getBlocklyTypeFromStatType(statType) {

        const statTypeToBlocklyType = {
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
        return statTypeToBlocklyType[statType]
    }

}