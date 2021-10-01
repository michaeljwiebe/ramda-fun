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
    let oldHead = JSON.parse(JSON.stringify(this.head));
    this.head = new ListNode(data);
    this.head.next = oldHead;
    return this;
  } 
  insertLast(data) {
    let node = this.head;
    while (node.next) {
      node = node.next;
    }
    node.next = new ListNode(data);
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
  findClass(node, className) {
    let specialNodes = [];
    let subSpecialNodes = [];
    while(node.next) {
      if (node.classes && node.classes.contains(className)) {
         specialNodes.push(node);
      }
      if (node.other) {
        subSpecialNodes = this.findClass(node.other, className);
      }
      node = node.next;
    }
    return [...specialNodes, ...subSpecialNodes];
  }
}

var node1 = new ListNode(2);
var node2 = new ListNode(3);
var node3 = new ListNode(12);
var node4 = new ListNode(99);
var node5 = new ListNode(187);
var node6 = new ListNode(1870);
node4.classes = 'special v-special';
node5.classes = 'very-special special extra-special';
node4.other = node5;
node5.next = node6;
node1.next = node2;
var list = new LinkedList(node1);

console.log('size', list.size());
console.log('first', list.getFirst());
console.log('last', list.getLast());
console.log('insertFirst', list.insertFirst(999));
console.log('insertFirst', list.insertLast(123));
console.log('first', list.getFirst());
console.log('last', list.getLast());
console.log('size', list.size());
console.log('list', list);
console.log('specialNodes', list.findClass(list.getFirst(), 'special'));