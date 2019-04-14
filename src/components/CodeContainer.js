import React from 'react';


export class CodeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.exampleCode = "put your js code here..."
    }

    render() {
        return (
            <textarea id="code-raw"
                      rows="37"
                      cols="63"
                      placeholder={this.exampleCode}
                      onChange={this.props.updateCode}
            >
            </textarea>
        );
    }

}