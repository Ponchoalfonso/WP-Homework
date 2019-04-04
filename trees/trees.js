const Node = require('./classes/node');
const NumericTree = require('./classes/numerictree');

let myNums = [6, 12, 27, 18, 19];

const arrayToTree = nums => {
  let tree = new NumericTree(new Node(nums[0]));

  for (let i = 1; i < nums.length; i++) {
    const node = new Node(nums[i]);
    tree.addNode(node)
  }

  return tree;
}

const myTree = arrayToTree(myNums);
console.log(myTree.root.findNum(19));

