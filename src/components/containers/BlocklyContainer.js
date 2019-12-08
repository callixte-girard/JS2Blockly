import React from 'react';
import Blockly from "blockly";

import {style_dark} from '../../static/constants';


export class BlocklyContainer extends React.Component {


    updateBlocksFromXml(xml_str) {
        Blockly.getMainWorkspace().clear();

        try {
            Blockly.Xml.appendDomToWorkspace(
                Blockly.Xml.textToDom(
                    xml_str
                    // jsx2str(xml_str) // SHOULD NOT BE USED, must be converted before
                ),
                Blockly.getMainWorkspace()
            );
        } catch {}
    }

    componentWillUpdate(prevProps, prevState, snapshot) {
        this.updateBlocksFromXml(prevProps.xmlContent);
    }

    render() {
        return (
            <div id="blocklyDiv"
                style={style_dark} // why don't you fucking work with colors ???
            ></div>
        );
    }

}