import React  from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser';

import './App.css';

import {CodeToBlock} from './components/CodeToBlock.js';
import {ParsedCodeContainer} from './components/ParsedCodeContainer';
import {RawCodeContainer} from './components/RawCodeContainer';
import {MainCodeContainer} from "./components/MainCodeContainer";

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

                <MainCodeContainer className={"pipou"}/>

            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
