class Node {
  constructor(data) {
    this.data = data;
    this.children = [null, null];
    this.parent = null;
  }

  /* use 0 for left, 1 for right */
  get leftChild() { return this.children[0]; }
  get rightChild() { return this.children[1]; }

  set leftChild(node) { 
    if (this.children[1] === node)
      this.children[1] = null;
    node.parent = this;
    this.children[0] = node;
  }
  
  set rightChild(node) { 
    if (this.children[0] === node)
      this.children[0] = null;
    node.parent = this;
    this.children[1] = node;
  }

  get hasChildren() { return (this.children[0] || this.children[1]) }

  createChild(data, childIdx) { this.children[childIdx] = new Node(data); }

  preOrder() {
    let order;
    order = `${this.data}, `;
    if (this.leftChild)
      order += this.leftChild.preOrder();
    if (this.rightChild)
      order += this.rightChild.preOrder();

    return order;
  }

  inOrder() {
    let order = '';
    if (this.leftChild)
      order = this.leftChild.inOrder();
    order += `${this.data}, `;
    if (this.rightChild)
      order += this.rightChild.inOrder();
    
    return order;
  }

  postOrder() {
    let order = '';
    if (this.leftChild)
      order = this.leftChild.preOrder();
    if (this.rightChild)
      order += this.rightChild.preOrder();
    order += `${this.data}, `;

    return order;
  }

  findNum(val) {
    if (!isNaN(val)) {
      if (this.data == val) {
        return this;
      } else if (val > this.data && this.rightChild) {
        return this.rightChild.findNum(val);
      } else if (val < this.data && this.leftChild) {
        return this.leftChild.findNum(val);
      } else {
        return null;
      }
    } else { 
      throw new Error(`${val} is not a number!`)
    }
  }


} // module.exports = Node;