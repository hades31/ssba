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

  evaluate(expression) {
    return expression.accept(this);
  }
}

exports.interpreter = Interpreter;