const { scanner } = require('./scanner.js');

let scannerObject = new scanner('1-(2+3)');
scannerObject.scan();
scannerObject.printTokens();