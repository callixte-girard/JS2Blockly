import React from 'react';
import ReactDOM from 'react-dom';



export class ParsedCodeContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props);

        return (
          <p id="code-parsed"
              rows="20"
              cols="80"
          ></p>
        );
    }

}