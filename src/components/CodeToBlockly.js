import React from 'react';
import ReactDOMServer from "react-dom/server";
import {MiscFunctions} from "../functions/MiscFunctions";
import {StatementParse} from "./StatementParse";


export class CodeToBlockly extends React.Component {


    static insertNextTagsIntoXmlBody(xmlBody) {

        for (let i = xmlBody.length - 1; i > 0; i--) {

            let jsx_str_cur = xmlBody[i];
            console.log("jsx_str_cur" + i + ":", jsx_str_cur);

            let jsx_str_prev = xmlBody[i - 1];
            console.log("jsx_str_prev" + i + ":", jsx_str_prev);

            jsx_str_cur = "<next>" + jsx_str_cur + "</next>";
            // console.log("with next inserted:", jsx_str_cur);

            // now insert nextified cur at the good place index in prev
            let insert_index = jsx_str_prev.lastIndexOf("</block>");
            console.log("insert at index:", insert_index);
            
            jsx_str_prev =
                jsx_str_prev.substring(0, insert_index)
                + jsx_str_cur +
                jsx_str_prev.substring(insert_index);
            console.log("insertion done:", jsx_str_prev);

            // re-insert prev into array
            xmlBody[i - 1] = jsx_str_prev;
            MiscFunctions.dispLine();
        }

        return xmlBody[0]
    }

    static buildBlockXml(blockType, children) {

        let xml_block =
            <block type={blockType}>
                {children}
            </block>;

        // console.log(ReactDOMServer.renderToStaticMarkup(xml_block))
        return xml_block
    }

    static buildFieldXml(fieldType, fieldValue) {

        let xml_field =
            <field name={fieldType} variabletype="">
                {fieldValue}
            </field>

        // console.log(ReactDOMServer.renderToStaticMarkup(xml_field))
        return xml_field
    }

    static buildValueXml(name, children) {

        let xml_value =
            <value name={name}>
                {children}
            </value>

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
        // console.log(ReactDOMServer.renderToStaticMarkup(xml_arr[0]))
        return xml_arr;
    }


    static generateBlocksFromParsedContent(parsedContent) {

        const xml_head = "<xml xmlns='http://www.w3.org/1999/xhtml'>";
        const xml_tail = "</xml>";
        const xml_middle =
            this.insertNextTagsIntoXmlBody( // returns: one string with all next tags in place
                MiscFunctions.convertJsxArrayIntoStringArray( // returns: string Array
                    this.buildBodyXmlFromParsedContent(parsedContent) // returns: JSX Array
                )
            );

        const xml_main = xml_head + xml_middle + xml_tail;
        MiscFunctions.dispLine();
        console.log(("xml_main:", xml_main));
        return (xml_main); // it's a string now
    }

}