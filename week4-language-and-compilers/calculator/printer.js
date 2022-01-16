class AstPrinter {
  print(expression) {
    return expression.accept(this);
  }

  visitBinaryExpression(expression) {
    return this.parenthesize(expression.operator.value)
  }
}
