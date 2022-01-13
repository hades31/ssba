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
    if (this.isNumber(trimmedCharacter)) {
      this.pushNumberToken();
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
      let tokenString = this.source.substring(this.start, this.current);
      this.tokens.push(new Token(tokenString, tokenType));
    }
  }

  isNumber(characterString) {
    return !isNaN(characterString) && !BLANK_CHARACTERS.includes(characterString)
  }

  peek() {
    return this.source.charAt(this.current);
  }

  peekNext() {
    return this.source.charAt(this.current + 1);
  }

  pushNumberToken() {
    while(this.isNumber(this.peek())) {
      this.advance();
    }

    if (this.peek() === '.' && this.isNumber(this.peekNext())) {
      this.advance();
      while (this.isNumber(this.peek())) {
        this.advance();
      }
    }
    let charString = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(charString, 'NUMBER'));
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