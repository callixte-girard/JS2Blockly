import React  from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import {ParsedCodeContainer} from './components/ParsedCodeContainer';
import {RawCodeContainer} from './components/RawCodeContainer';
// import {ErrorBoundary} from "./components/ErrorBoundary";


export const line = "--------------------------------------------------------------";

class App extends React.Component {

        render() {
                return (
                    <div style={{
                            // display: 'inline-block'
                    }}>

                            <script src="blockly_compressed.js"></script>
                            <script src="blocks_compressed.js"></script>

                            <h1>HEY GUYS :)</h1>

                            <div>
                                    <RawCodeContainer exampleCode="
                                                let pipou = 5;
                                                const papou = 8;
                                                console.log(papou - pipou);
                                    ">
                                    </RawCodeContainer>


                                    <ParsedCodeContainer>
                                    </ParsedCodeContainer>
                            </div>


                    </div>
                )
        }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
