import React from 'react';


export class CodeContainer extends React.Component {

    render() {
        return (
            <textarea id="code-raw"
                      rows="40"
                      cols="60"
                      placeholder={this.props.exampleCode}
                      onChange={this.props.updateCode}
            >
            </textarea>
        );
    }

}