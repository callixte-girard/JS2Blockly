import React from 'react';

import {MiscFunctions} from "../../functions/MiscFunctions";
import {BlockLogic} from "./BlockLogic";


export class EsprimaToXml extends React.Component {


    static processListStatements(statements) {
        let xml_statements = [];

        for (let i=0 ; i < statements.length ; i++)
        {
            const statement = statements[i];
            const statementType = statement['type'];

            // ### I - STATEMENTS
            if (statementType.includes('Statement')) { // this excludes ExpressionStatements.
                console.log("statementType:", statementType);

                let block;
                // ## I - a) EXPRESSION STATEMENTS
                if (statementType === 'ExpressionStatement') {
                    const expression = statement['expression'];
                    const expressionType = expression['type'];
                    const expressionOperator = expression['operator'];

                    if (expressionType === 'AssignmentExpression') {
                        if (expressionOperator === '=')
                        {
                            const variableName = expression['left']; // is a Literal
                            const variableValue = expression['right']; // is an Expression too
                            console.log("variableName" + i.toString() + ":", variableName);
                            console.log("variableValue" + i.toString() + ":", variableValue);

                            // get variable name
                            const varName = variableName['name'];
                            // get variable value (if any)
                            const blockVarValue = this.processExpression(variableValue);
                            // create block like a variable declaration
                            block = BlockLogic.forVariableDeclaration(varName, blockVarValue);
                        }
                        else if (expressionOperator === '+=' || expressionOperator === '-=')
                        {
                            // @TO-DO
                        }

                    } else if (expressionType === 'UpdateExpression') {
                        if (expressionOperator === '++' || expressionOperator === '--')
                        {
                            // @TO-DO
                        }
                    }
                } // ## I - b) IF, FOR, WHILE STATEMENTS
                else {
                    if (statementType === 'IfStatement')
                        block = this.processIfStatement(statement);
                    else if (statementType === 'WhileStatement')
                        block = this.processWhileStatement(statement);
                    else if (statementType === 'ForStatement')
                        block = this.processForStatement(statement);
                }
                // insert statement
                xml_statements.push(block);

            // ### II - DECLARATIONS
            } else if (statementType.includes('Declaration')) {

                if (statementType === 'VariableDeclaration') {
                    const declarations = statement['declarations'];

                    for (let i = 0; i < declarations.length; i++)
                    {
                        let block, varName, blockVarValue;
                        const variableName = declarations[i]['id']; // is an Expression (Literal)
                        const variableValue = declarations[i]['init']; // is an Expression too
                        console.log("variableName" + i.toString() + ":", variableName);
                        console.log("variableValue" + i.toString() + ":", variableValue);

                        // get variable name
                        varName = variableName['name'];
                        // get variable value (if any)
                        try {
                            blockVarValue = this.processExpression(variableValue);
                            block = BlockLogic.forVariableDeclaration(varName, blockVarValue);
                        } catch {
                            block = BlockLogic.forVariableDeclaration(varName);
                        }
                        // insert each declaration
                        xml_statements.push(block);
                    }

                } else if (statementType === 'FunctionDeclaration') {
                    // @TO-DO
                } else if (statementType === 'ClassDeclaration') {
                    ////////
                }
            }
            MiscFunctions.dispLine();
        }
        console.log("xml_out length:", xml_statements.length);
        return xml_statements
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    static processIfStatement(statement) {
        let xml_expression, blocksConditions ;

        /////

        const blockInstructions = this.processIfWhileForStatementInstructions(statement);

        xml_expression = BlockLogic.forIfStatement(
            // blocksConditions,
            // blockInstructions
        );
        return xml_expression
    }

    static processWhileStatement(statement) {
        let xml_expression ;

        const statementCondition = statement['test'];
        console.log("statementCondition:", statementCondition);

        const blockCondition = this.processExpression(statementCondition);
        const blockInstructions = this.processIfWhileForStatementInstructions(statement);

        xml_expression = BlockLogic.forWhileStatement(
            blockCondition,
            blockInstructions
        );
        return xml_expression
    }

    static processForStatement(statement) {
        let xml_expression ;

        // @TO-DO

        xml_expression = BlockLogic.forForStatement(

        );
        return xml_expression
    }

    static processIfWhileForStatementInstructions(statement) {
        let xml_statement ;

        let attrName_body ;
        const statementType = statement['type'];

        if (statementType === 'IfStatement') {
            attrName_body = 'consequent'; // or 'alternate' ! @TO-DO

        } else if (statementType === 'ForStatement' || statementType === 'WhileStatement')
            attrName_body = 'body';

        // recursively analyse statements of the body
        const statementInstructions = statement[attrName_body]['body'];
        console.log("statementInstructions:", statementInstructions);

        xml_statement = this.processListStatements(statementInstructions);
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

        if (expressionType === 'UnaryExpression') {
            // we'll create a special negate block for arithmetic later.
            const expressionArg = hostExpression['argument'];

            const blockArg = this.processExpression(expressionArg);

            xml_expression = BlockLogic.for1ArgExpression(blockArg, expressionOperator);

        } else if (expressionType === 'LogicalExpression'
                || expressionType === 'BinaryExpression') {
            // two members : left and right
            const expressionArgLeft = hostExpression['left'];
            const expressionArgRight = hostExpression['right'];

            const blockArgLeft = this.processExpression(expressionArgLeft);
            const blockArgRight = this.processExpression(expressionArgRight);

            xml_expression = BlockLogic.for2ArgsExpression(blockArgLeft, blockArgRight, expressionOperator);

        } else if (expressionType === 'AssignmentExpression'
                || expressionType === 'UpdateExpression') {
            // these are not real expressions but statements
            console.log("!!! UNEXPECTED SITUATION !!!");
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

        xml_expression = BlockLogic.forEndExpression(endExpression_type, endExpression_val);
        return xml_expression
    }
}