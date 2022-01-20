
class NumberLiteral {
  constructor(value) {
    this.type = 'NUMBER';
    this.value = Number(value.character);
  }
  accept(printer) {
    let printV = printer.visitLiteralExpression(this);
    return printV;
  }
}

class StringLiteral {
  constructor(value) {
    this.type = 'STRING';
    this.value = value;
  }
  accept(printer) {
    let printV = printer.visitLiteralExpression(this);
    return printV;
  }
}

class Grouping {
  constructor(expression) {
    this.type = 'GROUPING';
    this.value = "()";
    this.expression = expression;
  }
  accept(printer) {
    return printer.visitGroupingExpression(this);
  }
}

class Binary {
  constructor(left,  operator, right) {
    this.type = 'BINARY';
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
    this.type = 'UNARY';
    this.operator = operator;
    this.right = right;
  }
  accept(printer) {
    return printer.visitUnaryExpression(this);
  }
}

class Statement {
  constructor(expression) {
    this.expression = expression;
  }
  accept(printer) {
    return printer.visitStatementExpression(this);
  }
}

class FunctionLiteral {
  constructor(callee, paren, args) {
    this.callee = callee;
    this.paren = paren;
    this.args = args;
  }
  accept(printer) {
    return printer.visitFunctionExpression(this);
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
    this.expressions = [];
  }

  parse() {
    let statements = [];
    while (!this.atEnd()) {
      statements.push(this.statement());
    }
    return statements;
  }

  statement() {
    let expression = this.term();
    this.consume('SEMICOLON', "Expect ';' after expression.");
    return new Statement(expression);
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
    return this.call();
  }

  call() {
    let expression = this.primary();
    while (true) {
      if (this.match(['LEFT_PAREN'])) {
        expression = this.finishCall(expression);
      } else {
        break;
      }
    }
    return expression;
  }

  finishCall(callee) {
    let args = [];
    if (!this.checkType('RIGHT_PAREN')) {
      do {
        args.push(this.term());
      } while(this.match(['COMMA']));
    } 
    let paren =  this.consume('RIGHT_PAREN', "Expect ')' after expression.");
    return new FunctionLiteral(callee, paren, args);
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
    if (this.match(['STRING'])) {
      return new StringLiteral(this.previous());
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