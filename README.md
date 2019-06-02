***** JS2Blockly — ISEP final project *****


### >>> QUICK DESCRIPTION 
This basically does the opposite of Blocky, which enables user to transform logical blocks into code.
Our app transforms code (only JS for the moment) into block constructions using Blockly framework.
This way, any obnoxious code, poorly-indented etc will become much clearer, and easier to read and understand.


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


### >>> NOTES
- if for loop does not contain a valid condition, it is displayed, but without from, to & by blocks
    ex : for (p = 9 ; p<1 ; p--) {} (should be p>1)


### >>> WHAT'S TO BE ADDED IN THE FUTURE ?
- add concat for integers and strings like in js. 
    ex : let p = 3; const k = p + "str"; 
-------------------------------------------------------------------------------------------------------------------------------
