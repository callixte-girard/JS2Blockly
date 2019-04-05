import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Blockly from 'node-blockly/browser';


//Définies ici pour qu'elles puissent être modifiées dans les autres fonctions
var xml_final;
var xml_body;

export class CodeToBlock extends React.Component {


    static traitLet(parsedContent)
    {
        // Bloc init
        const blocStart = '<block type="variables_set">'   //!\\ GENERATION BLOC ID
        const blocEnd = '</block>'
        // LEFT VALUE
        const leftValue1 = '<field name="VAR" variabletype="">'
        const leftValue2 = '</field>'
        let leftVal = parsedContent[0]['declarations'][0]['id']['name']


        // apres le =
        let rightValue1, rightVal
        const rightValue2 = '</field></block></value>'

        let varType = parsedContent[0]['declarations'][0]['init']['type']

        //Traitement du cas ou la valeur de droite est numérique
        if (varType === 'Literal')
        {
            // RIGHT VALUE
            rightValue1 = ' <value name="VALUE"><block type="math_number"><field name="NUM">'
            rightVal = parsedContent[0]['declarations'][0]['init']['value']
        }
        // Traitement du cas ou la valeur de droite est un Identifier
        else if (varType === 'Identifier')
        {
            // RIGHT VALUE
            rightValue1 = ' <value name="VALUE"><block type="variable_get"><field name="VAR">'
            rightVal = parsedContent[0]['declarations'][0]['init']['name']
        }

        // Body Generation
        xml_body = blocStart + leftValue1 + leftVal+ leftValue2 + rightValue1 + rightVal + rightValue2 + blocEnd;
    }

}