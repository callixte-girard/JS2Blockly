import React from 'react';
import ReactDOMServer from "react-dom/server";
import {MiscFunctions} from "../../functions/MiscFunctions";


export class JS2XML extends React.Component {

    static processListStatements(statements) {

        let xml_out = [];
        for (let i=0 ; i < statements.length ; i++) {

            const statementListItem = statements[i];
            const statementType = statementListItem['type'];

            if (statementType === 'ExpressionStatement') {
                // considered as valid by esprima but is not properly doable in blockly.
                // so we'll ignore it.
            } else if (statementType.includes('Statement')) { // this excludes ExpressionStatements.
            // ### I - STATEMENTS

                // # 1) parse recursively body of the statement (FIRST ? or LAST ?)
                // determine name of the body attribute
                let attrName_body ;
                if (statementType === 'IfStatement') {
                    attrName_body = 'consequent';
                } else if (statementType === 'ForStatement'
                        || statementType === 'WhileStatement') {
                    attrName_body = 'body';
                }
                // recursively analyse statements of the body
                const statementChildren = statementListItem[attrName_body]['body'];
                this.processListStatements(statementChildren);

                // # 2) parse recursively the headers expressions
                const attrName_condition = 'test';
                // recursively analyse expression in test
                const statementCondition = statementListItem[attrName_condition];
                this.processExpression(statementCondition);

                // debug
                MiscFunctions.dispLine();
                console.log("statementType:", statementType);
                console.log("statementCondition:", statementCondition);
                console.log("statementChildren:", statementChildren);

            } else if (statementType.includes('Declaration')) {
            // ### II - DECLARATIONS

                // # 1)
            }
        }
        return xml_out
    }


    static processExpression(expression) {

        MiscFunctions.dispLine();
        const expressionType = expression['type'];
        const expressionOperator = expression['operator'];
        console.log("expressionType:", expressionType);
        console.log("expressionOperator:", expressionOperator);

        let expressionArguments;
        if (expressionType === 'UnaryExpression') {
            // we take this one for every kind of negation.
            // we'll create a special negate block for arithmetic later.
            expressionArguments = [ expression['argument'] ];

        } else if (expressionType === 'LogicalExpression'
                || expressionType === 'BinaryExpression') {
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
                this.processEndValue(expressionArgument);
        }
    }


    static processEndValue(endValue) {

    }
}