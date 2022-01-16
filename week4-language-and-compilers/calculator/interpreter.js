class Interpreter {
  visitLiteralExpression(expression) {
    return expression.value;
  }

  visitGroupingExpression(expression) {
    return this.evaluate(expression.expression);
  }

  visitBinaryExpression(expression) {
    let left = this.evaluate(expression.left);
    let right = this.evaluate(expression.right);

    switch(expression.operator.tokenType) {
      case "MINUS":
        return parseFloat(left) - parseFloat(right);
      case "DIVIDE":
        return parseFloat(left) / parseFloat(right);
      case "MULTIPLY":
        return parseFloat(left) * parseFloat(right);
      case "PLUS":
        return parseFloat(left) + parseFloat(right);
    }
    return null;
  }

  visitUnaryExpression(expression) {
    let right = this.evaluate(expression.right);

    return - (parseFloat(right));
  }

  visitFunctionExpression(expression) {
    let args = expression.args.map((arg) => { return arg.value; });
    return this[expression.callee.value.character](...args);
  }

  sqrt(number) {
    return Math.sqrt(number);
  }

  exp(number, power) {
    return Math.pow(number, power);
  }

  fact(number) {
    let total = 1;
    for (let i = number; i >=1; i--) {
      total *= i;
    }
    return total;
  }

  evaluate(expression) {
    return expression.accept(this);
  }
}

exports.interpreter = Interpreter;