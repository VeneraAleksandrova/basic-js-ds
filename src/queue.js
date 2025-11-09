const { NotImplementedError } = require("../lib/errors");
const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  getUnderlyingList() {
    function toObject(node) {
      if (!node) return null;
      return {
        value: node.value,
        next: toObject(node.next),
      };
    }
    return toObject(this.head);
  }

  enqueue(value) {
    const node = new ListNode(value);
    if (this.head) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.length++;
  }

  dequeue() {
    if (!this.head) return undefined;
    const cur = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return cur;
  }
}
module.exports = {
  Queue,
};
