const OP_TO_FUNCTION = {
  'MULTIPLY': (x, y) => { return x * y; },
  'PLUS': (x, y) => { return x + y; },
  'MINUS': (x, y) => { return x - y; },
  'DIVIDE': (x, y) => { return x / y; },
}

class VM {
  constructor(bytecodes) {
    this.bytecodes = bytecodes;
    this.values = [];
    this.currentIndex = 0;
  }

  interpret() {
    while(this.currentIndex < this.bytecodes.length) {
      let op = this.advance();
      console.log(op);
      if (op[0] === 'PUSH') {
        this.values.push(op[1]);
      } else {
        let right = this.values.pop();
        let left = this.values.pop();
        this.values.push(OP_TO_FUNCTION[op[0]](left, right));
      }
    }
    return this.values[0];
  }

  advance() {
    this.currentIndex++;
    return this.bytecodes[this.currentIndex - 1];
  }
}

exports.vm = VM;