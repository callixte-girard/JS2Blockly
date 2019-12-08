import React from 'react';
// import Blockly from "node-blockly/browser";
import Blockly from 'blockly';
import jsx2str from 'jsx-to-string';

import {EsprimaToXml} from "./EsprimaToXml";

import {convertJsxArrayIntoStringArray} from "../../static/methods";
import {line, star} from "../../static/constants";


export class MainLogic extends React.Component {


    static nextifyXmlStatementListIntoSingleBlock(statements) {

        for (let i = statements.length - 1; i > 0; i--) {
            let jsx_cur = statements[i];
            let jsx_prev = statements[i - 1];
            // console.log("jsx_str_cur" + i + ":", jsx2str(jsx_cur));
            // console.log("jsx_str_prev" + i + ":", jsx2str(jsx_prev));

            // // now insert nextified cur at the good place index in prev
            // 1) get back previous block type
            const blocklyType = jsx_prev.props.type;
            const blockChildren = jsx_prev.props.children;
            // console.log("test_blocklyType", blocklyType);
            // console.log("test_blockChildren", convertJsxArrayIntoStringArray(blockChildren));
            // 2) create again prev block with nextified current block
            jsx_prev = <block type={blocklyType}>{
                    blockChildren
                }<next>{
                    jsx_cur
                }</next>
            }</block>
            // 3) insert result back into the array
            // console.log("insertion done:", jsx2str(jsx_prev));
            statements[i - 1] = jsx_prev;
            console.log(line);
        }
        return statements[0]
    }


    static generateBlocksFromParsedContent(parsedContent) {

        const xml_main = <xml xmlns='http://www.w3.org/1999/xhtml'>{
            // this.insertNextTagsIntoStatementList_new( // returns a single JSX
                EsprimaToXml.parseListStatements(parsedContent)
            // )
        }</xml>;

        // debug it stringified and return it as jsx
        console.log(line);
        console.log("xml_main (stringified) :", jsx2str(xml_main));
        return xml_main; // it's still a JSX
    }

}