function Node(data) {
    this.data = data;
    this.next = null
}

function createLinkedList() {
    const node1 = new Node(2);
    const node2 = new Node(3);
    node1.next = node2;
    const node3 = new Node(4);
    node2.next = node3;
    const node4 = new Node(5);
    node3.next = node4;
    return node1;
}


function reverseLinkedList(root) {
    let previous = null;
    while (root !== null) {
        // console.log(root);
        const nextNode = root.next;
        root.next = previous;
        previous = root;
        root = nextNode;
    }
    return previous;
}

function printLinkedList(rootNode) {
    while (rootNode !== null) {
        console.log(rootNode.data);
        rootNode = rootNode.next;
    }
}

const head = createLinkedList();
// console.log(head);
printLinkedList(head);

const reverseNode = reverseLinkedList(head);
console.log("------printing reverseNode list------");
printLinkedList(reverseNode);
