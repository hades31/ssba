// [
//     (NUMBER, "1"),
//     (MINUS, "-"),
//     (LEFT_PAREN, "("),
//     (PLUS, "+"),
//     (RIGHT_PAREN, ")"
// ]
const BLANK_CHARACTERS = ['', '\s', '\t'];

class Token {
  constructor(character) {
    this.character = character;
  }
  computeType() {
    let trimmedCharacter = this.character.trim();
    if (!isNaN(trimmedCharacter) && !BLANK_CHARACTERS.includes(trimmedCharacter)) {
      return 'NUMBER';
    }
    switch(trimmedCharacter) {
      case '+':
        return 'PLUS';
      case '-':
        return 'MINUS';
      case '*':
        return 'MULTIPLY';
      case '/':
        return 'DIVIDE';
      case '^':
        return 'EXPONENT';
      case '(':
        return 'LEFT_PAREN';
      case ')':
        return 'RIGHT_PAREN';
      case '':
      case '\r':
      case '\t':
        return 'SPACE';
      default:
        return 'INVALID_CHAR';
    }
  }
  printToken() {
    console.log(`(${this.computeType()}, "${this.character}")`)
  }
}

exports.scanner = function(calculatorString) {
  let characterArray = calculatorString.split('');
  let tokens = [];
  while(characterArray.length) {
    tokens.push(new Token(characterArray.shift()));
  }
  tokens.forEach((t) => {
    t.printToken();
  });
}
