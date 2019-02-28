import React from 'react';


export class ParsedCodeContainer extends React.Component {

    render() {

        console.log(this.props);

        return (
            <div id="blocklyDiv" style={{
                height: 600,
                width: 600,
                border: "1px solid black",
                display: "inline-block"
            }}>
            </div>
        );
    }

}