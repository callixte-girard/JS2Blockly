const esprima = require('esprima');


export class CodeToBlock {


    static lexicalAnalysis(codeRaw) {

        // console.log("codeRaw: " , codeRaw);

        try {
            let codeParsed = esprima.tokenize(codeRaw);
            console.log("codeParsed: " , codeParsed);

            for (let i=0 ; i < codeParsed.length ; i++) {

                let word = codeParsed[i];
                // console.log(word);
            }

        } catch {



            console.log("codeParsed: " , "!ERROR TO HANDLE!");
        }

        console.log("------------------------------------");
    }


    static playAroundWithBlocks(workspace) {

        // yeeeah these lines do generate a block but it needs customisation.
        // let test_block = workspace.newBlock('text_print');
        // let test_block = workspace.newBlock('logic_boolean');
        // let test_block = workspace.newBlock('colour_rgb');
        // let test_block = workspace.newBlock('lists_repeat');
        // let test_block = workspace.newBlock('pipou');

        // I - LOGIC (8)
        //////////////////////////////////
        const block_bool = workspace.newBlock('logic_boolean');
        const block_if = workspace.newBlock('controls_if');
        const block_ifelse = workspace.newBlock('controls_ifelse');
        const block_compare = workspace.newBlock('logic_compare');
        const block_operation = workspace.newBlock('logic_operation');
        const block_negate = workspace.newBlock('logic_negate');
        const block_null = workspace.newBlock('logic_null');
        const block_ternary = workspace.newBlock('logic_ternary');

        // II - LOOPS (6)
        //////////////////////////////////
        const block_repeat_ext = workspace.newBlock('controls_repeat_ext');
        const block_repeat = workspace.newBlock('controls_repeat');
        const block_whileUntil = workspace.newBlock('controls_whileUntil');
        const block_for = workspace.newBlock('controls_for');
        const block_forEach = workspace.newBlock('controls_forEach');
        const block_flow_statement = workspace.newBlock('controls_flow_statements');

        // III - VARIABLES (2)
        //////////////////////////////////
        const block_variables_get = workspace.newBlock('variables_get');
        const block_variables_set = workspace.newBlock('variables_set');

        //////////////////////////////////////// which one to test ?
        let test_block = block_forEach;

        // GENERAL
        test_block.initSvg();
        test_block.render();
        test_block.setColour(100);
        test_block.setCollapsed(false);
        // test_block.centerBlock();
        // test_block.setCommentText("here is da comment");
        // test_block.setParent(parent);

        // SPECIFIC text_print
        // test_block.setFieldValue("pipou");

    }

}