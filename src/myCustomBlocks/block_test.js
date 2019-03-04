import Blockly from 'node-blockly/browser.js';

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // SORRY TOTALLY RANDOM EXAMPLE BUT IT works.


    // Block for reversing a list.
    {
        "type": "pipou",
        "message0": "%{BKY_LISTS_REVERSE_MESSAGE0}",
        "args0": [
            {
                "type": "input_value",
                "name": "LIST",
                "check": "Array"
            }
        ],
        "output": "Array",
        "inputsInline": true,
        "style": "list_blocks",
        "tooltip": "%{BKY_LISTS_REVERSE_TOOLTIP}",
        "helpUrl": "%{BKY_LISTS_REVERSE_HELPURL}"
    },



]);  // END JSON EXTRACT (Do not delete this comment.)
