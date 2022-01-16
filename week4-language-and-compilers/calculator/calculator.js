const { scanner } = require('./scanner.js');
const { parser } = require('./parser.js');

let expression = '(1+2)*4';
let scannerObject = new scanner(expression);
scannerObject.scan();

console.log(`Expression: ${expression}\n`);

console.log("Tokens:");
scannerObject.printTokens();

console.log("\nExpressions:");
let parserObject = new parser(scannerObject.tokens);
console.log(parserObject.parse());