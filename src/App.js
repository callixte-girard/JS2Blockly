import React  from 'react';
import Blockly from 'blockly';

import './App.css';
import {MainContainer} from "./components/containers/MainContainer";


class App extends React.Component {

    componentDidMount() {

        Blockly.inject('blocklyDiv', {
                toolbox: document.getElementById('toolbox') // comment this line to inject no toolbox
        });
    }


    render() {
        return (
            <div className={"main"}>
                <div className={"header"}>
                    <h1>HEY GUYS :)</h1>
                    <h4>Enjoy visualising horribly-indented code with this fantastic app ;)</h4>
                </div>
                <br></br>
                <MainContainer className={"main-container"}/>
            </div>
        );
    }
}

export default App;