import React from 'react';


export class CodeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.exampleCode = "put your js code here..."
    }

    render() {
        return (
            <textarea id="code-raw"
                      className="code-container"
                      rows="38"
                      cols="76"
                      placeholder={this.exampleCode}
                      onChange={this.props.updateCode}
            ></textarea>
        );
    }

}