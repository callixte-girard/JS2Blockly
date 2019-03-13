import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Blockly from 'node-blockly/browser';

const esprima = require('esprima');


export class CodeToBlock extends React.Component {


    static lexicalAnalysis(codeRaw) {

        // console.log("codeRaw: " , codeRaw);

        let codeParsed

        try {
            codeParsed = esprima.tokenize(codeRaw);
            console.log("codeParsed: " , codeParsed);
            console.log("------------------------------------");

            for (let i=0 ; i < codeParsed.length ; i++) {

                // let word = codeParsed[i];
                // console.log(word);
            }

            return codeParsed

        } catch {

            ///////////////////
            console.log("codeParsed: " , "!ERROR TO HANDLE!");
            console.log("------------------------------------");

        }

    }



    static generateXmlFromParsedContent(parsedInput) {

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
        //('math_atan2')

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

        // #########################################################
        // ##### OKAY NOW YOU CAN PLAY AROUND WITH XML :)
        // ##########################################################

        const pipou1 = (
            <xml>
                <block type='variables_set' x="20" y="50">

                    <field name='VAR' variabletype=''>
                        pipou
                    </field>

                    <value name='VALUE'>
                        <block type='math_number' >
                            <field name='NUM'>
                                17
                            </field>
                        </block>
                    </value>



                </block>
            </xml>
        )
        const pipou2 = (
            <xml>
                <block type='variables_set' x="50" y="20">

                    <field name='VAR' variabletype=''>
                        poupi
                    </field>

                    <value name='VALUE'>
                        <block type='math_number' >
                            <field name='NUM'>
                                34
                            </field>
                        </block>
                    </value>

                </block>
            </xml>
        )

        const pipou3 = (
            <xml>
                <block type='variables_set' x="50" y="50">

                    <field name='VAR' variabletype=''>
                        poupapou
                    </field>

                    <value name='VALUE'>
                        <block type='math_number' >
                            <field name='NUM'>
                                51
                            </field>
                        </block>
                    </value>

                </block>
            </xml>
        )

        const num = parsedInput.length

        if (num % 3 === 1) {
            this.jsxToWorkspace(pipou1)
        }
        else if (num % 3 === 2) {
            this.jsxToWorkspace(pipou2)
        }
        else {
            this.jsxToWorkspace(pipou3)
        }
    }


    static jsxToWorkspace(xml_jsx) {
        // this method :
        // - first clears current workspace
        // - takes JSX-like XML
        // - converts it into string
        // - parses it into DOM
        // - renders DOM to workspace

        Blockly.getMainWorkspace().clear()

        const xml_str = ReactDOMServer.renderToStaticMarkup(xml_jsx)
        // console.log(xml_str)

        Blockly.Xml.appendDomToWorkspace(
            Blockly.Xml.textToDom(xml_str),
            Blockly.getMainWorkspace()
        )
    }


    // static demoBlock(workspace) { // old method
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