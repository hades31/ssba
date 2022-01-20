class Compiler {
  constructor() {
    this.stack = [];
  }

  compile(node) {
    let type = node.type || node.expression.type;
    switch(type) {
      case 'NUMBER':
        this.stack.push(['PUSH', parseFloat(node.value)])
        break;
      case 'BINARY': 
        let leftNode = node.left || node.expression.left;
        let rightNode = node.right || node.expression.right;
        let operator = node.operator || node.expression.operator
        this.compile(leftNode);
        this.compile(rightNode);
        this.stack.push([operator.tokenType]);
        break;
      default:
        throw new Error('Not recognized');
    }
  }

  print() {
    console.log(this.stack);
  }
}

exports.compiler = Compiler;