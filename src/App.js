import React  from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser';

import './App.css';
import './pipou.js';

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
                const workspace = Blockly.inject(
                    'blocklyDiv', { toolbox: document.getElementById('toolbox') }
                    );
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
                )
        }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
