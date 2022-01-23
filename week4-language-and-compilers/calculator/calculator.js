const { scanner } = require('./scanner.js');
const { parser } = require('./parser.js');
const { printer } = require('./printer.js');
const { interpreter } = require('./interpreter.js');
const { compiler } = require('./compiler.js');
const { vm } = require('./vm.js');

// let expression = 'fact(5)+exp(2,5);(1+2)*4;3+4/2;';
let expression = '5-2*2;';
let scannerObject = new scanner(expression);
scannerObject.scan();

console.log(`Expression: ${expression}\n`);

console.log("Tokens:");
scannerObject.printTokens();

console.log("\nExpressions:");
let parserObject = new parser(scannerObject.tokens);
let astArray = parserObject.parse();
console.log(astArray);

// console.log("\nPrinter:");
// let printerObject = new printer();
// printerObject.print(astArray);

// console.log("\nInterpreter:");
// let interpreterObject = new interpreter();
// interpreterObject.execute(astArray).forEach((value) => {
//   console.log(value);
// });

console.log('\nCompiler:');
let compilerObject = new compiler();
compilerObject.compile(astArray[0]);
let bytecodes = compilerObject.stack;
console.log(bytecodes);

console.log('\nVM:');
let vmObject = new vm(bytecodes);
console.log(vmObject.interpret());
