import React from 'react';

import {style_dark} from '../../static/constants';
import {blank_code, sample_code} from '../../static/constants'; 


export class CodeContainer extends React.Component {

    constructor(props) {
        super(props);

        props.updateCode(); // calls this a first time to visualise sample code !
    }


    render() {
        return (
            <textarea
                style={style_dark}
                // rows and cols don't work if they're overridden by height and width (in style_dark)
                // rows="38"
                // cols="80"
                placeholder={blank_code}
                onChange={this.props.updateCode}
            >
                {sample_code}
            </textarea>
        );
    }

}