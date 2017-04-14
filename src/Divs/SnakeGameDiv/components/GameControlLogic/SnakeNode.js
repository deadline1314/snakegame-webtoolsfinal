
class SnakeNode {
  constructor( arr, next = null) {
    this.coords = [];
    this.coords[0] = arr[0];
    this.coords[1] = arr[1];
    this.next = next;
  }
}

export default SnakeNode;