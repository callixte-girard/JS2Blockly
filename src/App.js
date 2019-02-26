import React  from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import {ParsedCodeContainer} from './components/ParsedCodeContainer';
import {RawCodeContainer} from "./components/RawCodeContainer";

class App extends React.Component {

    /////
}

ReactDOM.render(

    <div>
        <h1>HEY GUYS :)</h1>


        <RawCodeContainer>

        </RawCodeContainer>


        <ParsedCodeContainer message="var pipou = 5;">

        </ParsedCodeContainer>
    </div>,

    document.getElementById('app')
);

export default App;
