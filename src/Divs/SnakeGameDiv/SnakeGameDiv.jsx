import React, { Component } from 'react';
import './SnakeGameDiv.css';
import Grid from './components/Grid/Grid';
import GameState from './components/GameControl/GameState';

const FIELDTYPES = {
  floor: 0,
  wall: 1,
  apple: 2,
  snake: 3
};
const size = 20;


class SnakeGameDiv extends Component {
  constructor(props){
    super(props);
    this.onTick = this.onTick.bind(this);
    this.pause = this.pause.bind(this);
    this.newGame = this.newGame.bind(this);
    this.onScore = this.onScore.bind(this);
    this.state = {
      gameState : new GameState(size,this.onLose,this.onScore)
    };
    this.bindArrowKeysAndPreventDefault();
  }

  onTick(){
    this.state.gameState.onTick();
    this.setState(this.state);
  }
  pause(){
    if(this.state.gameState.state === "going"){
      window.clearInterval(this.interval);
      this.state.gameState.state = "paused";
      document.getElementById("txt").innerHTML = "Paused.</br>Press the 'W',S','A','D' to start.";
    }
  }
  newGame(){
    this.setState({gameState : new GameState(size,this.onLose,this.onScore)});
    window.clearInterval(this.interval);
    document.getElementById("txt").innerHTML = "Press the 'W',S','A','D' to start.";
  }
  onScore(){
    document.getElementById("score").innerHTML = this.state.gameState.score;
  }
  onLose(){
    window.clearInterval(this.interval);
    document.getElementById("txt").innerHTML = "Game Over";
  }

  //bind control keys to the snake action
  bindArrowKeysAndPreventDefault(){
    let self = this;
    window.addEventListener("keydown", function(e) {
      //"A","D","S","W" keys to control the direction
      if([65, 68, 83, 87].indexOf(e.keyCode) > -1) {
        e.preventDefault();
        self.state.gameState.keyPressed(e.keyCode);
        self.keyPressed();
      }
      //keyboard "P" to pause
      if(80 === e.keyCode) {
        e.preventDefault();
        self.pause();
      }
    }, false);
  }
  keyPressed(){
    if(this.state.gameState.state === "notStarted" || this.state.gameState.state === "paused"){
      this.state.gameState.state = "going";
      this.startGame();
      document.getElementById("txt").innerHTML = "Press 'P' to Pause.";
    }
  }
  startGame(){
    document.getElementById("txt").innerHTML = "";
    document.getElementById("score").innerHTML = 0;
    this.interval = window.setInterval(()=>{
      this.onTick();
    },150);
  }

  render() {
    return (
      <div className="snakeGame">
        <h1>Snake</h1>
        <button type="button" onClick={this.newGame}>New Game</button>
        <button type="button" onClick={this.pause}>Pause</button>
        <p>Score: <span id="score">0</span></p>
        <Grid fieldTypes={FIELDTYPES} map={this.state.gameState.map}/>
        <p id="txt">Press the 'W','S','A','D' to start.</p>
      </div>)
  }
}

export default SnakeGameDiv;