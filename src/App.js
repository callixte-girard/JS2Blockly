import React  from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser';

import './App.css';

// import {CodeToBlock} from './components/CodeToBlock.js';
import {BlocklyContainer} from './components/BlocklyContainer';
import {CodeContainer} from './components/CodeContainer';
import {MainContainer} from "./components/MainContainer";

export const line = "--------------------------------------------------------------";


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

                <MainContainer className={"pipou"}/>

            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
