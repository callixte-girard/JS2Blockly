import React from 'react';

import {MiscFunctions} from "../../functions/MiscFunctions";
import {EsprimaToXml} from "./EsprimaToXml";


export class MainLogic extends React.Component {


    static insertNextTagsIntoXmlBody(xmlBody) {

        for (let i = xmlBody.length - 1; i > 0; i--)
        {
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


    static generateBlocksFromParsedContent(parsedContent) {

        const xml_head = "<xml xmlns='http://www.w3.org/1999/xhtml'>";
        const xml_tail = "</xml>";
        const xml_middle =
            this.insertNextTagsIntoXmlBody( // returns: one string with all next tags in place
                MiscFunctions.convertJsxArrayIntoStringArray( // returns: string Array
                    EsprimaToXml.processListStatements(parsedContent)
                )
            );
        const xml_main = xml_head + xml_middle + xml_tail;
        MiscFunctions.dispLine();
        console.log("xml_main:", xml_main);
        return (xml_main); // it's a string now
    }

}