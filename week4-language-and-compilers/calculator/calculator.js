const { scanner } = require('./scanner.js');
const { parser } = require('./parser.js');
const { printer } = require('./printer.js');
const { interpreter } = require('./interpreter.js');

let expression = '5*(-2-(3+4))';
let scannerObject = new scanner(expression);
scannerObject.scan();

console.log(`Expression: ${expression}\n`);

console.log("Tokens:");
scannerObject.printTokens();

console.log("\nExpressions:");
let parserObject = new parser(scannerObject.tokens);
let ast = parserObject.parse();
console.log(ast);

console.log("\nPrinter:");
let printerObject = new printer();
console.log(printerObject.print(ast));

console.log("\nInterpreter:");
let interpreterObject = new interpreter();
console.log(interpreterObject.evaluate(ast));
