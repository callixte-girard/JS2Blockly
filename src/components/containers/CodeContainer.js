import React from 'react';

import {style_dark} from '../../static/constants';
// import {sample_code} from '../../../misc/sample_code'; // TODO replace it


export class CodeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.exampleCode = "test" // TODO replace it
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