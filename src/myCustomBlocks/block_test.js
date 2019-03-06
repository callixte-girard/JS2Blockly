import Blockly from 'node-blockly/browser.js';

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // SORRY TOTALLY RANDOM EXAMPLE BUT IT works.


    // Block for reversing a list. #Modified by C for playing around
    {
        "type": "pipou",
        "message0": "ur variable name : %1",
        "args0": [
            {
                // "type": "input_value",
                "type": "field_variable",
                "name": "VALUE",
                "check": "Double"
            }
        ],
        "output": "Array",
        "inputsInline": true,
        "style": "list_blocks",
        "tooltip": "%{BKY_LISTS_REVERSE_TOOLTIP}",
        "helpUrl": "%{BKY_LISTS_REVERSE_HELPURL}"
    },



]);  // END JSON EXTRACT (Do not delete this comment.)
