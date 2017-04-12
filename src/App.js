import React, { Component } from 'react';

//import firebase dependency
import firebase from 'firebase/app';
import 'firebase/database';

//import fullpage.js dependency
import $ from 'jquery';
import 'fullpage.js';

import './App.css';
import ThreadDisplay from "./Divs/ThreadDisplayDiv/component/ThreadDisplay";
import SnakeGameDiv from './Divs/SnakeGameDiv/SnakeGameDiv';

class App extends Component {

  constructor(props) {
    super(props);
    //firebase initialization
    const config = {
      apiKey: "AIzaSyAkNLDVunC2HTufatelsnIsl8rLElEhuqg",
      authDomain: "reacttest-a0dd3.firebaseapp.com",
      databaseURL: "https://reacttest-a0dd3.firebaseio.com",
      projectId: "reacttest-a0dd3",
      storageBucket: "reacttest-a0dd3.appspot.com",
      messagingSenderId: "901167334752"
    };
    this.app = firebase.initializeApp(config);
    this.database = this.app.database();
  }

  componentDidMount() {
    $('#fullpage').fullpage({
      sectionsColor: ['#f2f2f2', '#4bbfc3', '#7baabe', '#ccddff']
    });
  }


  render() {
    return (
    <div id="fullpage">

      <div className="section active" id="section1">
        <h1>fullPage.js</h1>
      </div>

      <div className="section" id="section2">
        <SnakeGameDiv />
      </div>

      <div className="section" id="section3">
        <ThreadDisplay database={this.app.database()} />
      </div>

      <div className="section" id="section4">
        <div className="slide">
          <h1>Simple Demo</h1>
        </div>
        <div className="slide active">
          <h1>Only text</h1>
        </div>
        <div className="slide">
          <h1>And text</h1>
        </div>
        <div className="slide">
          <h1>And more text</h1>
        </div>
      </div>

    </div>
    );
  }
}

export default App;

