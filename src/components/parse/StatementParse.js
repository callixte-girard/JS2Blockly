import React from 'react';
import {MiscFunctions} from "../../functions/MiscFunctions";
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
                    const exprInit = decl['init'];
                    varType = exprInit['type'];

                    // var value : can be null
                    varValue = this.parseExpression(exprInit)
                }
                else {
                    varValue = null;
                    varType = null;
                }
                // JS type
                varJsType = (typeof varValue);

                console.log(varName, varValue, varJsType, varType);
                // COOOL IT WORKS :D now we can create xml.


                // now creating the separate parts...
                let leftPart, rightPart, children;

                leftPart = CodeToBlockly.buildFieldXml(
                    "VAR",
                    varName
                );

                try {
                    rightPart =
                        CodeToBlockly.buildValueXml(
                            "VALUE"
                            ,CodeToBlockly.buildBlockXml(
                                this.getBlocklyTypeFromExprAndVarType(varJsType, varType),
                                CodeToBlockly.buildFieldXml(
                                    this.getFieldNameFromVarType(varJsType, varType),
                                    varValue
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

                console.log(MiscFunctions.convertJsxArrayIntoStringArray(xml_decl));
                xml_out = xml_out.concat(xml_decl);

            } catch {}
        }

        return xml_out
    }


    static parseExpression(expr) {

        let xml_out = [];

        let blockType ;
        let children = [];

        // first examinates which type of expression it is
        const exprType = expr['type'];

        // real expressions : to be recursively analysed (children) just before building
        if (exprType.includes('Expression'))
        {
            const exprOperator = expr['operator'];
            // const exprValue = expr[]
            console.log(exprType, exprOperator);

            // both slaves and hosts : must be recursively parsed again.

            // 1 arg
            if (exprType === 'UnaryExpression') {
                const exprArg = expr['argument']

                // then update expr with its children
                // and analyse them the same way
                const argBlock = this.parseExpression(exprArg);

                const argValue = exprArg['value'];
                const argType = typeof argValue;
                // if (argType === 'number') {
                //
                // }

                // first adds useful children tags
                children.concat([
                    CodeToBlockly.buildFieldXml(
                        argType,
                        argBlock
                    )
                ])

            // 2 args
            } else if (exprType === 'LogicalExpression' || exprType === 'BinaryExpression') {
                // left and right must be of same type
                const exprRight = expr['right']
                const exprLeft = expr['left']

                let fieldType = "OP";
                let fieldValue ;

                // which operation ?
                if (exprType === 'LogicalExpression') {
                    blockType = 'logic_operation'

                    if (exprOperator === '&&') {
                        fieldValue = "AND"

                    } else if (exprOperator === '||') {
                        fieldValue = "OR"
                    }

                } else if (exprType === 'BinaryExpression') {
                    // TO-DO
                }

                // then update expr with its children
                // and analyse them the same way
                const leftBlock = this.parseExpression(exprLeft);
                const rightBlock = this.parseExpression(exprRight);

                // first adds useful children tags
                children.concat([
                    CodeToBlockly.buildFieldXml(fieldType, fieldValue),
                    CodeToBlockly.buildValueXml("A", leftBlock),
                    CodeToBlockly.buildValueXml("B", rightBlock),
                ])
            }

        } else {  // which is : if expression is not really an epression ( = Literal / Identifier )
            let varValue, jsVarType ;

            if (exprType === 'Identifier') {
                varValue = expr['name']
            } else if (exprType === 'Literal') {
                varValue = expr['value']
            }
            jsVarType = typeof varValue

            // first adds useful children tags
            children.concat([
                CodeToBlockly.buildFieldXml(
                    this.getFieldNameFromVarType(jsVarType, exprType),
                    varValue
                )
            ])
        }
        console.log("children:", children);

        const xml_final = CodeToBlockly.buildBlockXml(blockType, children);
        console.log("xml_final:", ReactDOMServer.renderToStaticMarkup(xml_final));

        xml_out = xml_out.concat(xml_final);
        return xml_out
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


    static getXmlFromStatement(statement) {

        // doit aiguiller vers la bonne fonction.
        let statType = statement['type']
        MiscFunctions.dispLine()
        console.log(">>> " + statType)

        let xml_list_stats = []
        if (statType === 'VariableDeclaration') { //  declarations
            xml_list_stats = xml_list_stats.concat(this.parseVariableDeclaration(statement))
        } else if (statType === 'ForStatement') {  // statements
            xml_list_stats = xml_list_stats.concat(this.parseForStatement(statement))
        } else if (statType === 'IfStatement') {
            // xml_list_stats = xml_list_stats.concat(this.parseIfStatement(statement))
        } else if (statType === 'WhileStatement') {
            // xml_list_stats = xml_list_stats.concat(this.parseWhileStatement(statement))
        }
        return xml_list_stats
    }

    static getFieldNameFromVarType(jsVarType, exprType) {

        const jsVarTypeToFieldType = {
            "number": "NUM",
            "string": "TEXT",
            "boolean": "BOOL",
            "object": "VAR"
        };

        if (exprType === "Identifier") {
            return "VAR"
        } else // if (varType === "Literal")
        {
            return jsVarTypeToFieldType[jsVarType]
        }
    }


    static getBlocklyTypeFromExprAndVarType(exprType, jsVarType) {

        const jsVarTypeToBlocklyType = {
            "number": "math_number",
            "string": "text",
            "boolean": "logic_boolean",
            "object": "variables_get"
        };

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

        if (exprType === "Literal") {
            return jsVarTypeToBlocklyType[jsVarType]
        } else {
            return exprTypeToBlocklyType[exprType]
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