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

        // III - MATH (14)
        //////////////////////////////////
        //('math_number')
        //('math_arithmetic')
        //('math_single')
        //('math_trig')
        //('math_constant')
        //('math_number_property')
        //('math_change')
        //('math_round')
        //('math_on_list')
        //('math_modulo')
        //('math_constrain')
        //('math_random_int')
        //('math_random_float')
        //('math_atan2') // c'est juste tangente lol

        // IV - TEXT (9)
        //////////////////////////////////
        //('text')
        //('text_join')
        //('text_create_join_container')
        //('text_create_join_item')
        //('text_append')
        //('text_length')
        //('text_isEmpty')
        //('text_indexOf')
        //('text_charAt')

        // V - LISTS (5)
        //////////////////////////////////
        //('lists_create_empty')
        //('lists_repeat')
        //('lists_reverse')
        //('lists_isEmpty')
        //('lists_length')

        // VI - COLOURS (4)
        //////////////////////////////////
        //('colour_picker')
        //('colour_random')
        //('colour_rgb')
        //('colour_blend')

        // A - VARIABLES (2)
        //////////////////////////////////
        //('variables_get');
        //('variables_set');

        // B - FUNCTIONS (???)
        //////////////////////////////////
        //blablablabelibelou

        // this.demoBlock(workspace)

        // !!!!!!!!!!!!!!!!!!!!!!!!! README VERY IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // You must do the following treatment to the raw XML dump in order to make it work :
        // 1) take the line you want and copy it into a variable like pipou below
        // 2) replace the " by ' (you can use ctrl/cmd + R)
        // 3) add " before and after the end of the xml variable
        // 4) pipou is now treated as regular string and not JSX. It is now parsable.

        const pipou = (
            "<xml><block type='variables_set' x='184' y='77'><field name='VAR' id='jkHF+$l3z=zq+l//Jq/!' variabletype=''>x</field><value name='VALUE'><block type='math_number' id='~H$RX[NeuC)$jKrGs]:z'><field name='NUM'>17</field></block></value><next><block type='show_number' ><value name='NAME'><block type='variables_get'><field name='VAR' variabletype=''>x</field></block></value></block></next></block></xml>"
        )

        this.xmlToWorkspace(pipou, workspace)

    }


    static xmlToWorkspace(xml, workspace) {

        Blockly.Xml.appendDomToWorkspace(
            Blockly.Xml.textToDom(xml),
            workspace
        )
    }

    //
    // static demoBlock(workspace) {
    //
    //     //////////////////////////////////////// which  one to test ?
    //     const block_forEach = workspace.newBlock('controls_forEach');
    //     let test_block = block_forEach;
    //
    //     // GENERAL
    //     test_block.initSvg();
    //     test_block.render();
    //     test_block.setColour(100);
    //     test_block.setCollapsed(false);
    //     // test_block.centerBlock();
    //     // test_block.setCommentText("here is da comment");
    //     // test_block.setParent(parent);
    //
    //     // SPECIFIC text_print
    //     // test_block.setFieldValue("pipou");
    // }


}