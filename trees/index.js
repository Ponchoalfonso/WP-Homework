let tree;
document.addEventListener('DOMContentLoaded', () => {
  const buttons = [
    document.querySelector('#add-node'),
    document.querySelector('#pre'),
    document.querySelector('#in'),
    document.querySelector('#post'),
    document.querySelector('#find'),
  ];
  const inputs = [
    document.querySelector('#node-val'),
    document.querySelector('#find-in'),
  ];
  const outputs = [
    document.querySelector('#pre-out'),
    document.querySelector('#in-out'),
    document.querySelector('#post-out'),
    document.querySelector('#find-out'),
  ];

  if (hasCorrectValues(buttons) && hasCorrectValues(inputs) && hasCorrectValues(outputs)) {
    /* Adding data to tree */
    buttons[0].addEventListener('click', () => {
      if (!tree)
        tree = new NumericTree(new Node(+inputs[0].value));
      else
        tree.addNode(new Node(+inputs[0].value));
      inputs[0].value = '';
    });

    /* Tree tours */
    buttons[1].addEventListener('click', () => {
      outputs[0].innerHTML += tree.preOrder();
    });
    buttons[2].addEventListener('click', () => {
      outputs[1].innerHTML += tree.inOrder();
    });
    buttons[3].addEventListener('click', () => {
      outputs[2].innerHTML += tree.postOrder();
    });

    /* Search tool */
    buttons[4].addEventListener('click', () => {
      outputs[3].innerHTML = `Search result: Your number ${tree.findNum(+inputs[1].value) != null ? 'was' : 'wasn\'t'} found!`;
      console.log(tree.findNum(+inputs[1].value));
    });
  }
});

const hasCorrectValues = arr => {
  let correct = true;
  for (const val of arr) {
    correct = (correct && val != null && val != undefined && val != NaN);
  }
  return correct;
}