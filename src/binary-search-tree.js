const { NotImplementedError } = require("../lib/errors");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this._root;
  }

  add(data) {
    if (this._root === null) {
      this._root = new Node(data);
      return;
    }
    let currNode = this._root;
    while (currNode.data !== data) {
      if (data < currNode.data) {
        if (currNode.left === null) {
          currNode.left = new Node(data);
          return;
        }
        currNode = currNode.left;
      } else {
        if (currNode.right === null) {
          currNode.right = new Node(data);
          return;
        }
        currNode = currNode.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    //if (!this.root()) return null;
    let currNode = this.root();
    while (currNode !== null) {
      if (data < currNode.data) {
        currNode = currNode.left;
      } else if (data > currNode.data) {
        currNode = currNode.right;
      } else {
        return currNode;
      }
    }
    return null;
  }

  remove(data) {
    this._root = deleteNode(this._root, data);

    function deleteNode(node, data) {
      if (node === null) {
        return null;
      }
      if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = deleteNode(node.right, data);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          node = node.right;
          return node;
        }
        if (node.right === null) {
          node = node.left;
          return node;
        }

        let maxLeftNode = node.left;
        while (maxLeftNode.right !== null) {
          maxLeftNode = maxLeftNode.right;
        }
        node.data = maxLeftNode.data;
        node.left = deleteNode(node.left, maxLeftNode.data);
        return node;
      }
    }
  }

  min() {
    if (this._root === null) {
      return null;
    }
    let currNode = this._root;
    while (currNode.left !== null) {
      currNode = currNode.left;
    }
    return currNode.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }
    let currNode = this._root;
    while (currNode.right !== null) {
      currNode = currNode.right;
    }
    return currNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
