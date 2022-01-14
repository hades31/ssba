
class NumberLiteral {
  constructor(value) {
    this.value = Number(value.character);
  }
}

class Binary {
  constructor(left,  operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  parse() {
    return this.addSub();
  }

  addSub() {
    let expression = this.mulDiv();

    while(this.match(['PLUS', 'MINUS'])) {
      let operator = this.previous();
      let right = this.mulDiv();
      expression = new Binary(expression, operator, right);
    }
    console.log(expression)
    return expression;
  }

  mulDiv() {
    let expression = this.primary();
    while(this.match(['MULTIPLY', 'DIVIDE'])) {
      let operator = this.previous();
      let right = this.primary();
      expression = new Binary(expression, operator, right);
    }
    console.log(expression)
    return expression;
  }

  primary() {
    if (this.match(['NUMBER'])) {
      return new NumberLiteral(this.previous())
    }
    // if (this.match(LEFT_PAREN)) {
    //   let expression = expression();
    //   consume(RIGHT_PAREN, "Expect ')' after expression.");
    //   return new Expr.Grouping(expr);
    // }
  }

  match(tokenTypeArray) {
    let hasMatch = tokenTypeArray.some((tokenType) => {
      return this.checkType(tokenType);
    });
    if (hasMatch) { this.advance(); }
    return hasMatch;
  }
 
  checkType(type) {
    if (this.atEnd()) { return false; }
    return this.peek().tokenType === type;
  }

  previous() {
    return this.tokens[this.current - 1];
  }

  advance() {
    if (!this.atEnd()) { this.current++; }
    return this.previous();
  }

  peek() {
    return this.tokens[this.current];
  }

  atEnd() {
    return this.peek().tokenType === 'EOF';
  }

  printExpressions() {

  }
}

exports.parser = Parser;