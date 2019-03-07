import React from 'react';

import {style} from '../App.js';

import {CodeToBlock} from '../static/CodeToBlock.js';


export class RawCodeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.exampleCode = props.exampleCode;

        // bindings
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        let inputContent = event.target.value ;
        let index = inputContent.indexOf("/");

        let splitContent = inputContent.split(/\r?\n/);
        console.log("splitInput: " , splitContent);

        this.setState({codeRaw: splitContent});

        // converts code for parsing
        CodeToBlock.lexicalAnalysis(inputContent);

        // warns the other Component to refresh himself.
        // or gives the raw data to another Component that wil ParseCode.
        ///////
    }


    render() {

        return (
            <textarea id="code-raw"
                      style={{style}}
                      rows="40"
                      cols="80"
                      placeholder={this.exampleCode}
                      onChange={this.handleChange}
            >
            </textarea>
        );
    }

}