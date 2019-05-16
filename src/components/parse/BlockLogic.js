import React from 'react';


export class BlockLogic extends React.Component {


    static forVariableDeclaration(varName, value) {
        let children, blockVarName, blockValue;

        blockVarName = <field name="VAR">{varName}</field>

        if (value !== undefined) {
            blockValue = <value name="VALUE">{value}</value>;
            children = [ blockVarName, blockValue ];
        } else {
            children = [ blockVarName ];
        }

        return <block type="variables_set">
            {children}
        </block>
    }

    static forIfStatement(conditions, instructions) { // @TO-DO
        let children, nb_elseif, nb_else ;

        // for ()

        return <block type="controls_if">
            <mutation elseif={nb_elseif} else={nb_else}></mutation>
            {children}
        </block>
    }

    static forWhileStatement(conditions, instructions) {
        return <block type="controls_whileUntil">
            <field name="MODE">
                WHILE
                {/*UNTIL*/}
            </field>

            <value name="BOOL">
                {conditions}
            </value>

            <statement name="DO">
                {instructions}
            </statement>
        </block>
    }

    static forForStatement(statement) {
        
    }


    static for1ArgExpression(arg, js_op) {
        let blocklyType;

        blocklyType = blockly1ArgExpressionTypeFromJsOp[js_op];
        console.log("blocklyType:", blocklyType);

        return <block type={blocklyType}>
            <value name="BOOL">
                {arg}
            </value>
        </block>
    }

    static for2ArgsExpression(left, right, js_op) {
        let blocklyType, blocklyOp;

        blocklyOp = blocklyOpFromJsOp[js_op];
        blocklyType = blockly2ArgsExpressionTypeFromJsOp[js_op];
        console.log("blocklyOp:", blocklyOp);
        console.log("blocklyType:", blocklyType);

        if (js_op === "=") {
            const block_assignment = <block type={blocklyType}>

            </block>
            return block_assignment
        } else {
            const block_operation = <block type={blocklyType}>
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
            return block_operation
        }

    }


    static forEndExpression(exprType, value) {
        let blocklyType, fieldName;

        if (exprType === 'Identifier') {
            blocklyType = 'variables_get';
            fieldName = 'VAR';
        } else if (exprType === 'Literal') {
            if (value === null) blocklyType = 'logic_null'; // fieldName is null here
            else {
                switch (typeof value) {
                    // case 'undefined':
                    //     blocklyType = 'logic_null';
                    //     break ;
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

const blockly1ArgExpressionTypeFromJsOp = {
    // logic_negate
    "!" : "logic_negate",
    // math_negate
    // to be added later... ;)
};

const blockly2ArgsExpressionTypeFromJsOp = {
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
