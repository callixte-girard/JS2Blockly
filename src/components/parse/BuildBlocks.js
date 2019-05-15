import React from 'react';

import {MiscFunctions} from "../../functions/MiscFunctions";
import {EsprimaToXml} from "./EsprimaToXml";


export class BuildBlocks extends React.Component {


    static forIfStatement(condition, children) { // @TO-DO
        // return <block type="controls_if">

        // </block>
    }

    static forWhileStatement(condition, children) {
        return <block type="controls_whileUntil">
            <field name="MODE">
                WHILE
                {/*UNTIL*/}
            </field>

            <value name="BOOL">
                {condition}
            </value>

            <statement name="DO">
                {children}
            </statement>
        </block>
    }

    static forForStatement(statement) {
        
    }


    static for1ArgExpression(arg, operator) {

    }

    static for2ArgsExpression(left, right, js_op) {
        let blocklyType, blocklyOp;

        blocklyOp = blocklyOpFromJsOp[js_op];
        blocklyType = blocklyExpressionTypeFromJsOp[js_op];
        console.log("blocklyOp:", blocklyOp);
        console.log("blocklyType:", blocklyType);

        return <block type={blocklyType}>
            <value name="A">
                {left}
            </value>

            <value name="B">
                {right}
            </value>

            <field name="OP">
                {blocklyOp}
            </field>
        </block>
    }


    static forEndExpression(exprType, value) {
        let blocklyType, fieldName;

        if (exprType === 'Identifier') {
            blocklyType = 'variables_get';
            fieldName = 'VAR';
        } else /* if (exprType === 'Literal') */ {
            if (value === null) blocklyType = 'logic_null'; // fieldName is null here
            else {
                switch (typeof value) {
                    case 'number':
                        blocklyType = 'math_number';
                        fieldName = 'NUM';
                        break ;
                    case 'string':
                        blocklyType = 'text';
                        fieldName = 'TEXT';
                        break ;
                    case 'boolean':
                        blocklyType = 'logic_boolean';
                        fieldName = 'BOOL';
                        break ;
                }
            }
        }

        let fieldTag = "";
        if (fieldName !== null)
            fieldTag = // the .toString is IMPORTANT and must STAY EXACTLY HERE
                <field name={fieldName}>
                    {value.toString()}
                </field>;

        return <block type={blocklyType}>
            {fieldTag}
        </block>
    }
}


const blocklyOpFromJsOp = {
    // logic_compare
    "===" : "EQ", // added by C
    "==" : "EQ",
    "!==" : "NEQ", // added by C
    "!=" : "NEQ",
    "<" : "LT",
    "<=" : "LTE",
    ">" : "GT",
    ">=" : "GTE",
    // math_arithmetic
    "+" : "ADD",
    "-" : "MINUS",
    "*" : "MULTIPLY",
    "/" : "DIVIDE",
    "**" : "POWER",
    // logic_operation
    "&&" : "AND",
    "||" : "OR",
};

const blocklyExpressionTypeFromJsOp = {
    // logic_compare
    "===" : "logic_compare", // added by C
    "==" : "logic_compare",
    "!==" : "logic_compare", // added by C
    "!=" : "logic_compare",
    "<" : "logic_compare",
    "<=" : "logic_compare",
    ">" : "logic_compare",
    ">=" : "logic_compare",
    // math_arithmetic
    "+" : "math_arithmetic",
    "-" : "math_arithmetic",
    "*" : "math_arithmetic",
    "/" : "math_arithmetic",
    "**" : "math_arithmetic",
    // logic_operation
    "&&" : "logic_operation",
    "||" : "logic_operation",
};
