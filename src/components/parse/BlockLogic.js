import React from 'react';


export class BlockLogic extends React.Component {


    static forVariableDeclaration(varName, value) {
        let children, blockVarName, blockValue;

        blockVarName = <field name="VAR">{varName}</field>;

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

    static forVariableUpdate(varName, update) {
        return <block type="math_change">
            <field name="VAR">
                {varName}
            </field>

            <value name="DELTA">
                {update}
            </value>
        </block>
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////


    static forIfStatement(conditions, instructions) {
        let children = [];

        // calculate and add mutation tag
        const nb_elseif = conditions.length - 1;
        const nb_else = instructions.length - conditions.length;
        children.push(
            <mutation
                elseif={nb_elseif}
                else={nb_else}
            ></mutation>
        );

        // analyse conditions and associated instructions
        for (let i=0 ; i < conditions.length ; i++) {
            const blockCondition = conditions[i];
            const blockInstructions = instructions[i];

            children = children.concat([
                <value name={"IF" + i}>{blockCondition}</value>,
                <statement name={"DO" + i}>{blockInstructions}</statement>
            ])
        }

        // try to analyse last else statement
        try {
            children.push(
                <statement name="ELSE">
                    {instructions[conditions.length]}
                </statement>
            );
        } catch {}

        return <block type="controls_if">{children}</block>
    }

    static forWhileStatement(condition, instructions) {
        return <block type="controls_whileUntil">
            <field name="MODE">
                WHILE
                {/*UNTIL*/}
            </field>

            <value name="BOOL">
                {condition}
            </value>

            <statement name="DO">
                {instructions}
            </statement>
        </block>
    }

    static forForStatement(from, to, by, instructions) {
        return <block type="controls_for">
            <value name="FROM">
                {from}
            </value>

            <value name="TO">
                {to}
            </value>

            <value name="BY">
                {by}
            </value>

            <statement name="DO">
                {instructions}
            </statement>
        </block>
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////


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
            return <block type={blocklyType}></block>
        } else {
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
                    default :
                    // case 'undefined':
                    //     blocklyType = 'logic_null';
                    //     break ;
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

////////////////////////////////////////////////////////////////////////////////////////////////

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
