import React from 'react';

import Blockly from 'node-blockly/browser';


const esprima = require('esprima');


export class CodeToBlock {


    static lexicalAnalysis(codeRaw) {

        // console.log("codeRaw: " , codeRaw);

        try {
            let codeParsed = esprima.tokenize(codeRaw);
            console.log("codeParsed: " , codeParsed);

            for (let i=0 ; i < codeParsed.length ; i++) {

                let word = codeParsed[i];
                // console.log(word);
            }

        } catch {



            console.log("codeParsed: " , "!ERROR TO HANDLE!");
        }

        console.log("------------------------------------");
    }



    static playAroundWithBlocks(workspace) {

        // #########################################################
        // ##### OKAY HERE ARE ALL THE USABLE BLOCKS IN XML/JS :
        // ##########################################################

        // I - LOGIC (8)
        //////////////////////////////////
        //('logic_boolean');
        //('controls_if');
        //('controls_ifelse');
        //('logic_compare');
        //('logic_operation');
        //('logic_negate');
        //('logic_null');
        //('logic_ternary');

        // II - LOOPS (6)
        //////////////////////////////////
        //('controls_repeat_ext');
        //('controls_repeat');
        //('controls_whileUntil');
        //('controls_for');
        //('controls_forEach');
        //('controls_flow_statements');

        // A - VARIABLES (2)
        //////////////////////////////////
        //('variables_get');
        //('variables_set');

        // B - FUNCTIONS (
        //('


        var pipou = (
            <xml xmlns="http://www.w3.org/1999/xhtml">
                <block type="controls_if" id="/VUw+-Jdf%}%N|S0ui(]" x="116" y="63">
                    <value name="IF0">
                        <block type="logic_compare" id="nU*SI?Ri3wrHvSO%]4J9">
                            <field name="OP">LT</field>
                            <value name="A">
                                <block type="math_number" id="+3i/e+)TKB*-f$j@1we{">
                                    <field name="NUM">0</field>
                                </block>
                            </value>
                            <value name="B">
                                <block type="math_number" id="8:3_k-i`}c)R4%#wiLOq">
                                    <field name="NUM">4</field>
                                </block>
                            </value>
                        </block>
                    </value>
                    <statement name="DO0">
                        <block type="show_icon" id="=j2L@^+J/lFn{6BaD9nd">
                            <field name="ICON">HEART</field>
                        </block>
                    </statement>
                </block>
            </xml>
        )

        this.loadXmlToWorkspace(pipou, workspace)

    }


    static loadXmlToWorkspace(wholexml, workspace) {

        // Cette fonction prend en entrée un XML et utilise 2 fonctions de Blockly
        // textToDom -> qui prend un input au format texte (pour nous XML) et qui le
        // transforme en DOM
        // domToWorkspace -> qui prend le DOM et insère les blocs dans le workspace


        let blockEvent

        if (wholexml == null)

            return;

        blockEvent +=1;

        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(wholexml), workspace);

    }


    static demoBlock(workspace) {

        //////////////////////////////////////// which  one to test ?
        // const block_forEach = workspace.newBlock('controls_forEach');
        // let test_block = block_forEach;

        // GENERAL
        // test_block.initSvg();
        // test_block.render();
        // test_block.setColour(100);
        // test_block.setCollapsed(false);
        // test_block.centerBlock();
        // test_block.setCommentText("here is da comment");
        // test_block.setParent(parent);

        // SPECIFIC text_print
        // test_block.setFieldValue("pipou");
    }


}