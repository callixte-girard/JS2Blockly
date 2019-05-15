import React from 'react';

import {MiscFunctions} from "../../functions/MiscFunctions";
import {BuildBlocks} from "./BuildBlocks";


export class EsprimaToXml extends React.Component {


    static processListStatements(statements) {

        let xml_statements = [];
        for (let i=0 ; i < statements.length ; i++)
        {
            const statement = statements[i];
            const statementType = statement['type'];

            if (statementType.includes('Statement')) { // this excludes ExpressionStatements.
                // ### I - STATEMENTS
                console.log("statementType:", statementType);

                if (statementType === 'ExpressionStatement') {
                    // ## Ia - EXPRESSION STATEMENTS
                    // !!!! WARNING : creates bugs so we'll ignore it for now.
                    /*
                    // # 1) get the expr
                    const expression = statement['expression'];
                    // # 2) parse it like an expression lol
                    const expressionStatement = this.processExpression(expression);
                    xml_statements.push(expressionStatement);
                    */
                } else {
                    // ## Ib - IF, FOR, WHILE STATEMENTS
                    let block, statementCondition, statementChildren;
                    // # 1) parse recursively the headers expressions
                    statementCondition = this.processIfWhileForStatementCondition(statement);
                    // # 2) parse recursively body of the statement (FIRST ? or LAST ?)
                    statementChildren = this.processIfWhileForStatementChildren(statement);
                    // # 3) parse init and update in ForStatements
                    // not for now. we'll just do If and While Statements for now
                    // # 4) assemble block
                    if (statementType === 'IfStatement')
                        block = BuildBlocks.forIfStatement(statementCondition, statementChildren);
                    else if (statementType === 'WhileStatement')
                        block = BuildBlocks.forWhileStatement(statementCondition, statementChildren);
                    // # 5) add it to xml_statements
                    xml_statements.push(block);
                }

            } else if (statementType.includes('Declaration')) {
                // ### II - DECLARATIONS
                if (statementType === 'VariableDeclaration') {
                    const declarations = statement['declarations'];

                    for (let i = 0; i < declarations.length; i++)
                    {
                        const variableName = declarations[i]['id']['name'];
                        const variableValue = declarations[i]['init']; // is an Expression
                        console.log("variableName" + i.toString() + ":", variableName);
                        // console.log("variableValue" + i.toString() + ":", variableValue);

                        this.processExpression(variableValue);
                        // @children

                        // add EACH corresponding xml to xml_out, with or without children (0, 1 or n)
                    }

                } else if (statementType === 'FunctionDeclaration') {}
            }
            MiscFunctions.dispLine();
        }
        console.log("xml_out length:", xml_statements.length);
        return xml_statements
    }

    static processIfWhileForStatementChildren(statement) {
        let xml_statement ;

        let attrName_body ;
        const statementType = statement['type'];

        if (statementType === 'IfStatement')
            attrName_body = 'consequent';
        else if (statementType === 'ForStatement'
              || statementType === 'WhileStatement')
            attrName_body = 'body';

        // recursively analyse statements of the body
        const statementChildren = statement[attrName_body]['body'];
        console.log("statementChildren:", statementChildren);

        xml_statement = this.processListStatements(statementChildren);
        return xml_statement
    }

    static processIfWhileForStatementCondition(statement) {
        let xml_statement;

        const attrName_condition = 'test';

        // recursively analyse expression in test
        const statementCondition = statement[attrName_condition];
        console.log("statementCondition:", statementCondition);

        xml_statement = this.processExpression(statementCondition);
        return xml_statement
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    static processExpression(expression) {
        let xml_expression ;

        const expressionType = expression['type'];
        if (expressionType.includes('Expression'))
            xml_expression = this.processHostExpression(expression);
        else
            xml_expression = this.processEndExpression(expression);

        return xml_expression
    }

    static processHostExpression(hostExpression) {
        let xml_expression ;

        const expressionType = hostExpression['type'];
        const expressionOperator = hostExpression['operator'];
        console.log("expressionType:", expressionType);
        console.log("expressionOperator:", expressionOperator);

        // let expressionArguments;
        if (expressionType === 'UnaryExpression') {
            // we'll create a special negate block for arithmetic later.
            const expressionArg = hostExpression['argument'];

            const blockArg = this.processExpression(expressionArg);

            xml_expression = BuildBlocks.for1ArgExpression(blockArg, expressionOperator);

        } else if (expressionType === 'LogicalExpression'
                || expressionType === 'BinaryExpression') {
            // two members : left and right
            const expressionArgLeft = hostExpression['left'];
            const expressionArgRight = hostExpression['right'];

            const blockArgLeft = this.processExpression(expressionArgLeft);
            const blockArgRight = this.processExpression(expressionArgRight);

            xml_expression = BuildBlocks.for2ArgsExpression(blockArgLeft, blockArgRight, expressionOperator);

        } else if (expressionType === 'AssignmentExpression'
                || expressionType === 'UpdateExpression') {
            // @TO-DO
        }

        return xml_expression
    }


    static processEndExpression(endExpression) {
        let xml_expression ;

        const endExpression_type = endExpression['type'];
        let endExpression_val, attrName_valueOrName;

        if (endExpression_type === 'Literal')
            attrName_valueOrName = 'value';
        else if (endExpression_type === 'Identifier')
            attrName_valueOrName = 'name';

        endExpression_val = endExpression[attrName_valueOrName];
        console.log("endExpression:", endExpression_type, endExpression_val);

        xml_expression = BuildBlocks.forEndExpression(endExpression_type, endExpression_val);
        return xml_expression
    }
}