import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Blockly from 'node-blockly/browser';

const esprima = require('esprima');

export class CodeToBlock extends React.Component {


    static lexicalAnalysis(codeRaw) {

        // console.log("codeRaw: " , codeRaw);

        let codeParsed

        try {
            codeParsed = esprima.tokenize(codeRaw);

            // Création du tableau contenant les mots parsés par esprima
            for (let i=0 ; i < codeParsed.length ; i++) {

            }

            return codeParsed

        } catch (ex) {

        }

    }


    static syntaxicAnalysis(codeRaw) {

        // console.log("codeRaw: " , codeRaw);

        let codeParsed

        try {
            codeParsed = esprima.parse(codeRaw);

            // Création du tableau contenant les mots parsés par esprima
            for (let i=0 ; i < codeParsed.length ; i++) {

            }

            return codeParsed.body

        } catch (ex) {

        }
    }


    static parsedContentToXml(parsedContent) {

        const xml_head = "<block type='"
        const xml_tail = "'></block>"

        /////// do processing here
        let xml_body = "controls_if"
        /////// end of processing

        // assembles xml pieces
        return xml_head + xml_body + xml_tail
    }


    static generateBlocksFromParsedContent(parsedContent) {
   
        const xml_head = "<xml xmlns='http://www.w3.org/1999/xhtml'><variables></variables>"
        const xml_tail = "</xml>"

        // processes code into xml corresponding
        let xml_body = this.parsedContentToXml(parsedContent)
        // assembles xml pieces
        let xml_final = xml_head + xml_body + xml_tail

        this.updateBlocksFromXml(xml_final)
    }


    static updateBlocksFromXml(xml_str) {

        Blockly.getMainWorkspace().clear()

        Blockly.Xml.appendDomToWorkspace(
            Blockly.Xml.textToDom(xml_str),
            Blockly.getMainWorkspace()
        )
    }

}