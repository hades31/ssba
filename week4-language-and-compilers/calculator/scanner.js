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

// exports.scanner = function(calculatorString) {
//   let characterArray = calculatorString.split('');
//   let tokens = [];
//   while(characterArray.length) {
//     tokens.push(scanToken(characterArray.shift()));
//   }
//   tokens.forEach((t) => {
//     t.printToken();
//   });
// }

class Scanner {
  constructor(source) {
    this.tokens = [];
    this.current = 0;
    this.source = source;
  }

  advance() {
    return this.source.charAt(this.current++);
  }

  scanToken() {
    let tokenType = null;
    let character = this.advance();
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
    let tokenString = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(tokenString, tokenType));
  }

  reachedEnd() {
    return this.current >= this.source.length - 1
  }

  scan() {
    while(!this.reachedEnd()) {
      this.start = this.current;
      this.scanToken();
    }
  }
  
  printTokens() {
    this.tokens.forEach((token) => {
      token.printToken();
    })
  }
}

exports.scanner = Scanner;