const { scanner } = require('./scanner.js');

let scannerObject = new scanner('12.5-(2+3)');
scannerObject.scan();
scannerObject.printTokens();