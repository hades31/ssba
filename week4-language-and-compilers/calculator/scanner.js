// [
//     (NUMBER, "1"),
//     (MINUS, "-"),
//     (LEFT_PAREN, "("),
//     (PLUS, "+"),
//     (RIGHT_PAREN, ")"
// ]

class Token {
  constructor(character) {
    this.character = character;
  }
  computeType() {
    if (!isNaN(this.character)) { return 'NUMBER'; }
    switch(this.character) {
      case '+':
        return 'PLUS';
      case '-':
        return 'MINUS';
      case '(':
        return 'LEFT_PAREN';
      case ')':
        return 'RIGHT_PAREN';
      default:
        return 'INVALID_CHAR';
    }
  }
  printToken() {
    console.log(`(${this.computeType()}, "${this.character}")`)
  }
}

exports.scanner = function(calculatorString) {
  let tokens = [];
  for (var i = 0; i <= calculatorString.length; i++) {
    tokens.push(new Token(calculatorString.charAt(i)));
  }
  tokens.forEach((t) => {
    t.printToken();
  });
}
