import React from 'react';

import {MiscFunctions} from "../../functions/MiscFunctions";
import {ParseEsprimaLogic} from "./ParseEsprimaLogic";


export class BuildXMLBlocks extends React.Component {


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