import React  from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser';

import './App.css';
import './pipou.js';

import './myCustomBlocks/block_test'; // contains all custom blocks to edit is json

import {ParsedCodeContainer} from './components/ParsedCodeContainer';
import {RawCodeContainer} from './components/RawCodeContainer';
// import {ErrorBoundary} from "./components/ErrorBoundary";

export const line = "--------------------------------------------------------------";

export const style = {
    display: 'inline-block',
    margin: 40
};

/////////////////////////////////////////////////////////////////////////////////////
////////////////// !!! README !!! ///////////////////////////////////////////////////
// blocks can be tested at : https://developers.google.com/blockly/
// feel free to test them if you're not sure what the variables represent :)

class App extends React.Component {

    componentDidMount() {

        const workspace = Blockly.inject('blocklyDiv', {
                // toolbox: document.getElementById('toolbox') // comment this line to inject no toolbox
            });

        // yeeeah these lines do generate a block but it needs customisation.
        // let test_block = workspace.newBlock('text_print');
        // let test_block = workspace.newBlock('logic_boolean');
        // let test_block = workspace.newBlock('colour_rgb');
        // let test_block = workspace.newBlock('lists_repeat');
        // let test_block = workspace.newBlock('pipou');

        // I - LOGIC (8)
        //////////////////////////////////
        const block_bool = workspace.newBlock('logic_boolean');
        const block_if = workspace.newBlock('controls_if');
        const block_ifelse = workspace.newBlock('controls_ifelse');
        const block_compare = workspace.newBlock('logic_compare');
        const block_operation = workspace.newBlock('logic_operation');
        const block_negate = workspace.newBlock('logic_negate');
        const block_null = workspace.newBlock('logic_null');
        const block_ternary = workspace.newBlock('logic_ternary');
        // workspace.centerBlock(test_block);

        // II - LOOPS (6)
        //////////////////////////////////
        const block_repeat_ext = workspace.newBlock('controls_repeat_ext');
        const block_repeat = workspace.newBlock('controls_repeat');
        const block_whileUntil = workspace.newBlock('controls_whileUntil');
        const block_for = workspace.newBlock('controls_for');
        const block_forEach = workspace.newBlock('controls_forEach');
        const block_flow_statement = workspace.newBlock('controls_flow_statements');

        // III - VARIABLES (2)
        //////////////////////////////////
        const block_variables_get = workspace.newBlock('variables_get');
        const block_variables_set = workspace.newBlock('variables_set');

        //////////////////////////////////////// which one to test ?
        let test_block = block_ternary;

        // GENERAL
        test_block.initSvg();
        test_block.render();
        test_block.setColour(100);
        test_block.setCollapsed(false);
        // test_block.centerBlock();
        // test_block.setCommentText("here is da comment");
        // test_block.setParent(parent);

        // SPECIFIC text_print
        // test_block.setFieldValue("pipou");


    }

    render() {
        return (
            <div style={style}>

                    <h1>HEY GUYS :)</h1>
                    <h4>Enjoy visualising horrible code with this fantastic app ;)</h4>

                    <RawCodeContainer exampleCode="
                                let pipou = 5;
                                const papou = 8;
                                console.log(papou - pipou);">
                    </RawCodeContainer>


                    <ParsedCodeContainer>
                    </ParsedCodeContainer>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
