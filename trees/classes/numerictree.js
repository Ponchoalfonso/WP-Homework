// const Node = require('./node');

class NumericTree extends Node {
  constructor (node) {
    super(node.data);
    this.children = node.children;
    this.parent = null;
  }

  addNode(node) {
    let currentNode = this;
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