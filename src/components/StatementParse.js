import React from 'react';
import {MiscFunctions} from "../functions/MiscFunctions";
import ReactDOMServer from "react-dom/server";
import {CodeToBlockly} from "./CodeToBlockly";


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
                    } else if (varType.toString().includes('Expression')) {
                        varValue = this.parseExpression(varType)
                    }
                }
                else {
                    varValue = null;
                    varType = null;
                }
                // JS type
                varJsType = (typeof varValue);

                console.log(varName, varValue, varJsType, varType);
                // COOOL IT WORKS :D now we can create xml.


                // now creating of the separate parts...
                let leftPart, rightPart, children;

                leftPart = CodeToBlockly.buildFieldXml(
                    "VAR",
                    varName
                );

                try {
                    rightPart = CodeToBlockly.buildValueXml(
                        "VALUE"
                        ,CodeToBlockly.buildBlockXml(
                            this.getBlocklyTypeFromVarType(varJsType, varType),
                            CodeToBlockly.buildFieldXml(
                                this.getFieldTypeFromVarType(varJsType, varType),
                                varValue.toString()
                            )
                        )
                    );
                    children = [leftPart, rightPart]
                } catch {
                    children = [leftPart]
                }

                // ...and assembling them :)
                let xml_decl = [
                    CodeToBlockly.buildBlockXml(
                        this.getBlocklyTypeFromStatType(statType),
                        children
                    )
                ];

                // console.log(ReactDOMServer.renderToStaticMarkup(xml_decl))
                xml_out.push(xml_decl);

            } catch {}
        }

        return xml_out
    }


    static parseExpression(expr) {

        // first examinates which kind of expression it is

        // then calculate its result and return it as a value

    }


    static parseForStatement(stat) {

        let xml_out;

        const statType = stat['type'];

        let decl = stat['init'];
        let test = stat['test'];
        let update = stat['update'];
        
        // decl
        // test
        // update

        let children = [];

        xml_out = CodeToBlockly.buildBlockXml(
            this.getBlocklyTypeFromStatType(statType),
            children
        );

        return xml_out
    }

    ////////////////////////////


    static getXmlFromStatement(stat) {

        // doit aiguiller vers la bonne fonction.
        let statType = stat['type']
        MiscFunctions.dispLine()
        console.log(">>> " + statType)

        let xml_list_stats = []
        switch (statType) {
            // declarations
            case "VariableDeclaration":
                xml_list_stats.push(this.parseVariableDeclaration(stat)); break
            // statements
            case "ForStatement":
                xml_list_stats.push(this.parseForStatement(stat)); break

        }
        return xml_list_stats
    }

    static getFieldTypeFromVarType(jsVarType, varType) {

        const jsVarTypeToFieldType = {
            "number": "NUM",
            "string": "TEXT",
            "boolean": "BOOL",
            "object": "VAR"
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
            "object": "variables_get"
        };
        if (varType === "Identifier") {
            return "variables_get"
        } else if (varType === "Literal") {
            return jsVarTypeToBlocklyType[jsVarType]
        }
    }
    
    static getBlocklyTypeFromExprType(exprType) {
        
        const exprTypeToBlocklyType = {
            // ThisExpression: ,
            Identifier: "variables_get",
            // Literal: , // needs another data to select : "math_number" | "text" | "logic_boolean"
            // ArrayExpression: ,
            // ObjectExpression: ,
            // FunctionExpression: ,
            // ArrowFunctionExpression: ,
            // ClassExpression: ,
            // TaggedTemplateExpression: ,
            // MemberExpression: ,
            // Super: ,
            // MetaProperty: ,
            // NewExpression: ,
            // CallExpression: ,
            // UpdateExpression: ,
            // AwaitExpression: ,
            // UnaryExpression:,
            BinaryExpression: "math_arithmetic",
            LogicalExpression: "logic_operation",
            // ConditionalExpression: ,
            // YieldExpression: ,
            // AssignmentExpression: ,
            // SequenceExpression: ,
        };
        return exprTypeToBlocklyType[exprType]
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