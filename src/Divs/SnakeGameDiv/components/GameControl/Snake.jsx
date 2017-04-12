import SnakeNode from './SnakeNode';

class Snake {
  constructor( direction ) {
    this.length = 0;
    this.head = null;
    this.direction = direction;
  }

  add( coords ) {
    let snakeNode = new SnakeNode(coords, null);
    let current;

    if( this.head === null ) {
      this.head = snakeNode;
    }
    else {
      current = this.head;
      while( current.next ) {
        current = current.next;
      }
      current.next = snakeNode;
    }
    this.length++;
  }

  //add a new node in the head
  addFirst( coords ) {
    let temp = new SnakeNode(coords, this.head);
    this.head = temp;
    this.length++;
  }

  //remove the tail node
  deleteLast() {
    let current = this.head;
    do {
      current = current.next;
    } while( current.next.next );

    current.next = null;
    this.length--;
  }
}

export default Snake;