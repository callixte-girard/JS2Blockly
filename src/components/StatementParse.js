import React from 'react';

export class StatementParse extends React.Component {


    static getXmlFromStatement(stat) {

        // doit aiguiller vers la bonne fonction.
        let statType = stat['type']
        console.log(statType)

        // if (statType === 'VariableDeclaration') {
        //     this.parseVariableDeclaration(stat)
        // } else if (statType === 'ForStatement') {
        //     this.parseForStatement(stat)
        // }
        //

        switch (statType) {
            case "VariableDeclaration":
                this.parseVariableDeclaration(stat)
            case "ForStatement":
                this.parseForStatement(stat)
        }

    }


    static parseVariableDeclaration(stat) {

        for (let i=0 ; i<stat['declarations'].length ; i++) {
            let decl = stat['declarations'][i]

            let varName, varValue
            try {
                // var name : always set (or throw ex)
                varName = decl['id']['name']
                // var value : can be null
                if (decl['init'] != null) varValue = decl['init']['value']
                else varValue = null

                console.log(varName, varValue)

                // COOOL :D now we can create xml.
            } catch {}

        }

    }


    static parseForStatement(stat) {


    }

}