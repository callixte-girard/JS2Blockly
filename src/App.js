import React  from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser';

import './App.css';

import {CodeToBlock} from './static/CodeToBlock.js';

import './pipou.js';

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

        // go to the method to play around :)
        CodeToBlock.playAroundWithBlocks(workspace);

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
