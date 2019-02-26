import React  from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import {ParsedCodeContainer} from './components/ParsedCodeContainer';
import {RawCodeContainer} from './components/RawCodeContainer';
import {ErrorBoundary} from "./components/ErrorBoundary";

class App extends React.Component {

    /////
}

ReactDOM.render(

    <ErrorBoundary>
        <h1>HEY GUYS :)</h1>


        <RawCodeContainer>
        </RawCodeContainer>


        <ParsedCodeContainer>
        </ParsedCodeContainer>

    </ErrorBoundary>,

    document.getElementById('app')
);

export default App;
