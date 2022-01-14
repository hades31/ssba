const { scanner } = require('./scanner.js');
const { parser } = require('./parser.js');

let scannerObject = new scanner('5*2+1+2+3');
scannerObject.scan();
let parserObject = new parser(scannerObject.tokens);
parserObject.parse();