import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Blockly from 'node-blockly/browser';


//Définies ici pour qu'elles puissent être modifiées dans les autres fonctions
var xml_final;
var xml_body;

export class CodeToBlock extends React.Component {


    static traitLet(parsedContent) {
        // Bloc init
        const blocStart = '<block type="variables_set">'   //!\\ GENERATION BLOC ID
        const blocEnd = '</block>'
        // LEFT VALUE
        const leftValue1 = '<field name="VAR" variabletype="">'
        const leftValue2 = '</field>'
        let leftVal = parsedContent[0]['declarations'][0]['id']['name']

        console.log("Test" , parsedContent[0]['declarations'][0]['init']['name'])


        const rightValue2 = '</field></block></value>'

        //Traitement du cas ou la valeur de droite est numérique
        if (parsedContent[0]['declarations'][0]['init']['type'] === 'Literal')
        {
            // RIGHT VALUE
            const rightValue1 = ' <value name="VALUE"><block type="math_number"><field name="NUM">'
            var rightVal = parsedContent[0]['declarations'][0]['init']['value']
            // Body Generation
            xml_body = blocStart + leftValue1 + leftVal+ leftValue2 + rightValue1 + rightVal + rightValue2 + blocEnd;
        }

        // Traitement du cas ou la valeur de droite est un Identifier
        if (parsedContent[0]['declarations'][0]['init']['type'] === 'Identifier')
        {
            // RIGHT VALUE
            const rightValue1 = ' <value name="VALUE"><block type="variable_get"><field name="VAR">'
            var rightVal = parsedContent[0]['declarations'][0]['init']['name']
            // Body Generation
            xml_body = blocStart + leftValue1 + leftVal+ leftValue2 + rightValue1 + rightVal + rightValue2 + blocEnd;
        }

    }

}