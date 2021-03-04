class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count
  }
  clear() {
    this.head = null;
  }
  insertFirst(data) {
    let oldHead = Object.assign({},this.head);
    this.head = new ListNode(data);
    this.head.next = oldHead;
    return this;
  } 
  insertLast(data) {
    let node = this.head;
    while (node.next) {
      node = node.next;
    }
    node.next = data;
    return this;
  }
  getFirst () {
    return this.head;
  };
  getLast () {
    let node = this.head;
    while (node.next) {
      node = node.next;
    }
    return node;
  };
}

var node1 = new ListNode(2);
var node2 = new ListNode(3);
var node3 = new ListNode(12);
var node4 = new ListNode(99);
node1.next = node2;
var list = new LinkedList(node1);

console.log('list', list);
console.log('size', list.size());
console.log('first', list.getFirst());
console.log('last', list.getLast());
console.log('insertFirst', list.insertFirst(999));
console.log('insertFirst', list.insertLast(node4));
console.log('first', list.getFirst());
console.log('last', list.getLast());
console.log('size', list.size());