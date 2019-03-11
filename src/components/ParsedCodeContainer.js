import React from 'react';


export class ParsedCodeContainer extends React.Component {

    render() {

        console.log(this.props);

        return (
            <div id="blocklyDiv" style={{
                height: 500,
                width: 500,
                // position: 'absolute',
                // right: 40,
                border: "1px solid black",
                display: 'inline-block',
                // margin: 40
            }}>
            </div>
        );
    }

}