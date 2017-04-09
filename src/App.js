import React, { Component } from 'react';

//import firebase dependency
import firebase from 'firebase/app';
import 'firebase/database';

import './App.css';
import ThreadDisplay from "./component/ThreadDisplay";

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


  render() {
    return (
      <ThreadDisplay database={this.app.database()} />
    );
  }
}

export default App;

