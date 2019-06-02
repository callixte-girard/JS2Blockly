import React from 'react';

import {MiscFunctions} from "../../functions/MiscFunctions";
import {EsprimaToXml} from "./EsprimaToXml";


export class MainLogic extends React.Component {


    static insertNextTagsIntoStatementList(statements) {

        for (let i = statements.length - 1; i > 0; i--) {
            let jsx_str_cur = statements[i];
            // console.log("jsx_str_cur" + i + ":", jsx_str_cur);
            let jsx_str_prev = statements[i - 1];
            // console.log("jsx_str_prev" + i + ":", jsx_str_prev);
            jsx_str_cur = "<next>" + jsx_str_cur + "</next>";
            // console.log("with next inserted:", jsx_str_cur);

            // now insert nextified cur at the good place index in prev
            let insert_index = jsx_str_prev.lastIndexOf("</block>");
            // console.log("insert at index:", insert_index);
            jsx_str_prev =
                jsx_str_prev.substring(0, insert_index)
                + jsx_str_cur +
                jsx_str_prev.substring(insert_index);
            // console.log("insertion done:", jsx_str_prev);

            // re-insert prev into array
            statements[i - 1] = jsx_str_prev;
            MiscFunctions.dispLine();
        }

        return statements[0]
    }


    static insertNextTagsIntoStatementList_new(statements) {
        // new name : nextifyStatementList

        for (let i = statements.length - 1; i > 0; i--) {
            let jsx_str_cur = statements[i];
            // console.log("jsx_str_cur" + i + ":", jsx_str_cur);
            let jsx_str_prev = statements[i - 1];
            // console.log("jsx_str_prev" + i + ":", jsx_str_prev);
            jsx_str_cur = "<next>" + jsx_str_cur + "</next>";
            // console.log("with next inserted:", jsx_str_cur);

            // now insert nextified cur at the good place index in prev
            let insert_index = jsx_str_prev.lastIndexOf("</block>");
            // console.log("insert at index:", insert_index);
            jsx_str_prev =
                jsx_str_prev.substring(0, insert_index)
                + jsx_str_cur +
                jsx_str_prev.substring(insert_index);
            // console.log("insertion done:", jsx_str_prev);

            // re-insert prev into array
            statements[i - 1] = jsx_str_prev;
            MiscFunctions.dispLine();
        }

        return statements
    }


    static generateBlocksFromParsedContent_new(parsedContent) {

        const xml_main = <xml xmlns='http://www.w3.org/1999/xhtml'>{
            this.insertNextTagsIntoStatementList_new( // returns a single JSX with nested children in <next></next>.
                EsprimaToXml.parseListStatements(parsedContent)
            )
        }</xml>;

        MiscFunctions.dispLine();
        console.log("xml_main (stringified) :", xml_main);
        return (xml_main); // it's a string now
    }


    static generateBlocksFromParsedContent(parsedContent) {

        const xml_head = "<xml xmlns='http://www.w3.org/1999/xhtml'>";
        const xml_tail = "</xml>";
        const xml_middle =
            this.insertNextTagsIntoStatementList( // returns: one string with all next tags in place
                MiscFunctions.convertJsxArrayIntoStringArray( // returns: string Array
                    EsprimaToXml.parseListStatements(parsedContent) // returns : JSX array
                )
            );
        const xml_main = xml_head + xml_middle + xml_tail;

        MiscFunctions.dispLine();
        console.log("xml_main:", xml_main);
        return (xml_main); // it's a string now
    }
}