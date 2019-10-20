## QUICK DESCRIPTION 
This basically does the opposite of Blocky, which enables user to transform logical blocks into code. 
That means, this app transforms JS code into block constructions using the Blockly framework. 
This way, any obnoxious code, poorly-idented etc will be represented visually with blocks tied to each other, thus become much clearer to read and understand.
  
  
## HOW IT WORKS
Simply input your JavaScript code into the left / top input container.
The right / bottom block container will update itself accordingly to the code your entered.


## DEBUGGING FOR FREQUENT ERRORS
> if the blocks don't appear after you cloned :
  - check if ./src/blockly is empty.
  - if it is, download blockly from https://github.com/google/blockly 
  - copy folder blockly in project's folder ./src/ (overwrite the empty existing one)
  - exit and run again. Should work
> if npm can't start | error of reference in code :
  - go to the directory (BlockBasedCodeVisualisation) with cd in terminal.
  - do "npm install" then "npm start".
  - should open http://localhost:3000 in your browser.


## NOTES
- if for loop does not do anything, it is displayed, but without from, to & by blocks
    - ex : for (p = 9 ; p<1 ; p--) {} 
    - (works with p>1 because loop is infinite)
- concatenation of string doesn't work. 
    - Must take blockly type : __"text_join"__
- -9 is considered as a UnaryExpression by Esprima, not by a Literal number in itself.
    - Maybe create a negate block, similar to the __"logic_negate"__ block ?
    
