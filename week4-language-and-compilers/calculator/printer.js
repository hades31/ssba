class AstPrinter {
  print(astExpressions) {
    return astExpressions.forEach((astExpression) => {
      console.log(astExpression.expression.accept(this));
    });
  }

  visitBinaryExpression(expression) {
    return this.parenthesize(expression.operator.character, expression.left, expression.right)
  }

  visitGroupingExpression(expression) {
    return this.parenthesize('group', expression.expression);
  }

  visitLiteralExpression(expression) {
    if (expression.value === null) { return null; }
    return expression.value.toString();
  }
 
  visitUnaryExpression(expression) {
    return this.parenthesize(expression.operator.character, expression.right);
  }

  visitFunctionExpression(expression) {
    return this.parenthesize(expression.callee.value.character, ...expression.args);
  }

  visitStatementExpression(expression) {
    return this.parenthesize(expression.expression);
  }

  parenthesize(name, ...expressions) {
    let builderString = `(${name}`
    expressions.forEach((expression) => {
      builderString += " ";
      builderString = builderString.concat(expression.accept(this));
    });

    builderString = builderString.concat(")");
    return builderString;
  }
}

exports.printer = AstPrinter;