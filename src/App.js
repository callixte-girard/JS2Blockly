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

class App extends React.Component {

    componentDidMount() {

        const workspace = Blockly.inject('blocklyDiv', {
                // toolbox: document.getElementById('toolbox') // comment this line to inject no toolbox
            });

        // use blockly .js blocks


        // yeeeah these lines do generate a block but it needs customisation.
        // let test_block = workspace.newBlock('text_print');
        // let test_block = workspace.newBlock('logic_boolean');
        // let test_block = workspace.newBlock('colour_rgb');
        // let test_block = workspace.newBlock('lists_repeat');
        let test_block = workspace.newBlock('pipou');

        // GENERAL
        test_block.initSvg();
        test_block.render();
        test_block.setColour(20);
        test_block.setCollapsed(false);
        // test_block.setCommentText("here is da comment");
        // test_block.setParent(parent);

        // SPECIFIC text_print
        // test_block.setFieldValue("pipou");


    }

    render() {
        return (
            <div style={style}>

                    <h1>HEY GUYS :)</h1>
                    <h5>Have fun with this fantastic app.</h5>

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
