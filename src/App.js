import React  from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser';

import './App.css';
// import {pipouStyle} from './misc/';
// import './DottedBox.css';

import {CodeToBlock} from './components/CodeToBlock.js';
import {ParsedCodeContainer} from './components/ParsedCodeContainer';
import {RawCodeContainer} from './components/RawCodeContainer';
// import {ErrorBoundary} from "./components/ErrorBoundary";

export const line = "--------------------------------------------------------------";


/////////////////////////////////////////////////////////////////////////////////////
////////////////// !!! README !!! ///////////////////////////////////////////////////
// blocks can be tested at : https://developers.google.com/blockly/
// feel free to test them if you're not sure what the variables represent :)

class App extends React.Component {

    componentDidMount() {

        Blockly.inject('blocklyDiv', {
                // toolbox: document.getElementById('toolbox') // comment this line to inject no toolbox
        });
    }


    render() {
        return (
            <div className={"main"}>
                <div className={"header"}>
                    <h1>HEY GUYS :)</h1>
                    <h4>Enjoy visualising horrible code with this fantastic app ;)</h4>
                </div>

                <div className={"pipou"}>
                    <RawCodeContainer exampleCode="
                                let pipou = 5;
                                const papou = 8;
                                console.log(papou - pipou);">
                    </RawCodeContainer>


                    <ParsedCodeContainer>
                    </ParsedCodeContainer>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
