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

            return codeParsed

        } catch (ex) {

        }
    }


    static generateXmlFromParsedContent(xml_str) {
   
        Blockly.getMainWorkspace().clear()
      
        Blockly.Xml.appendDomToWorkspace(
            Blockly.Xml.textToDom(xml_str),
            Blockly.getMainWorkspace()
        )
    }


}