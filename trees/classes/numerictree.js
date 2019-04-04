class NumericTree {
  constructor (node) {
    this.root = node;
  }

  addNode(node) {
    let currentNode = this.root;
    let wasSet = false;
    while (!wasSet) {
      if (node.data > currentNode.data) {
        if (!currentNode.rightChild) {
          currentNode.rightChild = node;
          wasSet = true;
        }
        else
          currentNode = currentNode.rightChild;
      } else if (node.data < currentNode.data) {
        if (!currentNode.leftChild) {
          currentNode.leftChild = node;
          wasSet = true;
        }
        else
          currentNode = currentNode.leftChild;
      }
    }
  }
} // module.exports = NumericTree;