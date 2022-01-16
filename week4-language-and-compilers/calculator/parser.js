
class NumberLiteral {
  constructor(value) {
    this.value = Number(value.character);
  }
  accept(printer) {
    let printV = printer.visitLiteralExpression(this);
    return printV;
  }
}

class Grouping {
  constructor(expression) {
    this.value = "()";
    this.expression = expression;
  }
  accept(printer) {
    return printer.visitGroupingExpression(this);
  }
}

class Binary {
  constructor(left,  operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
  accept(printer) {
    return printer.visitBinaryExpression(this);
  }
}

class Unary {
  constructor(operator, right) {
    this.operator = operator;
    this.right = right;
  }
  accept(printer) {
    return printer.visitUnaryExpression(this);
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
    this.expressions = [];
  }

  parse() {
    return this.term();
  }

  term() {
    let expression = this.factor();

    while(this.match(['PLUS', 'MINUS'])) {
      let operator = this.previous();
      let right = this.factor();
      expression = new Binary(expression, operator, right);
    }
    this.expressions.push(expression);
    return expression;
  }

  factor() {
    let expression = this.unary();
    while(this.match(['MULTIPLY', 'DIVIDE'])) {
      let operator = this.previous();
      let right = this.unary();
      expression = new Binary(expression, operator, right);
    }
    return expression;
  }

  unary() {
    if (this.match(['MINUS'])) {
      let operator = this.previous();
      let right = this.unary();
      return new Unary(operator, right);
    }
    return this.primary();
  }

  primary() {
    if (this.match(['NUMBER'])) {
      return new NumberLiteral(this.previous())
    }
    if (this.match(['LEFT_PAREN'])) {
      let expression = this.term();
      this.consume('RIGHT_PAREN', "Expect ')' after expression.");
      return new Grouping(expression);
    }
  }

  consume(tokenType, message) {
    if (this.checkType(tokenType)) { return this.advance(); }
    throw new Error(message);
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
}

exports.parser = Parser;