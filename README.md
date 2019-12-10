## QUICK DESCRIPTION 
This basically does the opposite of Blocky, which enables user to transform logical blocks into code.  
That means, this app transforms basic JavaScript code into block constructions using the Blockly framework.  
This way, any obnoxious code, poorly-idented etc will be represented visually with blocks tied to each other, thus become much clearer to read and understand.  
You can test it at https://callixte-girard.github.io/JS2Blockly. Have fun !

  
## HOW IT WORKS
Simply input your JavaScript code into the left / top input container.
The right / bottom block container will update itself accordingly to the code your entered.
You can find mapping between JavaScript and Blockly XML and many other useful infos in : `./misc/`


## DEBUGGING FOR FREQUENT ERRORS
> If npm can't start | error of reference in code :
  - Go to the directory `js2blockly` with `cd` in terminal.
  - Do `npm install` to install all packages listed in `package.json`.
  - Do `npm start`. It should open `http://localhost:3000` in your browser.
  - Replace `npm` with `yarn` if it doesn't work.


## TO-DO
- Add string concatenation (blockly type : `"text_join"`), which doesn't work well as of now.
- Add support for objects like : `const test = {'title': 'hey guys', 'content': "what's up ?", 'date': '2019-12-10 10:20:00.799418'}`


## VARIOUS NOTES
- If for loop does not do anything, it is displayed, but without from, to & by blocks
    - ex : `for (p=9 ; p<1 ; p--) {}`
    - (works with `p>1` because loop is infinite)
- Concatenation of strings doesn't work. 
    - Must take blockly type : `"text_join"`
- Negative numbers like `-9` is considered as a `UnaryExpression` by Esprima, not by a `Literal` number in itself.
    - Maybe create a negate block, similar to the `"logic_negate"` block ?

    
