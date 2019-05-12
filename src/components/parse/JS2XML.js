import React from 'react';
import ReactDOMServer from "react-dom/server";
import {MiscFunctions} from "../../functions/MiscFunctions";


export class JS2XML extends React.Component {


    static processListStatements(statements) {

        let xml_out = [];
        for (let i=0 ; i < statements.length ; i++) {

            const statementListItem = statements[i];
            const statementType = statementListItem['type'];

            if (statementType.includes('Statement')) { // this excludes ExpressionStatements.
            // ### I - STATEMENTS
                console.log("statementType:", statementType);

                if (statementType === 'ExpressionStatement') {
                // ## Ia - EXPRESSION STATEMENTS
                    // # 1) get the expr
                    const expression = statementListItem['expression'];
                    // # 2) parse it like an expression lol
                    this.processExpression(expression);
                } else {

                // ## Ib - IF, FOR, WHILE STATEMENTS
                    // # 1) parse recursively the headers expressions
                    const attrName_condition = 'test';
                    // recursively analyse expression in test
                    const statementCondition = statementListItem[attrName_condition];
                    console.log("statementCondition:", statementCondition);

                    this.processExpression(statementCondition);

                    // # 2) parse recursively body of the statement (FIRST ? or LAST ?)
                    // determine name of the body attribute
                    let attrName_body ;
                    if (statementType === 'IfStatement')
                        attrName_body = 'consequent';
                    else if (statementType === 'ForStatement' || statementType === 'WhileStatement')
                        attrName_body = 'body';
                    // recursively analyse statements of the body
                    const statementChildren = statementListItem[attrName_body]['body'];
                    console.log("statementChildren:", statementChildren);

                    this.processListStatements(statementChildren);
                }

            } else if (statementType.includes('Declaration')) {
            // ### II - DECLARATIONS


            }
            MiscFunctions.dispLine();
        }
        return xml_out
    }


    static processExpression(expression) {

        const expressionType = expression['type'];
        const expressionOperator = expression['operator'];
        console.log("expressionType:", expressionType);
        console.log("expressionOperator:", expressionOperator);

        let expressionArguments;
        if (expressionType === 'UnaryExpression'
                || expressionType === 'UpdateExpression') {
            // we take this one for every kind of negation.
            // we'll create a special negate block for arithmetic later.
            expressionArguments = [ expression['argument'] ];

        } else if (expressionType === 'LogicalExpression'
                || expressionType === 'BinaryExpression'
                || expressionType === 'AssignmentExpression') {
            // two members : left and right
            expressionArguments = [ expression['left'] , expression['right'] ];
        }

        // then parse it recursively (or not)
        for (let i=0 ; i < expressionArguments.length ; i++) {
            const expressionArgument = expressionArguments[i];
            console.log("expressionArgument" + i.toString() + ":", expressionArgument);

            if (expressionArgument['type'].includes('Expression'))
                this.processExpression(expressionArgument);
            else
                this.processEndExpression(expressionArgument);
        }
        MiscFunctions.dispLine();
    }


    static processEndExpression(endExpression) {

        const endExpression_type = endExpression['type'];

        let endExpression_val;
        if (endExpression_type === 'Literal')
            endExpression_val = endExpression['value'];
        else if (endExpression_type === 'Identifier')
            endExpression_val = endExpression['name'];

        console.log("endExpression:", endExpression_type, endExpression_val, typeof endExpression_type);
        // console.log("endExpression_type:", endExpression_type);
        // console.log("endExpression_val:", endExpression_val);
        // console.log("endExpr_valType:", typeof endExpression_val);
    }
}