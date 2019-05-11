import React from 'react';
import ReactDOMServer from "react-dom/server";
import {MiscFunctions} from "../../functions/MiscFunctions";


export class JS2XML extends React.Component {

    static processListStatements(statements) {

        let xml_out = [];
        MiscFunctions.dispLine();

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

                console.log("statementType:", statementType);
                console.log("statementCondition:", statementCondition);
                console.log("statementChildren:", statementChildren);

            } else if (statementType.includes('Declaration')) {
            // ### II - DECLARATIONS


            }
        }
        return xml_out
    }


    static processExpression(expression) {
        // @TO-DO
    }
}