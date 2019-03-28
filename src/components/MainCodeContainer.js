import React from 'react';
import {RawCodeContainer} from "./RawCodeContainer";
import {ParsedCodeContainer} from "./ParsedCodeContainer";
import {CodeToBlock} from "./CodeToBlock";


export class MainCodeContainer extends React.Component {

    constructor(props) {
        super(props)

        this.exampleCode = "put your js code here..."

        this.updateCode = this.updateCode.bind(this)
        this.updateBlocks = this.updateBlocks.bind(this)
    }

    updateCode(event) {

        let inputContent = event.target.value;

        // 1) splits line by line
        // let splitContent = MiscFunctions.splitLineByLine(inputContent);
        // console.log("splitInput: " , splitContent);

        // 2) patches lines into one big string
        // let codeToParse = MiscFunctions.patchUpStringArrayIntoOneBigString(splitContent, true);

        // processes JS <> Blockly conversion
        try {
            // ### VER 1 : lexical
            // let parsedContent = CodeToBlock.lexicalAnalysis(codeToParse);

            // ### VER 2 : syntaxic
            let parsedContent = CodeToBlock.syntaxicAnalysis(inputContent);

            // **** ADDED (test) ****
            // this.setState({
            //     parsedContent: parsedContent
            // })

            // debug
            console.log("programBody: ", parsedContent);
            console.log("------------------------------------");

            CodeToBlock.generateBlocksFromParsedContent(parsedContent);

        } catch (ex) {
            console.log(ex.stackTrace)
            ////// maybe insert lexical analysis here
        }
    }

    updateBlocks() {

    }

    render() {
        return (
            <div>
                <RawCodeContainer
                    exampleCode={this.exampleCode}
                    updateCode={this.updateCode}
                />

                <ParsedCodeContainer
                    onChange={this.updateBlocks}
                />
            </div>
        )
    }


}