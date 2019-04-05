import React from 'react';
import ReactDOMServer from "react-dom/server";
import {MiscFunctions} from "../functions/MiscFunctions";
import {StatementParse} from "./StatementParse";

export class CodeToBlockly extends React.Component {


    static buildBlockXmlFromBlocklyType(blockType, children, x, y) {

        let xml_block =
            <block
                type={blockType}
                id={MiscFunctions.getRandomInt(100)}
                x={MiscFunctions.getRandomInt(5 * x)}
                y={MiscFunctions.getRandomInt(5 * y)}
            >{children}</block>

        console.log(ReactDOMServer.renderToStaticMarkup(xml_block))
        return xml_block
    }


    static buildBodyXmlFromParsedContent(parsedContent) {

        let xml_full = [];
        for (let i=0 ; i<parsedContent.length ; i++) {

            let statement = parsedContent[i];
            // let statementType = parsedContent[i].type;
            // let blocklyType = this.getBlocklyTypeFromStatementType(statementType);
            // console.log(statementType, blocklyType)

            // little fix to add : must parse one more than just parent
            let xml_sublist = StatementParse.getXmlFromStatement(statement)

            for (let xml_index=0 ; xml_index < xml_sublist.length ; xml_index ++) {
                xml_full.push(
                    xml_sublist[xml_index]
                    // this.buildBlockXmlFromBlocklyType(blocklyType, null, 50,50 * (1 + i))
                );
            }
        }
        // console.log(ReactDOMServer.renderToStaticMarkup(xml_full[0]))
        return xml_full;
    }


    static generateBlocksFromParsedContent(parsedContent) {

        let xml_main =
            <xml xmlns='http://www.w3.org/1999/xhtml'>
                <variables></variables>
                {this.buildBodyXmlFromParsedContent(parsedContent)}
            </xml>

        MiscFunctions.dispLine()
        console.log(ReactDOMServer.renderToStaticMarkup(xml_main))
        return (xml_main)
    }

}