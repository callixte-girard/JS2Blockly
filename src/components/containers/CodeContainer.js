import React from 'react';

import {style_dark} from '../../static/constants';


export class CodeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.exampleCode = "put your js code here..."
    }

    render() {
        return (
            <textarea
                style={style_dark}
                // rows and cols don't work if they're overridden by height and width (in style_dark)
                // rows="38"
                // cols="80"
                placeholder={this.exampleCode}
                onChange={this.props.updateCode}
            ></textarea>
        );
    }

}