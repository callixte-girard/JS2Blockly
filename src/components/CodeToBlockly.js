import React from 'react';
import ReactDOMServer from "react-dom/server";
import {MiscFunctions} from "../functions/MiscFunctions";
import {StatementParse} from "./StatementParse";


const init_program = 0;
const distance_between_consecutive_blocks = /*26*/ 52 ;
let program_advance;

export class CodeToBlockly extends React.Component {


    static insertNextTagsIntoXmlBody(xmlBody) {

        for (let i=0 ; i < xmlBody.length - 1 ; i++) {

            const jsx_current = xmlBody[i];
            const jsx_next = xmlBody[i+1];

            const str_current = ReactDOMServer.renderToStaticMarkup(jsx_current);
            const str_next = ReactDOMServer.renderToStaticMarkup(jsx_next);



            console.log("JSX_CURRENT -->", str_current);
            console.log("JSX_NEXT -->", str_next);

            // let new_jsx =
        }

        return xmlBody
    }

    static buildBlockXml(blockType, children) {

        program_advance ++ ; // to incr counter

        let xml_block =
            <block
                type={blockType}
                // id={MiscFunctions.getRandomInt(100)}
                x={0}
                y={distance_between_consecutive_blocks * (program_advance - 1) }
            >{children}</block>;

        // console.log(ReactDOMServer.renderToStaticMarkup(xml_block))
        return xml_block
    }

    static buildFieldXml(fieldType, fieldValue) {

        let xml_field =
            <field
                name={fieldType}
                variabletype=""
                x={1}
                y={program_advance}
            >{fieldValue}</field>

        // console.log(ReactDOMServer.renderToStaticMarkup(xml_field))
        return xml_field
    }

    static buildValueXml(name, children) {

        let xml_value =
            <value name={name}>{children}</value>

        return xml_value
    }

    static buildBodyXmlFromParsedContent(parsedContent) {

        let xml_arr = [];
        // then add all things
        for (let i=0 ; i<parsedContent.length ; i++) {

            let statement = parsedContent[i];
            // let statementType = parsedContent[i].type;
            // let blocklyType = this.getBlocklyTypeFromStatType(statementType);
            // console.log(statementType, blocklyType)

            // little fix to add : must parse one more than just parent
            let xml_sublist = StatementParse.getXmlFromStatement(statement);

            for (let xml_index=0 ; xml_index < xml_sublist.length ; xml_index ++)
            {
                let xml_to_insert = xml_sublist[xml_index];

                // console.log(ReactDOMServer.renderToStaticMarkup(xml_to_insert));
                xml_arr.push(xml_to_insert);
            }
        }
        // console.log(ReactDOMServer.renderToStaticMarkup(xml_full[0]))
        return xml_arr;
    }


    static generateBlocksFromParsedContent(parsedContent) {

        program_advance = init_program;

        let xml_main =
            <xml xmlns='http://www.w3.org/1999/xhtml'>
                <variables>{
                    // this.buildVariablesXml(varId)
                }</variables>{
                    this.insertNextTagsIntoXmlBody(
                        this.buildBodyXmlFromParsedContent(parsedContent)
                    )


                }
            </xml>

        MiscFunctions.dispLine();
        console.log(ReactDOMServer.renderToStaticMarkup(xml_main));
        return (xml_main);
    }

}