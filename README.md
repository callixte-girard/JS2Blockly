## QUICK DESCRIPTION 
This basically does the opposite of Blocky, which enables user to transform logical blocks into code.  
That means, this app transforms JS code into block constructions using the Blockly framework.  
This way, any obnoxious code, poorly-idented etc will be represented visually with blocks tied to each other, thus become much clearer to read and understand.  
You can test it at https://callixte-girard.github.io/JS2Blockly. Have fun !

  
## HOW IT WORKS
Simply input your JavaScript code into the left / top input container.
The right / bottom block container will update itself accordingly to the code your entered.
You can find mapping between JavaScript and Blockly XML and many other useful infos in : `./misc/`


## DEBUGGING FOR FREQUENT ERRORS
> if npm can't start | error of reference in code :
  - go to the directory `js2blockly` with `cd` in terminal.
  - do `npm install` then `npm start`.
  - should open `http://localhost:3000` in your browser.


## VARIOUS NOTES
- if for loop does not do anything, it is displayed, but without from, to & by blocks
    - ex : `for (p = 9 ; p<1 ; p--) {}`
    - (works with `p>1` because loop is infinite)
- concatenation of strings doesn't work. 
    - Must take blockly type : `"text_join"`
- `-9` is considered as a `UnaryExpression` by Esprima, not by a `Literal` number in itself.
    - Maybe create a negate block, similar to the `"logic_negate"` block ?

    
