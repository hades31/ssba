// [
//     (NUMBER, "1"),
//     (MINUS, "-"),
//     (LEFT_PAREN, "("),
//     (PLUS, "+"),
//     (RIGHT_PAREN, ")"
// ]
const BLANK_CHARACTERS = ['', '\s', '\t'];

class Token {
  constructor(character, tokenType) {
    this.character = character;
    this.tokenType = tokenType;
  }
  printToken() {
    console.log(`(${this.tokenType}, "${this.character}")`)
  }
}

function scanToken(character) {
  let tokenType = null;
  let trimmedCharacter = character.trim();
  if (!isNaN(trimmedCharacter) && !BLANK_CHARACTERS.includes(trimmedCharacter)) {
    tokenType = 'NUMBER';
  } else {
    switch(trimmedCharacter) {
      case '+':
        tokenType = 'PLUS';
        break;
      case '-':
        tokenType = 'MINUS';
        break;
      case '*':
        tokenType = 'MULTIPLY';
        break;
      case '/':
        tokenType = 'DIVIDE';
        break;
      case '^':
        tokenType = 'EXPONENT';
        break;
      case '(':
        tokenType = 'LEFT_PAREN';
        break;
      case ')':
        tokenType = 'RIGHT_PAREN';
        break;
      case '':
      case '\r':
      case '\t':
        tokenType = 'SPACE';
        break;
      default:
        tokenType = 'INVALID_CHAR';
        break;
    }
  }
  return new Token(character, tokenType);
}

exports.scanner = function(calculatorString) {
  let characterArray = calculatorString.split('');
  let tokens = [];
  while(characterArray.length) {
    tokens.push(scanToken(characterArray.shift()));
  }
  tokens.forEach((t) => {
    t.printToken();
  });
}
