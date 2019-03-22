import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Blockly from 'node-blockly/browser';

const esprima = require('esprima');

export class CodeToBlock extends React.Component {


    static lexicalAnalysis(codeRaw) {

        // console.log("codeRaw: " , codeRaw);

        let codeParsed

        try {
            codeParsed = esprima.parse(codeRaw);
            console.log("codeParsed: " , codeParsed);
            console.log("------------------------------------");

            // Création du tableau contenant les mots parsés par esprima
            for (let i=0 ; i < codeParsed.length ; i++) {
                let word = codeParsed[i];
            }

            //CCO - On analyse le tableau
            this.codeAnalysis(codeParsed);

            return codeParsed
        } catch {

            ///////////////////
            console.log("codeParsed: " , "!ERROR TO HANDLE!");
            console.log("------------------------------------");

        }


    }


    static syntaxicAnalysis(codeRaw) {

        // console.log("codeRaw: " , codeRaw);

    }


    //CCO - Cette fonction permet d'analyser le code afin de le traiter de manière approprié
    static codeAnalysis(codeParsed) {
        
        // parcours la liste des mots et vérifie si c'est un let.
        for (let i=0 ; i < codeParsed.length ; i++) {
        
            let word = codeParsed[i];   
            console.log(word);
            let typ = word.type;
            let val = word.value;
            // Reconnaissance du "let"
            if ((typ === "Keyword") && (val === "let")) 
            {
                i = this.traitementLet(codeParsed, i); 

            }
        }
    }

    // Traitement du "let" : permet de générer le XML blockly associé.

    static traitementLet(codeParsed,i) {
        

        for (; i < codeParsed.length ; i++) {
        
        let word = codeParsed[i];   
        let typ = word.type;
        
        var val1;
        var val2;
        
        if (typ === "Identifier" && i === 1 ) 
            {
                val1 = word.value;
            }

            if ((typ === "Identifier" || typ === "Numeric" )&& i !== 1 ) 
            {
                val2 = word.value;
            }

            if (word.value === ";")
            {
                xml_str = affset1.concat(val1,affset2,val2,affset3);
                return i;
            }
        }
    }

    static generateXmlFromParsedContent(parsedInput) {
   
        Blockly.getMainWorkspace().clear()
      
        Blockly.Xml.appendDomToWorkspace(
            Blockly.Xml.textToDom(xml_str),
            Blockly.getMainWorkspace()
        )
    }


    // static demoBlock(workspace) { // old method
    //
    //     //////////////////////////////////////// which  one to test ?
    //     const block_forEach = workspace.newBlock('controls_forEach');
    //     let test_block = block_forEach;
    //
    //     // GENERAL
    //     test_block.initSvg();
    //     test_block.render();
    //     test_block.setColour(100);
    //     test_block.setCollapsed(false);
    //     // test_block.centerBlock();
    //     // test_block.setCommentText("here is da comment");
    //     // test_block.setParent(parent);
    //
    //     // SPECIFIC text_print
    //     // test_block.setFieldValue("pipou");
    // }


}