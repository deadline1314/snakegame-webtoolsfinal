import Snake from './Snake';
import Element from './Element';

class GameState {
  constructor( size=20, onLose, onScore ) {
    this.size = size;
    this.map = [];
    this.snake = null;
    this.walls = [];
    this.apples = [];
    this.state = "notStarted";
    this.onLose = onLose;
    this.onScore = onScore;
    this.score = 0;

    this.init();
    this.draw();
  }

  init() {
    this.map = [];
    this.snake = generateInitialSnake();
    this.walls = generateWalls(this.size);
    this.generateRandomApple();
  }
  draw() {
    this.map = generateInitialMap(this.size);
    this.putWalls();
    this.putApples();
    this.putSnake();
  }

  //pick a random spot to add an apple
  generateRandomApple() {
    let placed = false;
    let x, y;
    do {
      x = Math.floor((Math.random() * (this.size - 1)) + 1);
      y = Math.floor((Math.random() * (this.size - 1)) + 1);
      if(this.isEmpty(x, y)) {
        placed = true;
      }
    }while( !placed );

    this.apples.push([x, y]);
  }

  //check if the spot is empty
  isEmpty(x, y) {
    return (!this.isSnake(x, y) && !this.isWall(x, y) && !this.isApple(x, y));
  }

  isSnake(x, y) {
    let found = false;
    let current = this.snake.head;
    do {
      if(current.coords[0] === x && current.coords[1] === y) {
        found = true;
        break;
      }
      current = current.next;
    }while( current );

    return found;
  }
  isWall(x, y) {
    let found = false;
    for(let i = 0; i < this.walls.length; i++) {
      if(x === this.walls[i][0] && y === this.walls[i][1]) {
        found = true;
      }
    }
    return found;
  }
  isApple(x, y) {
    let found = false;
    for(let i = 0; i < this.apples.length; i++) {
      if(x === this.apples[i][0] && y === this.apples[i][1]) {
        found = true;
      }
    }
    return found;
  }

  putWalls() {
    let x, y;
    for(let i = 0; i < this.walls.length; i++) {
      x = this.walls[i][1];
      y = this.walls[i][0];
      this.map[x][y].type = "wall";
    }
  }
  putApples() {
    let x, y;
    for(let i = 0; i < this.apples.length; i++) {
      x = this.apples[i][1];
      y = this.apples[i][0];
      this.map[x][y].type = "apple";
    }
  }
  putSnake() {
    let x, y;
    let current = this.snake.head;
    do {
      x = current.coords[1];
      y = current.coords[0];
      this.map[x][y].type = "snake";
      current = current.next;
    }while( current );
  }

  //handle key pressed action
  keyPressed(code) {
    this.setSnakeDirection(code);
  }
  setSnakeDirection(keyCode) {
    if (keyCode === 65) {        //"A" ----left
      if (this.snake.direction !== "e" && this.snake.direction !== "w") {
        this.snake.direction = "w";
      }
    } else if (keyCode === 87) { //"W"  ----up
      if (this.snake.direction !== "n" && this.snake.direction !== "s") {
        this.snake.direction = "n";
      }
    } else if (keyCode === 68) { //"D"  ----right
      if (this.snake.direction !== "e" && this.snake.direction !== "w") {
        this.snake.direction = "e";
      }
    } else if (keyCode === 83) { //"S"  ----down
      if (this.snake.direction !== "n" && this.snake.direction !== "s") {
        this.snake.direction = "s";
      }
    } else {

    }
  }

  //handle snake movement
  moveSnake() {
    let newCoords = getNewCoords(this.snake.head.coords, this.snake.direction);
    this.snake.addFirst(newCoords);
    this.snake.deleteLast();
  }

  //check the status when snake moves
  checkMove() {
    let coords = getNewCoords(this.snake.head.coords, this.snake.direction);
    let result = false;
    if(this.isWall(coords[0], coords[1]) || this.isSnake(coords[0], coords[1])) {
      this.loseGame();
      result = true;
    }
    if(this.isApple(coords[0], coords[1])) {
      this.clearApple(coords);
      this.snake.add(coords);
      this.generateRandomApple();
      this.score++;
      this.onScore();
    }
    return result;
  }
  loseGame() {
    this.state = "end";
    this.onLose();
  }
  clearApple(coords) {
    let index = -1;
    for(let i = 0; i < this.apples.length; i++) {
      if(this.apples[i][0] === coords[0] && this.apples[i][1] === coords[1]) {
        index = i;
        break;
      }
    }
    if(index !== -1) {
      this.apples.splice(index, 1);
    }
  }

  //handle the ongoing action
  onTick() {
    if(this.state === "going") {
      let isLose = this.checkMove();
      if(!isLose) {
        this.moveSnake();
      }
    }
    this.draw();
  }
}

//generate the initial state of the snake
function generateInitialSnake() {
  let snake = new Snake("s");
  snake.add([1,3]);
  snake.add([1,2]);
  snake.add([1,1]);
  return snake;
}

//generate the boarder of the map
function generateWalls(size) {
  let walls = [];
  for(let i = 0; i < size; i++) {
    walls.push([i, 0]);
    walls.push([i, size-1]);
    if(i > 0 || i < size - 2) {
      walls.push([0, i]);
      walls.push([size-1, i]);
    }
  }
  return walls
}

//generate the initial state of map
function generateInitialMap(size) {
  let rows = [];
  let row = [];
  let id = 0;
  for(let i = 0; i < size; i++) {
    row = [];
    for(let j = 0; j < size; j++) {
      row.push(new Element(id, "floor"));
      id++;
    }
    rows.push(row);
  }
  return rows;
}

//get new coords when snake moves
function getNewCoords(coords, direction) {
  let result = [];
  result[0] = coords[0];
  result[1] = coords[1];
  if (direction === "n") {
    result[1] -= 1;
  } else if (direction === "s") {
    result[1] += 1;
  } else if (direction === "w") {
    result[0] -= 1;
  } else if (direction === "e") {
    result[0] += 1;
  }
  return result;
}



export default GameState;