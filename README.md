***** JS2Blockly — ISEP final project *****


### >>> QUICK DESCRIPTION 

This basically does the opposite of Blocky, which enables user to transform logical blocks into code.
Our app transforms code (only JS for the moment) into block constructions using Blockly framework.
This way, any obnoxious code, poorly-idented etc will become much clearer, and easier to read and understand.


### >>> DEBUGGING FOR FREQUENT ERRORS

> if the blocks don't appear after you cloned :
  - check if ./src/blockly is empty.
  - if it is, download blockly from https://github.com/google/blockly 
  - copy folder blockly in project's folder ./src/ (overwrite the empty existing one)
  - exit and run again. Should work
 
> if npm can't start :
  - go to the directory (BlockBasedCodeVisualisation) with cd in terminal.
  - do "npm install" then "npm start".
  - should open http://localhost:3000 in your browser.
  

### >>> HOW IT WORKS

Simply input your JavaScript code into the left / top input container.
The right / bottom block container will update itself accordingly to the code your entered.

### >>> WHAT'S NEW ?

- now : every basic JS built-in blocks are working except ForStatements and FunctionDeclarations. TBA soon

-------------------------------------------------------------------------------------------------------------------------------
